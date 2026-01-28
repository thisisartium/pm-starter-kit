import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getLastCalendarWeekIsoRange } from "@/lib/dateRange";
import { fetchCommits, fetchPullRequests, parseGitHubRepoUrl } from "@/lib/github";
import { getOpenAiClient, getOpenAiModel } from "@/lib/openai";

type SummaryRequest = {
  repoUrl: string;
  timeZone?: string;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let payload: SummaryRequest;
  try {
    payload = (await request.json()) as SummaryRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const repoRef = parseGitHubRepoUrl(payload.repoUrl || "");
  if (!repoRef) {
    return NextResponse.json({ error: "Invalid GitHub repo URL." }, { status: 400 });
  }

  const timeZone = payload.timeZone || "UTC";
  const range = getLastCalendarWeekIsoRange(timeZone);
  const startIso = range.startIso;
  const endIso = range.endIso;

  try {
    const [commits, pulls] = await Promise.all([
      fetchCommits(repoRef, accessToken, startIso, endIso),
      fetchPullRequests(repoRef, accessToken, startIso, endIso),
    ]);

    const commitLines = commits
      .slice(0, 200)
      .map((commit) => `- ${commit.commit.message.split("\n")[0]}`)
      .join("\n");

    const pullLines = pulls
      .slice(0, 200)
      .map((pull) => `- PR #${pull.number}: ${pull.title}`)
      .join("\n");

    const prompt = [
      `Repository: ${repoRef.owner}/${repoRef.repo}`,
      `Time range (local): ${range.display}`,
      "",
      `Commits (${commits.length}):`,
      commitLines || "- None",
      "",
      `Pull requests (${pulls.length}):`,
      pullLines || "- None",
      "",
      "Write a concise, high-level summary of what changed last week. Focus on themes and notable work,",
      "not individual commits. Use 4-6 bullet points, then a one-sentence overview.",
    ].join("\n");

    const openai = getOpenAiClient();
    const completion = await openai.chat.completions.create({
      model: getOpenAiModel(),
      messages: [
        {
          role: "system",
          content: "You summarize GitHub activity for weekly status updates.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 350,
      temperature: 0.2,
    });

    const summary = completion.choices[0]?.message?.content?.trim() || "No summary generated.";

    return NextResponse.json({
      summary,
      stats: {
        commits: commits.length,
        pullRequests: pulls.length,
      },
      range: range.display,
      repo: `${repoRef.owner}/${repoRef.repo}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

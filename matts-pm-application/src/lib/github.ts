type RepoRef = {
  owner: string;
  repo: string;
};

const GITHUB_API_BASE = "https://api.github.com";

export function parseGitHubRepoUrl(input: string): RepoRef | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("git@")) {
    const match = trimmed.match(/^git@github\.com:([^/]+)\/(.+?)(\.git)?$/i);
    if (!match) {
      return null;
    }
    return { owner: match[1], repo: match[2] };
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname !== "github.com") {
      return null;
    }
    const parts = url.pathname.replace(/^\//, "").split("/");
    if (parts.length < 2) {
      return null;
    }
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");
    return { owner, repo };
  } catch {
    return null;
  }
}

async function fetchGitHubJson<T>(
  url: string,
  token: string,
): Promise<{ data: T; nextUrl: string | null }> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${text}`);
  }

  const linkHeader = response.headers.get("link");
  let nextUrl: string | null = null;
  if (linkHeader) {
    const links = linkHeader.split(",");
    for (const link of links) {
      const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);
      if (match && match[2] === "next") {
        nextUrl = match[1];
      }
    }
  }

  return { data: (await response.json()) as T, nextUrl };
}

async function fetchAllPages<T>(url: string, token: string, pageLimit = 5): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | null = url;
  let page = 0;

  while (nextUrl && page < pageLimit) {
    const { data, nextUrl: newNextUrl } = await fetchGitHubJson<T[]>(nextUrl, token);
    results.push(...data);
    nextUrl = newNextUrl;
    page += 1;
  }

  return results;
}

export async function fetchCommits(
  repo: RepoRef,
  token: string,
  sinceIso: string,
  untilIso: string,
) {
  const url = new URL(`${GITHUB_API_BASE}/repos/${repo.owner}/${repo.repo}/commits`);
  url.searchParams.set("since", sinceIso);
  url.searchParams.set("until", untilIso);
  url.searchParams.set("per_page", "100");
  return fetchAllPages<{
    sha: string;
    html_url: string;
    commit: { message: string; author: { name: string; date: string } };
  }>(url.toString(), token);
}

export async function fetchPullRequests(
  repo: RepoRef,
  token: string,
  sinceIso: string,
  untilIso: string,
) {
  const url = new URL(`${GITHUB_API_BASE}/repos/${repo.owner}/${repo.repo}/pulls`);
  url.searchParams.set("state", "closed");
  url.searchParams.set("sort", "updated");
  url.searchParams.set("direction", "desc");
  url.searchParams.set("per_page", "100");

  const pulls = await fetchAllPages<{
    number: number;
    title: string;
    html_url: string;
    merged_at: string | null;
    closed_at: string | null;
    user: { login: string };
  }>(url.toString(), token);

  const since = Date.parse(sinceIso);
  const until = Date.parse(untilIso);
  return pulls.filter((pull) => {
    const dateValue = pull.merged_at ?? pull.closed_at;
    if (!dateValue) {
      return false;
    }
    const time = Date.parse(dateValue);
    return time >= since && time <= until;
  });
}

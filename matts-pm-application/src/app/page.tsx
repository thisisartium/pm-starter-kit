"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { signIn, signOut, useSession } from "next-auth/react";

type SummaryResponse = {
  summary: string;
  stats: {
    commits: number;
    pullRequests: number;
  };
  range: string;
  repo: string;
};

export default function Home() {
  const { data: session, status } = useSession();
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

  const timeZone = useMemo(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  }, []);

  const handleSubmit = async () => {
    if (!repoUrl.trim()) {
      notifications.show({
        title: "Repo URL required",
        message: "Paste a GitHub repo URL to continue.",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl, timeZone }),
      });

      const data = (await response.json()) as SummaryResponse & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate summary.");
      }

      setSummary(data);
    } catch (error) {
      notifications.show({
        title: "Summary failed",
        message: error instanceof Error ? error.message : "Unexpected error.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" py={64}>
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <div>
            <Title order={1}>Weekly Repo Summary</Title>
            <Text c="dimmed">
              Connect GitHub, paste a repo URL, and get a concise summary of last
              calendar week’s changes.
            </Text>
          </div>
          {status === "authenticated" ? (
            <Button variant="subtle" color="dark" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Button
              color="dark"
              onClick={() => signIn("github")}
              disabled={status === "loading"}
            >
              Sign in with GitHub
            </Button>
          )}
        </Group>

        <Card shadow="md" padding="xl" radius="md">
          <Stack gap="md">
            <Text fw={600}>GitHub repo</Text>
            <TextInput
              placeholder="https://github.com/org/repo"
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.currentTarget.value)}
            />
            <Group justify="space-between">
              <Text c="dimmed" size="sm">
                Timezone: {timeZone}
              </Text>
              <Button
                color="dark"
                onClick={handleSubmit}
                loading={loading}
                disabled={status !== "authenticated"}
              >
                Generate summary
              </Button>
            </Group>
          </Stack>
        </Card>

        {summary ? (
          <Card shadow="md" padding="xl" radius="md">
            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text fw={600}>{summary.repo}</Text>
                  <Text c="dimmed" size="sm">
                    {summary.range}
                  </Text>
                </div>
                <Group gap="xs">
                  <Badge color="teal" variant="light">
                    {summary.stats.commits} commits
                  </Badge>
                  <Badge color="gray" variant="light">
                    {summary.stats.pullRequests} PRs
                  </Badge>
                </Group>
              </Group>
              <Text component="div" style={{ whiteSpace: "pre-line" }}>
                {summary.summary}
              </Text>
            </Stack>
          </Card>
        ) : (
          <Card shadow="md" padding="xl" radius="md">
            <Text c="dimmed">
              Sign in and submit a repo URL to generate your summary.
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}

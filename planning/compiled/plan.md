# Project Plan

## Overview

Build a hosted web app that accepts a GitHub repo URL and produces a high-level
summary of the last calendar week's changes using OpenAI. Target users are PMs
or engineers who want quick weekly change summaries. "Done" means a user can
authenticate with GitHub, submit a repo URL, and receive a summary in the browser
for the prior calendar week in their local timezone.

## North star outcomes

- Users reliably get clear, high-level weekly summaries from GitHub repos.
- Private repos are supported securely through GitHub OAuth.

## Non-goals

- Detailed per-commit analysis in v1.
- Offline usage or local-only execution.
- Multi-repo batch summaries in v1.

## Current phase

- Phase: Build
- Definition of done for this phase:
  - App is deployed on Fly.io.
  - GitHub OAuth works for private repos.
  - Weekly summary runs end-to-end with OpenAI.

## Milestones

1. MVP weekly summary app
   - Description: UI, GitHub auth, repo input, weekly summary output.
   - Exit criteria: User can sign in, enter repo URL, and receive summary.

2. Hosted deployment
   - Description: Fly.io deployment with required env vars.
   - Exit criteria: Public URL available and functional.

## Dependencies and constraints

- OpenAI API key provided by user.
- GitHub OAuth app credentials required.
- Hosting on Fly.io.
- "Last calendar week" computed in user's local timezone.

## Risks

- GitHub API rate limits — mitigate with minimal API calls.
- OAuth misconfiguration — mitigate with clear setup docs.
- Summary quality variance — mitigate with prompt iteration.

# Backlog

This is the executable work queue. Items should be small enough that a coding agent can complete them
in a bounded task, with clear acceptance criteria.

## How to add items

- Items originate from `planning/inbox/` entries and get compiled here during a manual planning session.
- Each item should include:
  - goal
  - scope
  - acceptance criteria (testable)
  - implementation notes (paths, constraints)
  - validation plan

## Active

### P0

- [ ] Build hosted weekly GitHub summary app
  - **Goal:** Ship a hosted web app that summarizes last calendar week's changes for a GitHub repo.
  - **Scope:**
    - Next.js web app with Mantine UI components.
    - GitHub OAuth login for private repo access.
    - Repo URL input and validation.
    - Server-side GitHub API fetch of commits/PRs for last calendar week.
    - OpenAI summarization endpoint and UI display.
    - Fly.io deployment with required environment variables.
  - **Acceptance criteria:**
    - [ ] User can sign in with GitHub and access private repos.
    - [ ] User can submit a GitHub repo URL and receive a summary.
    - [ ] Summary covers last calendar week based on user's local timezone.
    - [ ] App is deployed on Fly.io and reachable via HTTPS.
  - **Notes (paths/constraints):**
    - Target repo path: `matts-pm-application/`.
    - Use OpenAI for summarization; API key supplied at deploy time.
    - Use GitHub OAuth (Auth.js) with server-side session storage.
  - **Validation:**
    - Manual test: sign in, submit a repo URL, verify summary output for last week.

### P1
(No P1 items yet.)

## Icebox

- (Ideas that are explicitly not committed yet)

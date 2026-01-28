# Planning Inbox Entry — Synthesis

This document captures a **human-synthesized input** derived from prior research,
discussion, or exploration (including ChatGPT conversations).

It is **not automatically authoritative**. It is intended to be reviewed and
compiled into canonical planning during a manual planning session.

---

## Metadata

- Date: 2026-01-28
- Source (for example ChatGPT discussion, notes, research): Codex chat
- Author: Matt Sullivan
- Related context or links: N/A

---

## Purpose of this entry

Define a hosted web app that takes a GitHub repo URL, reviews last calendar week's
changes, and produces a high-level summary using an external LLM (OpenAI).

---

## Key insights or conclusions

- The app should be hosted (not just local).
- Repo selection happens via a GitHub URL input.
- Summarization must be high-level for now.
- Use OpenAI for summarization; user will provide an API key.
- The system should compute "last calendar week" (not rolling 7 days).
- The coding agent should pick the tech stack and UI kit.

---

## Proposed requirements or constraints

- Provide a web UI that accepts a GitHub repo URL.
- Fetch and summarize the last calendar week's change set for that repo.
- Summary should be high-level (no per-commit breakdown in v1).
- Use OpenAI for summarization; prompt should synthesize overall changes.
- App must be hosted and accessible via HTTP.
- The stack and UI kit are chosen by the coding agent.

---

## Non-committal or exploratory ideas

- Consider supporting private repos with GitHub auth.
- Consider allowing a detailed, per-commit view in a future iteration.
- Consider caching summaries for repeated queries.

---

## Open questions and uncertainties

- Define "last calendar week" timezone (user locale vs UTC).
- Should the repo be public only, or include private repos with auth?
- How should the app authenticate to GitHub (PAT, OAuth, unauthenticated)?
- What hosting target is preferred (Vercel, Render, Fly, etc.)?
- Should summaries be stored or generated on demand only?

---

## Suggested impact on plan or backlog

- Add a P0 item to implement a hosted web app that summarizes last week's repo changes
  from a GitHub URL using OpenAI.

---

## Explicit exclusions

- No detailed per-commit analysis in v1.
- No auto-compilation of inbox entries into the plan/backlog.

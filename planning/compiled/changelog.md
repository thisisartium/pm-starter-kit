# Planning Changelog

Append-only log of changes applied to `planning/compiled/`.

## Entry template

### YYYY-MM-DD — <short summary>

- **Source inbox files:** `planning/inbox/...`
- **Change summary:**
  - (What changed in plan/backlog)
- **Rationale:**
- **Assumptions / open questions:**
- **Notes on impact (optional):**
  - (Metrics, migrations, compatibility, sequencing)

### 2026-01-28 — Compile weekly GitHub summary app plan

- **Source inbox files:** `planning/inbox/2026-01-28-1049_codex_weekly-git-summary.md`
- **Change summary:**
  - Defined the project overview, outcomes, non-goals, milestones, and constraints.
  - Added a P0 backlog item for a hosted app with GitHub OAuth and OpenAI summaries.
  - Chose Next.js + Mantine UI, Auth.js for GitHub OAuth, and Fly.io hosting.
- **Rationale:**
  - Capture the clarified requirements and unblock execution for the MVP.
- **Assumptions / open questions:**
  - Use Auth.js GitHub OAuth; exact OAuth app setup will follow standard GitHub OAuth flow.
  - Local timezone comes from the browser and is used to compute last calendar week.
  - Summaries are generated on demand and not persisted.

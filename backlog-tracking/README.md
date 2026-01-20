# Backlog Tracking (Jira or Linear)

This module adds a lightweight, repo-native workflow to:
- export stories from Jira (or Linear) into markdown snapshots
- maintain a milestones CSV
- map milestones/objectives to stories
- generate a gap analysis (objectives without story coverage)
- optionally generate “PRD findings” drafts that cite PRD line references

This is designed to work alongside the repo’s two-layer planning system:
- `planning/inbox/` and `planning/compiled/` are the **planning canon**
- `backlog-tracking/` is **work-management support tooling** (exports, mapping, reporting)

## Core files (recommended)

Place these at repo root or keep them under `backlog-tracking/` if you prefer.

- `milestones.csv` (copy from `backlog-tracking/templates/milestones_template.csv`)
- `active-stories.md` (export snapshot of active stories)
- `all-stories.md` (optional full export archive)
- `gap-analysis.md` (generated mapping of milestones ↔ stories)
- `prd.md` (your PRD in markdown, used for line-referenced story drafting)
- `prd-findings.md` (optional deeper analysis for priority gaps)

## Workflow (high level)

1. Export stories from Jira/Linear into `active-stories.md` (and optionally `all-stories.md`).
2. Maintain `milestones.csv` as your strategic objective list.
3. Generate `gap-analysis.md` by mapping milestone objectives to stories.
4. For priority gaps, produce `prd-findings.md` drafts with PRD line references.
5. Only create Jira/Linear stories when explicitly requested.

## Conventions

- Prefer markdown outputs that are easy to diff in PRs.
- `active-stories.md` is a snapshot and can be refreshed regularly (weekly or before planning).
- `gap-analysis.md` is also a snapshot, regenerate whenever milestones or stories change.


## Exporting stories (recommended approach)

If you have a Jira or Linear MCP server configured in your IDE agent, ask it to export:
- all stories -> `all-stories.md` (optional)
- active stories -> `active-stories.md`

Then run a mapping exercise to produce `gap-analysis.md`.

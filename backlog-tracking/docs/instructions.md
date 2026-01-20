# Backlog Tracking Instructions

This is the repo-local workflow for exporting stories and doing milestone coverage analysis.

## Critical rules
1. Never create Jira/Linear stories proactively. Only create when explicitly asked.
2. When drafting story text, cite PRD line numbers when available.
3. Prefer updating existing reports instead of creating duplicates.
4. Snapshots (`active-stories.md`, `gap-analysis.md`) are expected to be regenerated.

## Suggested cadence
- Weekly or before sprint planning:
  - refresh `active-stories.md`
  - update `milestones.csv` statuses
  - regenerate `gap-analysis.md`
- When gaps are found:
  - draft story candidates in `prd-findings.md`
  - create stories only after explicit go-ahead

## Minimal artifacts
- `milestones.csv`
- `active-stories.md`
- `gap-analysis.md`
- (optional) `prd.md` and `prd-findings.md`

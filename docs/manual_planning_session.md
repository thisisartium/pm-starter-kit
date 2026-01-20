# Manual Planning Session Guide (with Codex)

This repo assumes planning compilation is human-in-the-loop. This guide is a suggested script.

## Inputs

- One or more files in `planning/inbox/` (curated synthesis)
- Current `planning/compiled/plan.md` and `planning/compiled/backlog.md`

## Goal

Update canonical planning (`planning/compiled/`) so execution can proceed deterministically.

## Suggested session flow

1. **Read the inbox entry** together.
2. **Extract**:
   - requirements/constraints
   - decisions
   - open questions
3. **Convert to backlog items** with testable acceptance criteria.
4. **Update plan** (phases, milestones, risks).
5. **Append changelog entry** citing the inbox file(s).
6. **Agree on next executable slice**.

## Output

Prefer a PR that:
- modifies `planning/compiled/plan.md` and/or `planning/compiled/backlog.md`
- appends to `planning/compiled/changelog.md`
- includes a brief PR description referencing the inbox file(s)

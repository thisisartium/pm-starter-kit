# Codex Prompt — Compile inbox entry into canonical plan/backlog

You are operating in a repo that uses a two-layer planning system.

## Task
1. Read:
   - the specified inbox entry in `planning/inbox/`
   - `planning/compiled/plan.md`
   - `planning/compiled/backlog.md`
   - `planning/compiled/changelog.md`

2. Extract from the inbox entry:
   - requirements/constraints
   - decisions
   - open questions
   - explicit exclusions

3. Propose diffs (do not apply blindly):
   - Update `plan.md` only where necessary.
   - Add or refine backlog items in `backlog.md` with testable acceptance criteria.
   - Append a new changelog entry citing the inbox file path(s).

4. Present the proposed changes for human review (diff-oriented).
5. Apply changes only after explicit confirmation.
6. Do not add new scope beyond what is in the inbox entry.

## Output format
- Summary of extracted items
- Proposed diffs (or a PR)
- List of open questions that remain blocking or non-blocking

# AGENTS.md — Project

This file augments the global agent instructions (for example `~/.codex/AGENTS.md`).
All global rules apply unless explicitly overridden here.

This project is designed to be executed with a **two-layer planning system** that preserves
raw intent while keeping execution plans stable, auditable, and deterministic.

---

## Project intent and boundaries

- This repository contains an executable codebase plus versioned planning artifacts.
- Prefer correctness, interpretability, and stability over novelty.
- Do not optimize for elegance at the expense of debuggability.
- When requirements are ambiguous, stop and ask for clarification rather than guessing.

---

## Sources of truth (priority order)

When working in this repository, defer to sources in the following order:

1. `planning/compiled/plan.md` and `planning/compiled/backlog.md` (authoritative intent for execution)
2. Other project specs and documentation under `docs/` or `context/` (if present)
3. `planning/inbox/` entries (evidence, curated inputs, not automatically authoritative)
4. Code and tests (implementation evidence, not authoritative intent)

If sources conflict:
- Stop before coding.
- Describe the conflict precisely.
- Propose the smallest clarification or experiment needed to resolve it.

---

## Planning inputs, compilation, and execution flow (project-specific)

This project uses a **two-layer planning system** to bridge human reasoning (including ChatGPT conversations)
and execution by coding agents.

### Layer 1: Planning inbox (curated, immutable inputs)

- Directory: `planning/inbox/`
- Purpose: capture **human-synthesized inputs** derived from research and discovery.
- Rules:
  - Files in this directory are **immutable once created**.
  - Never edit, rewrite, summarize, or delete inbox files.
  - Append-only is achieved by **adding new files**, not by modifying existing ones.
  - Not all conversations are captured. Only curated, synthesized inputs belong here.

Inbox content is **evidence**, not execution instructions.

Recommended filename convention:
- `YYYY-MM-DD-HHMM_<source>_<slug>.md`

### Layer 2: Compiled planning canon (authoritative)

- Directory: `planning/compiled/`
- Canonical files:
  - `plan.md` — current project plan and sequencing
  - `backlog.md` — executable work items and ordering
  - `changelog.md` — append-only record of applied planning changes

Only files in `planning/compiled/` are considered **authoritative intent** for execution.

### Manual compilation (human-in-the-loop)

- Planning compilation is **always manual**.
- Compilation occurs during an explicit planning session with a coding agent (for example Codex).
- Agents must not auto-compile or auto-update canonical planning without an explicit instruction to do so.

During a planning session, agents should:
1. Review the selected inbox file(s).
2. Discuss interpretations, risks, and open questions with the human.
3. Propose concrete diffs to canonical files.
4. Apply changes only after human confirmation.

### Inbox synthesis template

All inbox entries must follow the project template defined at:

- `planning/templates/inbox_synthesis.md`

Agents must assume:
- Content in this format reflects **considered human intent**, not raw brainstorming.
- Sections marked as “Non-committal” or “Exploratory” must not be treated as requirements.

### Planning compilation rules (for agents)

When instructed to update planning or determine next steps:

1. Read:
   - the specified inbox file(s) in `planning/inbox/`,
   - the current `planning/compiled/plan.md` and `planning/compiled/backlog.md`.

2. Extract:
   - explicit requirements,
   - constraints,
   - decisions,
   - open questions.

3. Propose updates by:
   - updating `plan.md` and/or `backlog.md`,
   - appending a new entry to `changelog.md` that includes:
     - summary of change,
     - source inbox file(s),
     - rationale,
     - assumptions or unresolved questions.

4. Output changes as a **diff-oriented PR**.
   - Do not silently rewrite large sections.
   - Do not reinterpret intent without stating assumptions.
   - Do not add new scope unless explicitly instructed.

### Execution contract

Coding agents (including Codex) must:
- execute **only** against `planning/compiled/` intent,
- cite the specific plan or backlog items they are implementing,
- update planning **only** through the compilation process above.

Raw inbox files are never execution instructions.

---

## Stop conditions (strict)

Stop and ask for guidance if:
- A change would alter the meaning of an existing requirement or metric.
- A proposal depends on ground-truth labels or artifacts not present.
- An interpretation cannot be validated with available inputs.
- Historical comparability would be broken without a migration plan.
- There is ambiguity about what is in scope.

Do not guess. Do not “make it reasonable.”


---

## Backlog tracking (Jira / Linear) module

This repository may include `backlog-tracking/` for exporting stories, tracking milestones, and performing gap analyses.

### Hard rules for Jira/Linear story work
- Never create Jira/Linear stories proactively. Only create or update stories when explicitly requested by the user.
- When drafting story content based on a PRD, cite PRD line numbers (or section identifiers) for traceability.
- If generating Jira story descriptions, use Jira wiki markup sections (Description, Acceptance Criteria, Technical Notes, References).
- Prefer updating existing snapshot reports (`active-stories.md`, `gap-analysis.md`, `prd-findings.md`) rather than creating duplicates.
- Treat exports and analyses as snapshots. They can be regenerated, and are not canonical intent for code execution.

### Relationship to planning canon
- `planning/compiled/*` remains the authoritative intent for code execution.
- `backlog-tracking/*` is supporting work-management material. It may inform planning, but does not override the compiled plan/backlog unless explicitly compiled through the planning process.

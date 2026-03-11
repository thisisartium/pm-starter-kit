# PM Starter Kit

A lightweight, repo-native workflow for turning research and discovery (including LLM conversations)
into **versioned planning artifacts** that a coding agent (for example OpenAI Codex) can reliably execute.

This template is designed to be forked per project.

## What this repo gives you

- A **two-layer planning system**
  - `planning/inbox/` (curated, immutable inputs)
  - `planning/compiled/` (authoritative plan + backlog + changelog)
- A reusable **Inbox Synthesis** template for turning chats into actionable inputs
- An `AGENTS.md` file that tells coding agents exactly how to read, compile, and execute work
- A repeatable **manual planning session** workflow (human-in-the-loop)
- Repo-scoped Codex **skills** under `.codex/skills/`:
  - `synthesize-inbox-entry` (instruction-only)
  - `validate-planning-inbox` (script-backed)

## Core idea

1. Do research and exploration anywhere (ChatGPT, notes, docs).
2. When something is worth keeping, **synthesize it into a single inbox entry** using the template.
3. Add it as a new file in `planning/inbox/` (do not edit it later).
4. Run a **manual planning session** with a coding agent:
   - read the inbox entry
   - extract requirements/constraints/questions
   - update `planning/compiled/plan.md` and `planning/compiled/backlog.md`
   - append an entry to `planning/compiled/changelog.md`
5. Execute work only from `planning/compiled/`.

This keeps raw intent traceable while keeping execution stable and reviewable.

## Quick start

1. Fork this repo.
2. Rename the project title in:
   - `AGENTS.md`
   - `planning/compiled/plan.md`
3. Add your first inbox entry:
   - copy `planning/templates/inbox_synthesis.md`
   - fill it out
   - save as `planning/inbox/2026-01-14-<source>-<slug>.md`
4. Start a manual planning session with your coding agent, using prompts in `codex/prompts/`.

## Using skills (Codex IDE extension in VS Code / Cursor)

Skills are stored in `.codex/skills/<skill-name>/SKILL.md`. Codex loads skill names + descriptions
automatically and can activate them on demand.

### How to invoke (recommended)

In the Codex chat box inside VS Code / Cursor:

- Type `$` to mention a skill and select it (or run `/skills` to browse), then give your instruction.
  - Example: `$validate-planning-inbox` then “Validate the latest inbox entry I just added.”
  - Example: `$synthesize-inbox-entry` then “Turn the text below into a compliant inbox entry…”

### How to invoke (implicit)

You can also just ask in plain language and Codex may choose the right skill automatically.

- Example: “Validate the planning inbox for format errors.”
- Example: “Synthesize this conversation into a planning inbox entry using the repo template.”

### Suggested order

1. Run `$synthesize-inbox-entry` to create a new file in `planning/inbox/`.
2. Run `$validate-planning-inbox` to check formatting and invariants.
3. In a manual planning session, compile selected inbox entries into `planning/compiled/`.

## PM Agent System (omp)

This repo ships a ready-to-use PM agent setup for **[oh-my-pi (omp)](https://github.com/can1357/oh-my-pi)** — an AI terminal assistant that works with Claude, Gemini, GPT-4o, and others.

Includes agents, slash commands, and skills for writing user stories, features, and epics — works with any backlog tool (ADO, Jira, Linear, GitHub Issues, and others).

**Quick install:**
```bash
./install.sh
```

Then restart omp, run `/setup` to configure your first client engagement, and type `/` to see your PM commands.

→ [Full setup guide and usage examples](omp/README.md)

---

## License

Choose a license before sharing widely (MIT is common for templates). See `LICENSE`.


## Optional: Backlog tracking module (Jira/Linear)

This repo includes `backlog-tracking/` for exporting Jira/Linear stories into markdown, maintaining milestones, and generating gap analyses.

- Start at `backlog-tracking/README.md`.

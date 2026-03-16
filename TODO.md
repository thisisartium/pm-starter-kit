# TODO

## Completed

- [x] Create `playbook/` directory with README, engagement guide, architecture patterns, and CAT framework
- [x] Update repo README to reference the playbook

## In progress

- [ ] Finalize `playbook/role-definition.md` — the AI-native PM role definition
  - Four draft versions exist (see Notion draft page). Recommend starting from "version cauri".
  - Needs PM team review and sign-off.

## Prompts

- [ ] Modernize the Story Writing prompt (`codex/prompts/03_story_writing.md`)
  - Convert from multi-step conversation script to a compact reference card
  - The story format (INVEST, Gherkin AC, story structure) is valuable; the step-by-step choreography is dated
- [ ] Migrate and modernize the Epic prompt (currently in Notion only)
  - Same treatment: extract the useful format, drop the iterative prompt-revision loop
- [ ] Decide: drop the User Persona prompt (v0.01, Jan 2024) — generic, any LLM handles this natively now

## Playbook — future slices

- [ ] **Engagement ramp-up guide**
  - How to ramp up on an AI engagement fast
  - Full transcripts of key Zoom meetings as markdown files for context
  - How to run small experiments
  - Roadmaps and planning for AI projects
  - Soft skills — how to talk to clients about AI

- [ ] **Models and AI landscape guide**
  - What PMs need to know about models (not a static comparison — guidance on how to evaluate)
  - When to use which architecture pattern
  - How to think about cost, latency, and quality tradeoffs

- [ ] **PM tooling setup guide**
  - Claude Code / Codex setup guide for PMs
  - A solid PM-oriented AGENTS.md explaining that the user is not a software engineer and expects the agent to be a principal-level voice
  - Voice-to-text workflows for explaining outcomes and intent at volume

- [ ] **Client onboarding templates**
  - Prototyping approaches (Figma Make or coding agents)
  - Backlog/project management with MCP connections (Jira, Linear)
  - Discovery with MCP connections to company knowledge (Confluence, Notion, Glean, Slack)
  - Repo archaeology with MCP to GitHub for engineering context

- [ ] **LLM-accessible knowledge**
  - Making the playbook and starter kit queryable by an LLM
  - Explore whether GitHub-hosted markdown is sufficient or whether we need RAG, MCP server, etc.

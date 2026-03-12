# PM Agent System for omp

A portable set of AI agents, slash commands, and skills for product managers using [oh-my-pi (omp)](https://github.com/can1357/oh-my-pi).

Works with any LLM omp supports: Claude, Gemini, GPT-4o, and others. Works with any backlog tool: Azure DevOps, Jira, Linear, GitHub Issues, and others.

---

## How portability works

Your agents, commands, skills, and client configs all live on **your machine** — outside every client's project repo. You bring your full PM toolkit to each engagement without committing anything to their codebase.

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │  SHARED TEAM RESOURCE                                                │
  │  github.com/org/pm-starter-kit                                       │
  │                                                                      │
  │  omp/agents/        omp/commands/        omp/skills/                 │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │  ./install.sh  (creates symlinks)
                               │  ./update.sh   (git pull + resync)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  YOUR MACHINE  (~/.omp/)                           ← never in a repo │
  │                                                                      │
  │  ┌────────────────────────────────────────────────────────────────┐  │
  │  │  Agents               Commands            Skills               │  │
  │  │  story-writer         /story              story-templates      │  │
  │  │  feature-writer       /feature            acceptance-criteria  │  │
  │  │  epic-writer          /epic               client-config        │  │
  │  │  client-setup         /setup                                   │  │
  │  │  weekly-report        /weekly-report                           │  │
  │  │                       /review-story                            │  │
  │  │                       /split-story                             │  │
  │  └────────────────────────────────────────────────────────────────┘  │
  │                                                                      │
  │  ┌────────────────────────────────────────────────────────────────┐  │
  │  │  Client Configs  (~/.omp/clients/)                             │  │
  │  │                                                                │  │
  │  │  acme-corp.md              project-falcon.md                   │  │
  │  │  tool: ADO                 tool: Jira                          │  │
  │  │  ado_org_url: ...          framework: Kanban                   │  │
  │  └────────────────────────────────────────────────────────────────┘  │
  └──────────┬──────────────────────────┬──────────────────────┬─────────┘
             │                          │                      │
             │  omp reads from ~/.omp/  │                      │
             ▼                          ▼                      ▼
  ┌──────────────────┐      ┌───────────────────┐      ┌──────────────────┐
  │  ~/acme-corp/    │      │  ~/proj-falcon/   │      │  ~/next-client/  │
  │  (client repo)   │      │  (client repo)    │      │  (client repo)   │
  │                  │      │                   │      │                  │
  │  src/            │      │  app/             │      │  ...             │
  │  package.json    │      │  ...              │      │                  │
  │                  │      │                   │      │                  │
  │  ✗ no omp files  │      │  ✗ no omp files   │      │  ✗ no omp files  │
  │  ✗ not committed │      │  ✗ not committed  │      │  ✗ not committed │
  └──────────────────┘      └───────────────────┘      └──────────────────┘
```

**The flow:**
1. `pm-starter-kit` is your team's shared agent repo — pull updates with `./update.sh`
2. `~/.omp/` is your personal toolkit — symlinked to the repo, lives on your machine
3. `~/.omp/clients/` holds one config per engagement — owned by you, never committed anywhere
4. You `cd` into any client repo and run `omp` — it reads everything from `~/.omp/`, touching nothing in the project

---

## What's included

### Agents

Agents are loaded automatically based on context, or you can invoke them by name.

| Agent | What it does |
|---|---|
| `client-setup` | Onboard a new client engagement — captures tools, methodology, and team context into `~/.omp/clients/[name].md` |
| `story-writer` | Writes sprint-ready user stories with Gherkin acceptance criteria |
| `feature-writer` | Writes Feature work items scoped to a PI or quarter |
| `epic-writer` | Decomposes business goals into epics, features, and story maps |
| `weekly-report` | Generates a business-friendly weekly progress report from the git log |

### Slash Commands

Type `/` in omp to see these, or invoke them directly.

| Command | What it does | Example |
|---|---|---|
| `/setup` | Onboard a new client — run once per engagement | `/setup` |
| `/story` | Write a new user story | `/story mobile users need to reset their password` |
| `/feature` | Write a Feature work item | `/feature add promo code support to checkout` |
| `/epic` | Plan an epic top-down | `/epic rebuild the onboarding experience` |
| `/review-story` | Critique + rewrite an existing story | Paste any story after the command |
| `/split-story` | Break an oversized story into smaller ones | Paste an 8-point story after the command |
| `/weekly-report` | Summarize the week from your board or git log | `/weekly-report` |

### Skills

Skills are reference materials loaded automatically by agents.

| Skill | What it does |
|---|---|
| `story-templates` | Templates for feature stories, bug stories, and spikes |
| `acceptance-criteria` | Patterns and anti-patterns for writing testable ACs |
| `client-config` | Schema and template for client config files in `~/.omp/clients/` |

---

## Installation

### Prerequisites

- [omp installed](https://github.com/can1357/oh-my-pi) and working (`omp` command available)
- This repo cloned locally

### Install (recommended — symlink mode)

```bash
cd path/to/pm-starter-kit
./install.sh
```

Symlink mode keeps your local omp setup **linked to this repo**. When you `git pull`, your agents and commands update automatically — no reinstall needed.

### Install (copy mode)

If you prefer a standalone copy with no repo dependency:

```bash
./install.sh --copy
```

### Update

Pull the latest changes and sync your `~/.omp` setup in one step:

```bash
./update.sh
```

This pulls from git, creates any new directories, adds symlinks for new files, and removes stale symlinks for deleted files. Safe to run at any time.

### Uninstall

```bash
./uninstall.sh
```

---

## How to use

### First time: set up a client

Before writing stories, run `/setup` once per client engagement. This creates a config file in `~/.omp/clients/` that personalizes all agents for that client's tools and methodology.

```
/setup
```

omp will ask about their backlog tool (ADO, Jira, Linear, etc.), work item types, sprint methodology, team structure, and any AI restrictions — then generate a ready-to-save config file.

> **Your client config lives in `~/.omp/clients/[name].md`** — inside your PM tooling directory, never in the client's project repo. You own it; it travels with you.

To switch engagements, run `/setup` again or tell omp: *"Switch to [client name]."*

---

### Writing a story

Give omp any of these and it will ask 1–2 clarifying questions then write a complete story:

```
/story

/story mobile users need to reset their password without calling support

/story the dashboard needs a date range filter for the reporting view
```

For bugs:
```
/story --bug the export button fails silently when the dataset is over 1000 rows
```

For spikes:
```
/story --spike we need to understand the effort to integrate with Salesforce
```

### Writing a story with code context

When you're working inside a codebase, story-writer can scan relevant files to produce more technically accurate ACs — using real field names, surfacing nullable fields as edge cases, and flagging existing validation logic.

**This is opt-in.** Ask for it explicitly:

```
/story --context add a bulk invite feature to the team settings page

/story look at the user service and write a story for email verification

/story check the checkout API then write a story for applying a promo code
```

You can also trigger it mid-conversation:

```
/story the payment form needs to support ACH transfers

> Look at the existing payment models before writing the ACs
```

Or let the agent offer it — if it detects a codebase, it will ask:
```
I can scan the codebase for relevant types, API routes, or validation logic — want me to?
```

**When it's most useful:**
- Refining a story for an area of the codebase you're less familiar with
- Bug stories — understanding the affected module produces sharper reproduction and AC scenarios
- Stories touching shared infrastructure (auth, payments, notifications) where existing contracts matter
- Refactoring stories where ACs need to describe behavior parity, not new behavior

**When to skip it:**
- Early discovery stories before code exists
- Pure UX / flow stories with no backend dependency
- When you're not running omp inside the project directory

### Writing a feature

```
/feature

/feature add multi-currency support to the checkout flow
```

omp will ask about the parent epic, target PI, and personas — then produce a full Feature with story stubs ready for sprint planning.

### Planning an epic

```
/epic

/epic rebuild the new user onboarding experience
```

omp will ask discovery questions, then produce a hypothesis, feature breakdown table, story map, and phased delivery plan.

### Reviewing a story

```
/review-story

[paste your story here]
```

Returns a scorecard (Pass/Warn/Fail per dimension), a written critique, and a full rewrite.

### Splitting a story

```
/split-story

[paste your oversized story here]
```

Identifies the split pattern, produces 2–5 right-sized child stories, and shows the delivery sequence.

### Generating a weekly report

```
/weekly-report
```

Produces a structured weekly summary — what shipped, what was fixed, what's in progress — all translated into business-friendly language with no technical jargon.

**Data sources (in priority order):**

| Source | What it gives you |
|---|---|
| Azure CLI (`az boards`) | Work item titles, types, states — already in product language |
| Git log | Commit-level detail, volume of changes, areas touched |

When the Azure CLI is set up, the agent queries your ADO board directly for work items completed and in-progress this week — giving you a report grounded in actual story titles rather than commit messages.

**Setting up board access:**

See [Backlog tool integration](#backlog-tool-integration) below.

**Without a board or git repo:** describe what the team worked on and omp will write the report from your input.

---

## Backlog tool integration

Connecting omp to your ADO board gives `/weekly-report` real work item data — story titles, states, and types — instead of raw commit messages. Uses the official Microsoft **Azure CLI** (`az`), no third-party packages.

### Setup is handled by `/setup`

When you run `/setup` for a new ADO client, the agent handles the Azure CLI setup automatically:

1. Asks for your ADO org URL and project name — saved to `~/.omp/clients/[name].md`
2. Checks if Azure CLI is installed — if not, asks for confirmation then runs `brew install azure-cli`
3. Installs the Azure DevOps extension if missing
4. Runs `az login` if you're not already authenticated (opens a browser)
5. Sets the org and project as defaults so `az boards` works without flags

After setup, `/weekly-report` reads org and project from your client config and queries the board automatically.

### Without a board connection

`/weekly-report` falls back to the git log automatically — still useful, just based on commit activity rather than story titles.

---

## Output

Everything is written in the omp chat window. Copy-paste output directly into Confluence, Notion, email, or wherever your team tracks status.

---

## Contributing

To update an agent, command, or skill:

1. Edit the file in `omp/agents/`, `omp/commands/`, or `omp/skills/`
2. Commit and push to the shared branch
3. Other PMs get the update on their next `./update.sh` (or `git pull` for content-only changes in symlink mode)

### Adding a new command

1. Create `omp/commands/your-command.md`
2. Start the file with YAML frontmatter:
   ```yaml
   ---
   name: your-command
   description: One-sentence description of what this command does.
   ---
   ```
3. Write the prompt below the frontmatter — written as a **direct task**, not documentation
4. Commit and push

### Adding a new agent

1. Create `omp/agents/your-agent.md`
2. Required frontmatter:
   ```yaml
   ---
   name: your-agent
   description: When should omp automatically use this agent? Be specific.
   ---
   ```
3. Write the agent's expertise, behavior, and output format below
4. Commit and push

---

## File structure

```
omp/
├── README.md                        ← you are here
├── AGENTS.md                        ← global PM identity, loaded by omp automatically
├── agents/
│   ├── client-setup.md              ← onboarding intake agent
│   ├── story-writer.md
│   ├── feature-writer.md
│   ├── epic-writer.md
│   └── weekly-report.md             ← business-friendly weekly summary
├── commands/
│   ├── setup.md                     ← /setup
│   ├── story.md                     ← /story
│   ├── feature.md                   ← /feature
│   ├── epic.md                      ← /epic
│   ├── review-story.md              ← /review-story
│   ├── split-story.md               ← /split-story
│   └── weekly-report.md             ← /weekly-report
└── skills/
    ├── story-templates/
    │   ├── SKILL.md
    │   ├── feature-story.md
    │   ├── bug-story.md
    │   └── spike-story.md
    ├── acceptance-criteria/
    │   └── SKILL.md
    └── client-config/
        └── SKILL.md                 ← schema for ~/.omp/clients/[name].md
```

After install, client configs live outside the repo:

```
~/.omp/
└── clients/
    ├── acme-corp.md                 ← your client configs, never in a project repo
    └── project-falcon.md
```

# PM Agent System for omp

A portable set of AI agents, slash commands, and skills for product managers using [oh-my-pi (omp)](https://github.com/can1357/oh-my-pi).

Works with any LLM omp supports: Claude, Gemini, GPT-4o, and others.

---

## What's included

### Agents

Agents are loaded automatically based on context, or you can invoke them by name.

| Agent | What it does |
|---|---|
| `story-writer` | Writes sprint-ready ADO user stories with Gherkin acceptance criteria |
| `feature-writer` | Writes ADO Feature work items scoped to a PI or quarter |
| `epic-writer` | Decomposes business goals into epics, features, and story maps |

### Slash Commands

Type `/` in omp to see these, or invoke them directly.

| Command | What it does | Example |
|---|---|---|
| `/story` | Write a new user story | `/story mobile users need to reset their password` |
| `/feature` | Write a Feature work item | `/feature add promo code support to checkout` |
| `/epic` | Plan an epic top-down | `/epic rebuild the onboarding experience` |
| `/review-story` | Critique + rewrite an existing story | Paste any story after the command |
| `/split-story` | Break an oversized story into smaller ones | Paste an 8-point story after the command |

### Skills

Skills are reference materials loaded automatically by agents.

| Skill | What it does |
|---|---|
| `ado-templates` | Templates for feature stories, bug stories, and spikes |
| `acceptance-criteria` | Patterns and anti-patterns for writing testable ACs |

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

### Uninstall

```bash
./uninstall.sh
```

---

## How to use

### Writing a story

Give omp any of these and it will ask 1–2 questions then write a complete story:

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

---

## Output

Everything is written **in the omp chat window**. Copy-paste output directly into Azure DevOps.

> **Coming soon:** direct ADO integration via the Azure DevOps MCP tool so stories can be created without leaving omp.

---

## Contributing

To update an agent, command, or skill:

1. Edit the file in `omp/agents/`, `omp/commands/`, or `omp/skills/`
2. Commit and push to the shared branch
3. Other PMs get the update on their next `git pull` (symlink mode) or `./install.sh` re-run (copy mode)

### Adding a new command

1. Create `omp/commands/your-command.md`
2. Start the file with YAML frontmatter:
   ```yaml
   ---
   name: your-command
   description: One-sentence description of what this command does.
   ---
   ```
3. Write the prompt below the frontmatter — written as a direct task, not documentation
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
│   ├── story-writer.md
│   ├── feature-writer.md
│   └── epic-writer.md
├── commands/
│   ├── story.md                     ← /story
│   ├── feature.md                   ← /feature
│   ├── epic.md                      ← /epic
│   ├── review-story.md              ← /review-story
│   └── split-story.md               ← /split-story
└── skills/
    ├── ado-templates/
    │   ├── SKILL.md
    │   ├── feature-story.md
    │   ├── bug-story.md
    │   └── spike-story.md
    └── acceptance-criteria/
        └── SKILL.md
```

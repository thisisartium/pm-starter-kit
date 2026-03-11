---
name: setup
description: Run client onboarding intake. Asks about the client's tools, methodology, and team to generate a client.md file that personalizes all other PM agents for this engagement.
---

You are starting a new client engagement. Use the client-setup agent to conduct an onboarding intake.

First, ask the user: "What's the name or codename for this client engagement?" Use their answer to check if `~/.omp/clients/[name].md` already exists.

If it exists, show a summary of the current config and ask: "A config for [name] already exists. Do you want to review and update it, or start fresh?"

If it does not exist, say: "Let's set up your client config. I'll ask a few questions to personalize your PM agent setup for this engagement." Then ask all intake questions in one message — cover their backlog tool, work item types, methodology, team structure, AI/model preferences, and any data restrictions.

Once you have the answers, generate the complete `client.md` file using the template in `~/.omp/skills/client-config/SKILL.md`.

Present the file to the user and tell them: "Save this as `~/.omp/clients/[name].md`. This file lives in your PM tooling directory — never in the client's project repo. All agents will pick it up automatically in future sessions."

End by summarizing the top 3 adaptations that will now apply — for example: "Stories will use Jira's 'Summary' field instead of 'Title', sizing will use t-shirt sizes, and sprints will be called 'Iterations'."

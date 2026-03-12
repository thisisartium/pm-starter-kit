---
name: weekly-report
description: Generate a business-friendly weekly progress report. Pulls completed and in-progress work items from a connected backlog tool (ADO, Jira, Linear) when available, falls back to git log. Translates everything into plain business language.
---

Generate a weekly progress report for the current project.

First, check if a backlog tool is connected via MCP and check the client config for the tool in use. If a board is available, query for:
- Work items moved to Done in the last 7 days
- Work items currently In Progress or Active

If no board is connected, fall back to scanning the git log for the last 7 days:
- `git log --since="7 days ago" --pretty=format:"%h | %ad | %s" --date=short`
- `git log --since="7 days ago" --stat --oneline`

Translate all activity into business-friendly language — outcomes and user impact, no technical jargon. Group related items, skip internal-only changes, and write for a non-technical audience.

After writing, offer to add next week's planned work or pull more detail on any item.

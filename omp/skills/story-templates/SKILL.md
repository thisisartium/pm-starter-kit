# Skill: Story Templates

## Purpose

Provides structured templates for agile work items. Ensures consistent formatting across all stories regardless of tool (ADO, Jira, Linear, GitHub Issues), client, team, or project.

## Templates

| Template | File | Use When |
|---|---|---|
| Feature Story | `feature-story.md` | New functionality or enhancement |
| Bug Story | `bug-story.md` | Defect, regression, or broken behavior |
| Spike Story | `spike-story.md` | Research, investigation, or technical discovery |

## Loading Behavior

This skill is loaded automatically by:
- `story-writer` agent (all story creation)
- `/story` command
- `/review-story` command
- `/split-story` command

It can also be referenced directly: "Use the bug template" or "Format this as a spike."

## Template Selection Guide

Use **feature-story** when:
- Adding new capability a user can interact with
- Enhancing or modifying existing functionality
- Building something the team will demo at a sprint review

Use **bug-story** when:
- Behavior is broken, regressed, or doesn't match spec
- A user is experiencing an error or unexpected result
- Fixing something that previously worked

Use **spike-story** when:
- The team doesn't know enough to estimate a feature
- Technical research is needed before implementation can begin
- The goal is learning, not delivering working software
- Time-boxed investigation is appropriate

## Conventions

- All templates use markdown headers for field labels
- Acceptance criteria default to Given/When/Then (Gherkin)
- Checkbox ACs are an acceptable alternative — pick one per story and be consistent
- Fields marked `[required]` must be filled before a story is considered Ready
- Fields marked `[optional]` should be filled when known

## Tool Mapping

These templates are tool-agnostic. Common field name equivalents:

| Template Field | ADO | Jira | Linear | GitHub Issues |
|---|---|---|---|---|
| Title | Title | Summary | Title | Title |
| Description | Description | Description | Description | Body |
| Acceptance Criteria | Acceptance Criteria | Acceptance Criteria | Description (continued) | Body (continued) |
| Tags | Tags | Labels | Labels | Labels |
| Story Points | Story Points | Story Points | Estimate | — |
| Links | Related Work | Issue Links | Relations | Linked PRs |

## Customization

If a client team uses different field names or formats, note the delta in a project-level override file. The base templates remain canonical — client-specific variants are layered on top.

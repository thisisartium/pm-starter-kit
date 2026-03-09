# Skill: ADO Templates

## Purpose

Provides structured templates for Azure DevOps work items. Ensures consistent formatting across all stories regardless of client, team, or project.

## Templates

| Template | File | Use When |
|---|---|---|
| Feature Story | `feature-story.md` | New functionality or enhancement |
| Bug Story | `bug-story.md` | Defect, regression, or broken behavior |
| Spike Story | `spike-story.md` | Research, investigation, or technical discovery |

## Loading Behavior

This skill is loaded automatically by:
- `ado-story-writer` agent (all story creation)
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
- The goal is learning, not delivering code
- Time-boxed investigation is appropriate

## Conventions

- All templates use markdown headers for field labels
- Acceptance criteria default to Given/When/Then (Gherkin)
- Checkbox ACs are an acceptable alternative — pick one per story and be consistent
- Fields marked `[required]` must be filled before a story is considered Ready
- Fields marked `[optional]` should be filled when known

## Customization

If a client team uses different field names or formats, note the delta in a project-level override file. The base templates remain canonical — client-specific variants are layered on top.

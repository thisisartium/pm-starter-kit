# Backlog Intelligence — Intent to Impact Skill Suite

This suite turns **feature intent** into a grounded **technical planning brief** by progressing from product language → architecture context → repo locations → code dependencies → impact → risks.

It is designed to help PMs and tech leads surface **hidden dependencies** and **engineering risks** *before* writing stories or starting implementation.

---

## Required PM input (minimum)

```
Feature Name
Feature Description
Acceptance Criteria (required)
Affected User Flow (optional)
```

---

## Skill pipeline

1) **feature-intent-parser**
Converts feature description + required acceptance criteria into structured technical signals:
- systems, candidate services, entities, UI, actions, triggers

2) **architecture-context-retriever**
Retrieves verified architecture context:
- actual services, databases, event streams, owners

3) **repository-discovery**
Maps services to code:
- repositories, service root paths, maintainers/owners

4) **code-dependency-analyzer**
Extracts evidence-based dependency snapshot:
- internal service calls, external providers, DB tables touched, events produced/consumed

5) **impact-analysis**
Maps acceptance criteria + dependencies to change surfaces:
- impacted services/components, required change areas, possible side effects

6) **risk-detection**
Surfaces likely technical/architectural risks and mitigations:
- risk level, categorized risks, mitigations

---

## Contracts (inputs/outputs)

### Shared naming conventions
- Services: `kebab-case` (e.g., `billing-service`)
- Databases: official name (often `snake_case`, e.g., `invoice_db`)
- Events/topics: preserve official naming (e.g., `invoice.due_soon`)
- Ownership: team slugs preferred (e.g., `payments-team`)

### Key handoffs
- Skill 1 → Skill 2: `systems_involved`, `data_entities`
- Skill 2 → Skill 3: `services`, `service_owners`
- Skill 3 → Skill 4: `repositories`, `service_paths`
- Skill 4 → Skill 5: `dependencies` snapshot
- Skill 5 → Skill 6: `impacted_services`, `required_changes`

---

## Example usage flow (high level)

1) Paste feature name/description/acceptance criteria into **feature-intent-parser**.
2) Use the output to query docs via **architecture-context-retriever**.
3) Map services to code via **repository-discovery**.
4) Extract real dependencies via **code-dependency-analyzer**.
5) Produce the planning brief via **impact-analysis**.
6) Produce the risk brief via **risk-detection**.

---

## Guardrails (suite-wide)
- No effort estimation.
- No user story generation.
- No implementation instructions.
- Evidence-first: don't invent services/repos/dependencies; ask for missing sources when blocked.
- Stop after each skill's deliverable output.

---

## What this enables
- Faster discovery of impacted systems and owners
- Reduced "surprise dependencies" during sprint planning
- Earlier identification of architectural risk patterns
- A consistent, repeatable preflight workflow for new features

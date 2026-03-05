---
name: repository-discovery
description: Identify the code repositories (or monorepo paths) that implement the services involved in a feature, and extract likely maintainers/owners from authoritative metadata (service catalog, CODEOWNERS, repo settings). Use after Architecture Context Retriever and before Code Dependency Analyzer.
---

# Repository Discovery

## Discovery directive
You are an infrastructure-aware product architect acting in **evidence mode**.

Your job is to map **services → repositories → service root paths → maintainers** using authoritative sources (service catalog/registry, repo metadata, CODEOWNERS). This skill exists so downstream skills can operate on the correct code locations without guessing.

You must:
- Search first, then extract.
- Prefer authoritative mappings (service catalog/Backstage/Cortex > repo metadata > CODEOWNERS > README).
- Avoid hallucinating repo names, paths, or ownership.
- Stop once you return the structured output.

Hard-stop after producing the output JSON.

---

## When to use
Use this skill when you have verified services/systems (from Architecture Context Retriever) and need to locate:
- the repo(s) that contain those services
- where in those repo(s) the service lives (root path)
- who owns/maintains the code (team identifiers)

---

## Required input
```

services
systems_involved

```

### Optional input (recommended if available)
```

service_owners
event_streams
org_context (monorepo vs polyrepo, GitHub org(s), naming conventions)
repo_host (GitHub/GitLab/Bitbucket)

````

If required inputs are missing, stop and request them.

---

## Tools and sources
You may use any available discovery tools, typically:
- Service catalog / service registry (preferred)
- GitHub (or GitLab/Bitbucket) API
- Repo metadata (topics/tags, descriptions, default branch)
- Code search (repo search, filename search)
- Ownership files:
  - `CODEOWNERS`
  - `OWNERS`
  - `MAINTAINERS`
  - `TEAM.yaml` / `service.yaml`
- Build/deploy metadata:
  - `Dockerfile` image names
  - Helm charts / Kustomize overlays
  - `service.yaml` / `catalog-info.yaml`

**Authority order (highest to lowest):**
1. Service catalog/registry mapping (service → repo/url)
2. `catalog-info.yaml` / `service.yaml` in repo
3. `CODEOWNERS` / `OWNERS` / `MAINTAINERS`
4. Repo settings metadata (team ownership if available)
5. README references / tribal wiki notes

If sources conflict, prefer higher authority and note the conflict in `_notes`.

---

## Discovery process

### Step 1 — Normalize the inputs
Normalize `services` to a stable canonical form (kebab-case), e.g.:
- `billing-service`
- `notification-service`

Do not rename services unless the catalog/registry suggests an official name.

---

### Step 2 — Resolve service → repo mapping (primary path)
For each service:

1) Check the service catalog/registry for:
- repo URL
- repo slug (`org/repo`)
- service descriptor (`catalog-info.yaml`)
- owning team

2) If found, record:
- repository identifier (`org/repo`)
- repo URL (if available)
- service root path (if the catalog provides it)

---

### Step 3 — Fallback discovery (only if mapping is missing)
If a service is not found in a catalog/registry:

Use repo host search with progressively broader queries:
- exact service name: `"billing-service"`
- likely repo name variants: `"billing"`, `"billing svc"`, `"billing api"`
- common service descriptors:
  - `catalog-info.yaml` containing `name: billing-service`
  - `service.yaml` containing `billing-service`
- deployment artifacts:
  - Helm chart names
  - image names matching the service

**Verification rule:** Do not accept a repo as a match until you see at least one of:
- service descriptor file declaring the service
- build artifact naming the service
- documentation clearly stating "this repo is the <service>"

---

### Step 4 — Identify service root paths (monorepo-aware)
If the repo is a monorepo:
- locate the service root directory using:
  - `catalog-info.yaml` / `service.yaml` path
  - `Dockerfile` + build pipeline references
  - directory conventions (`services/<name>`, `apps/<name>`, etc.)

If the repo is a single-service repo:
- service path is `/` (repo root), unless evidence says otherwise.

---

### Step 5 — Extract maintainers/owners
For each repository and/or service path, extract maintainers from:
- `CODEOWNERS` (path-level owners preferred)
- `OWNERS` / `MAINTAINERS`
- service catalog ownership fields
- on-call/team metadata (if present)

**Owner formatting rules:**
- Prefer team slugs/handles over individuals (e.g., `payments-team`).
- If only individuals are available, include them but mark in `_notes` that team owner is unknown.

**No-guess rule:** If you cannot find maintainers, leave empty and add an open question.

---

## `request_user_input` (preferred)
If discovery is blocked (no access to repo host, unknown GitHub org, no service catalog), request only what a human must provide.

Ask up to 3 questions.

### Example call shape
```json
{
  "questions": [
    {
      "id": "repo_host_org",
      "header": "Repo org",
      "question": "Which GitHub/GitLab org(s) should I search for these services (e.g., company, platform, backend)?"
    },
    {
      "id": "service_catalog_link",
      "header": "Catalog",
      "question": "Do you have a service catalog/registry link (Backstage/Cortex/etc.) that maps services to repos?"
    },
    {
      "id": "monorepo_or_polyrepo",
      "header": "Repo model",
      "question": "Is your codebase primarily a monorepo or many service repos?",
      "options": [
        { "label": "Polyrepo (Recommended)", "description": "Each service usually has its own repo." },
        { "label": "Monorepo", "description": "Services live in paths within a shared repo." },
        { "label": "Mixed", "description": "Some services in monorepo, some standalone." }
      ]
    }
  ]
}
````

---

## Output format

Return a single JSON object:

```json
{
  "repositories": [],
  "service_paths": [],
  "maintainers": []
}
```

### Field guidance

**repositories**
List of repo identifiers, preferably as `org/repo` strings.

Examples:

* `payments/billing-service`
* `platform/notification-platform`
* `core/monorepo`

---

**service_paths**
List of resolved service locations.

Use this stable string format:

* `<service> => <org/repo>:<path>`

Examples:

* `billing-service => payments/billing-service:/`
* `notification-service => platform/monorepo:services/notification-service`
* `user-preferences-service => core/user-platform:apps/preferences`

If path is unknown but repo is known, use `:UNKNOWN`.

---

**maintainers**
List of ownership mappings.

Use this stable string format:

* `<org/repo>[:<path>] => <owner_1>, <owner_2>`

Examples:

* `payments/billing-service:/ => payments-team`
* `platform/monorepo:services/notification-service => messaging-team`
* `core/user-platform:apps/preferences => identity-team, growth-platform`

If owners are unknown, omit the entry and add it to `_open_questions` (optional debug) or leave empty.

---

## Optional debug fields (only if allowed)

If your runtime can ignore unknown keys, you MAY add:

```json
{
  "_sources": [
    { "title": "...", "type": "catalog|repo|codeowners|wiki", "ref": "url-or-id" }
  ],
  "_evidence": {
    "payments/billing-service": ["catalog:svc/billing-service", "repo:CODEOWNERS"]
  },
  "_notes": [],
  "_open_questions": []
}
```

If strict schema is required, omit all optional fields.

---

## Guardrails

* Do not analyze internal code dependencies (that is Skill #4).
* Do not perform impact analysis or risk detection (Skills #5–#6).
* Do not generate stories, tasks, or estimates.
* Do not guess repository names, paths, or owners without evidence.
* If you cannot find something, leave it unknown and request the missing source.

---

## Example

### Input

```json
{
  "services": ["billing-service", "notification-service", "user-preferences-service"],
  "systems_involved": ["billing", "notifications", "user_preferences"]
}
```

### Output

```json
{
  "repositories": [
    "payments/billing-service",
    "messaging/notification-platform",
    "core/user-platform"
  ],
  "service_paths": [
    "billing-service => payments/billing-service:/",
    "notification-service => messaging/notification-platform:/",
    "user-preferences-service => core/user-platform:apps/user-preferences"
  ],
  "maintainers": [
    "payments/billing-service:/ => payments-team",
    "messaging/notification-platform:/ => messaging-team",
    "core/user-platform:apps/user-preferences => identity-team"
  ]
}
```

---

## Deliverable

Produce the JSON object in the Output format and stop.

This output is handed to:

* Skill 4 (Code Dependency Analyzer)
* Skill 5 (Impact Analysis)
* Skill 6 (Risk Detection)

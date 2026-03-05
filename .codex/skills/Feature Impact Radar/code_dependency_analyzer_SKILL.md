---
name: code-dependency-analyzer
description: Analyze technical dependencies inside the identified repositories/paths for a feature, extracting internal service-to-service calls, external third-party dependencies, database tables touched, and event/topic contracts (produced/consumed). Use after Repository Discovery and before Impact Analysis.
---

# Code Dependency Analyzer

## Analysis directive
You are a staff-level software architect operating in **evidence mode**.

Your job is to inspect the relevant codebases (repos + service paths) and extract a **dependency snapshot** that downstream skills can use for impact analysis and risk detection.

You must:
- Inspect code and metadata first (manifests, imports, clients, schemas, migrations), then extract.
- Prefer explicit evidence over inference.
- Scope work to the services/paths relevant to the feature; do not boil the ocean.
- Produce structured outputs only; no implementation guidance, no estimation.

Hard-stop after producing the output JSON.

---

## When to use
Use this skill when you already have:
- repositories (and ideally service paths) that implement the relevant services, and
- backend_actions / data_entities (from Feature Intent Parser),
and you need to identify:
- internal service dependencies
- external dependencies (third-party APIs/SaaS)
- database tables/entities touched
- event contracts and stream dependencies

---

## Required input
```

repositories
backend_actions
data_entities

```

### Strongly recommended input (if available)
```

service_paths
services
event_streams
org_context (languages/frameworks, monorepo/polyrepo, runtime)

````

If required inputs are missing, stop and request them.

---

## Tools and sources
You may use any available code-intelligence tools, typically:
- Repo checkout / filesystem access
- Code search (ripgrep, IDE indexers, GitHub/GitLab search)
- Dependency manifests:
  - `package.json`, `pnpm-lock.yaml`, `yarn.lock`
  - `pom.xml`, `build.gradle`
  - `go.mod`, `go.sum`
  - `requirements.txt`, `poetry.lock`, `Pipfile.lock`
  - `.csproj`, `Gemfile`, etc.
- Service descriptors:
  - `catalog-info.yaml`, `service.yaml`
- API schemas:
  - OpenAPI/Swagger (`openapi.yaml/json`)
  - protobuf (`.proto`)
  - GraphQL schema files
- Event contracts:
  - schema registry files
  - `asyncapi.yaml`
  - event envelope definitions
- Database artifacts:
  - migrations (`db/migrate`, `migrations/`, Liquibase/Flyway)
  - ORM models (Sequelize, Hibernate, SQLAlchemy, Prisma, etc.)
  - SQL query usage (repositories/DAOs)

**Primary evidence hierarchy:**
1. Direct client usage (HTTP/gRPC SDK calls), explicit producers/consumers
2. API/event schema references + routing config
3. Dependency manifests + infra config (Helm, Terraform, env vars)
4. Naming inference (lowest; use only as "suspected" in `_notes`, not as facts)

---

## Scoping rules
Scope the analysis to:
- the services in `service_paths` (or inferred service roots if single-service repos),
- plus adjacent shared modules used by those services (e.g., `libs/`, `packages/`, `shared/`) **only when imported**.

Start from feature signals:
- `backend_actions` (what operations are needed)
- `data_entities` (what objects need storage/retrieval)
- `event_streams` (if known)
Use these as search anchors to reduce time and noise.

---

## Analysis process

### Step 1 — Establish service roots
For each repo:
- If `service_paths` specifies the service location, treat that as the root.
- Otherwise, locate service roots via:
  - `catalog-info.yaml` / `service.yaml`
  - directory conventions (`services/<name>`, `apps/<name>`)
  - deploy artifacts (Helm chart/image names)

Record which service(s) are analyzed in each repo/path.

---

### Step 2 — Collect manifest-level dependencies
Extract runtime dependencies from manifests and lockfiles:
- Identify likely internal libraries/modules (company namespaces, internal registries)
- Identify major third-party SDKs that imply external integrations:
  - email/push providers
  - payment processors
  - analytics/telemetry
  - cloud SDKs

Do not treat manifest presence alone as a "used dependency" without any code references unless it's clearly a core runtime SDK.

---

### Step 3 — Identify internal service-to-service dependencies
Look for evidence of cross-service communication:
- HTTP clients calling internal hostnames/service discovery names
- gRPC stubs or proto imports referencing another service
- shared API client libraries (`@company/billing-client`, `BillingClient`)
- gateway routing config pointing to services
- references in config (`BILLING_SERVICE_URL`, `NOTIFICATION_API_BASE_URL`)

Record dependencies as *caller -> callee* with mechanism when known.

---

### Step 4 — Identify external dependencies
Identify third-party systems actually used by the relevant service paths:
- SaaS APIs (e.g., email provider, SMS, push)
- cloud-managed services (queues, object storage, KMS)
- external partner APIs

Evidence sources:
- client initialization code
- endpoint base URLs
- SDK usage
- infrastructure config that's directly referenced by the service

---

### Step 5 — Identify database tables/entities touched
Using migrations + ORM + query code:
- Extract table names created/altered in migrations
- Extract ORM model names and their table mappings
- Extract query targets in DAOs/repositories
- Map tables to the service that touches them when possible

If the DB name is known (from Architecture Context Retriever), include it; otherwise keep it table-level and note unknown DB in `_notes`.

---

### Step 6 — Identify event dependencies (produce/consume)
Look for:
- producers (publishing events, emitting messages)
- consumers (subscriptions, handlers, listeners)
- topic names / event types
- schema references (Avro/Protobuf/JSON schema)
- AsyncAPI definitions

Record whether each service produces or consumes each event/topic.

---

### Step 7 — Normalize and deduplicate
Normalize naming consistently:
- services: `kebab-case` (e.g., `notification-service`)
- repos: `org/repo`
- events: official event name/topic string (preserve exact case if meaningful)
- tables: `db.table` or `table` if db unknown

Deduplicate repeated findings.

---

## `request_user_input` (preferred)
If analysis is blocked by missing repo access, unclear service root paths, or unknown event platform conventions, request only what a human must provide.

Ask up to 3 questions.

### Example call shape
```json
{
  "questions": [
    {
      "id": "repo_access_method",
      "header": "Repo access",
      "question": "How should I access these repos for analysis (local checkout path, GitHub links, or monorepo workspace)?"
    },
    {
      "id": "service_root_hint",
      "header": "Svc paths",
      "question": "Are there known service root path conventions (e.g., services/<name>, apps/<name>) I should assume?"
    },
    {
      "id": "event_naming",
      "header": "Event names",
      "question": "What is your event naming convention (e.g., domain.event, service.event, topic prefixes)?"
    }
  ]
}
````

---

## Output format

Return a single JSON object:

```json
{
  "internal_dependencies": [],
  "external_dependencies": [],
  "database_tables": [],
  "event_dependencies": []
}
```

### Field guidance and stable formats

**internal_dependencies**
List each internal dependency as a single string:

* `<caller_service> -> <callee_service> [via=<http|grpc|event|lib|unknown>]`

Examples:

* `billing-service -> notification-service [via=http]`
* `billing-service -> user-preferences-service [via=lib]`

Only include if you found code/config evidence of the connection.

---

**external_dependencies**
List each external dependency as a single string:

* `<service> -> <external_system> [type=<saas|cloud|partner|library|unknown>]`

Examples:

* `notification-service -> sendgrid [type=saas]`
* `billing-service -> aws-sqs [type=cloud]`

Do not list generic dependencies (e.g., "lodash") unless it is an integration SDK that implies an external dependency.

---

**database_tables**
List each touched table/entity as a single string:

* `<service> => <db>.<table>`
* If db unknown: `<service> => <table>`

Examples:

* `billing-service => invoice_db.invoices`
* `user-preferences-service => user_settings_db.reminder_preferences`
* `billing-service => invoices` *(db unknown)*

Prefer actual table names from migrations/ORM mappings over inferred entity names.

---

**event_dependencies**
List each event/topic dependency as a single string:

* `<service> produces <event_or_topic>`
* `<service> consumes <event_or_topic>`

Examples:

* `billing-service produces invoice.due_soon`
* `notification-service consumes invoice.due_soon`

Only include if the producer/consumer role is evidenced in code/config/schema.

---

## Optional debug fields (only if allowed)

If your runtime can ignore unknown keys, you MAY add:

```json
{
  "_sources": [
    { "type": "repo", "ref": "org/repo", "path": "services/billing-service" }
  ],
  "_evidence": {
    "internal_dependencies": {
      "billing-service -> notification-service [via=http]": [
        "payments/billing-service:src/clients/notificationClient.ts",
        "payments/billing-service:config/env.example"
      ]
    },
    "database_tables": {
      "user-preferences-service => user_settings_db.reminder_preferences": [
        "core/user-platform:apps/user-preferences/migrations/20250301_add_reminder_prefs.sql"
      ]
    }
  },
  "_notes": [],
  "_open_questions": []
}
```

If strict schema is required, omit all optional debug fields.

---

## Guardrails

* Do not estimate effort.
* Do not generate user stories or tasks.
* Do not propose implementation strategies or code changes.
* Do not perform impact analysis (Skill #5) or risk detection (Skill #6).
* Do not invent dependencies—if you can't find evidence, leave it out and add an open question (optional debug) or request input.

---

## Example

### Input

```json
{
  "repositories": ["payments/billing-service", "messaging/notification-platform", "core/user-platform"],
  "backend_actions": ["schedule_reminder", "send_notification", "store_user_preferences"],
  "data_entities": ["invoice", "reminder_preferences", "user"]
}
```

### Output

```json
{
  "internal_dependencies": [
    "billing-service -> notification-service [via=http]",
    "billing-service -> user-preferences-service [via=http]"
  ],
  "external_dependencies": [
    "notification-service -> apns [type=partner]",
    "notification-service -> fcm [type=partner]",
    "notification-service -> sendgrid [type=saas]"
  ],
  "database_tables": [
    "billing-service => invoice_db.invoices",
    "user-preferences-service => user_settings_db.reminder_preferences"
  ],
  "event_dependencies": [
    "billing-service produces invoice.due_soon",
    "notification-service consumes invoice.due_soon"
  ]
}
```

---

## Deliverable

Produce the JSON object in the Output format and stop.

This output is handed to:

* Skill 5 (Impact Analysis)
* Skill 6 (Risk Detection)

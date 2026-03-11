# Template: Bug Story

Use this template for defects, regressions, broken behavior, or anything that worked before and doesn't now.

---

## Title [required]

`[Component/area]: [What is broken] — [impact or symptom]`

Examples:
- "Login: Users are not redirected after successful authentication"
- "Export: CSV download fails silently for reports over 1,000 rows"
- "Mobile nav: Hamburger menu does not close on item selection"

Keep titles under 80 characters. Write them so a tester can find the bug from the title alone.

---

## Description [required]

```
As a [persona experiencing the bug]
I want [the system to behave correctly]
So that [I can accomplish my goal without interruption]
```

**Note:** The user story format is optional for bugs. If your team prefers plain prose, use this instead:

```
Summary: [One sentence describing the broken behavior]
Impact: [Who is affected and how severely]
Frequency: [Always / Sometimes / Rarely — under what conditions]
```

---

## Steps to Reproduce [required]

```
1. [Starting state — environment, user role, data setup]
2. [First action taken]
3. [Next action]
4. [Action that triggers the bug]
```

Be precise. If the bug is intermittent, describe the conditions under which it appears.

---

## Expected Behavior [required]

What should happen? Describe the correct, intended behavior.

---

## Actual Behavior [required]

What actually happens? Include:
- Error messages (exact text, copy-pasted — not paraphrased)
- Screenshots or recordings if available
- Console errors or logs if relevant

---

## Acceptance Criteria [required]

The bug is fixed when:

```
- [ ] [The broken behavior no longer occurs]
- [ ] [Expected behavior is confirmed]
- [ ] [Edge cases or related paths are not regressed]
- [ ] [Fix is verified in [environment]]
```

---

## Environment [required]

```
Browser / Client: [e.g., Chrome 121, iOS Safari, Windows App]
OS: [e.g., Windows 11, macOS 14, Android 14]
Environment: [e.g., Production, Staging, QA]
User Role: [e.g., Admin, Standard User, Guest]
Data conditions: [e.g., Account with no payment method, empty dataset]
```

---

## Severity / Priority [required]

| Level | Definition |
|---|---|
| **Critical (P1)** | System down, data loss, security breach, no workaround |
| **High (P2)** | Major feature broken, significant user impact, workaround is painful |
| **Medium (P3)** | Feature partially broken, workaround exists |
| **Low (P4)** | Minor issue, cosmetic, edge case |

**Severity:** ___
**Priority:** ___

---

## Root Cause (if known) [optional]

If the cause has been identified during triage, note it here. Do not leave blank if known — this prevents duplicate investigation.

---

## Regression? [optional]

```
Worked in: [version, sprint, or date]
Broke in: [version, sprint, or date — if known]
Related PR/commit: [if known]
```

---

## Dependencies / Blockers [optional]

```
Blocked by: [Story or issue ID]
Related to: [Story ID, bug ID, or incident]
```

---

## Notes [optional]

Additional context, stakeholder impact, workaround instructions, or link to the original support ticket.

---

## Suggested Tags [optional]

`bug` `regression` `hotfix` `frontend` `backend` `api` `mobile` `performance` `security` `data`

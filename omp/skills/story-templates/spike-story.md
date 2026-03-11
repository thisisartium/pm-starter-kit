# Template: Spike Story

Use this template for research, technical investigation, discovery, or any time-boxed work where the output is knowledge — not a shipped feature.

---

## Title [required]

`Spike: [What are we investigating] — [decision or output needed]`

Examples:
- "Spike: Evaluate Stripe vs. Adyen for multi-currency support"
- "Spike: Determine feasibility of real-time sync with Salesforce"
- "Spike: Investigate performance bottleneck in report generation"

---

## Description [required]

```
As a [team or persona who needs this knowledge]
I want to [investigate / evaluate / understand / determine] [topic]
So that [the decision, feature, or story that depends on this outcome]
```

**Why a spike?** Briefly state why we can't estimate or begin implementation without this research:

```
We cannot proceed with [feature or story] because [the unknown or risk].
This spike will resolve that uncertainty by [the approach].
```

---

## Objective [required]

A single, clear statement of what this spike must answer or produce.

```
By the end of this spike, we will know / have:
- [Specific answer, recommendation, or artifact]
- [Optional: second deliverable]
```

---

## Questions to Answer [required]

List the specific questions this spike must address:

```
1. [Question 1]
2. [Question 2]
3. [Question 3]
```

Limit to 3–5 questions. If there are more, split into multiple spikes.

---

## Approach / Method [optional]

How will you investigate? Options include:

- Vendor documentation review
- Proof of concept (PoC) implementation
- Stakeholder interviews
- Data analysis
- Architecture review
- Performance profiling
- Competitive analysis

Describe the planned approach so the team can validate scope before work begins.

---

## Time Box [required]

Spikes must be time-boxed. If the answer isn't found in time, that is itself a finding.

```
Time box: [X days / Y hours]
Sprint / Iteration: [sprint number or dates]
Owner: [person or pair responsible]
```

---

## Acceptance Criteria [required]

A spike is done when the output is produced — not when a decision is made. ACs should describe the deliverable.

```
- [ ] Written summary of findings shared with the team
- [ ] [Specific question 1] is answered with a clear recommendation
- [ ] [Specific question 2] is answered with supporting evidence
- [ ] Risks and unknowns are documented
- [ ] Recommended next step or story is identified
```

---

## Output / Deliverables [required]

What must exist at the end of this spike?

```
[ ] Written summary / findings doc
[ ] Architecture decision record (ADR)
[ ] Proof of concept (PoC) — [describe scope]
[ ] Recommendation with rationale
[ ] Follow-on stories created in backlog
[ ] Risks and open questions documented
```

---

## Definition of Done

A spike is done when:
- Time box is exhausted OR all questions are answered (whichever comes first)
- Findings are written up and shared
- A recommendation is made (even if the recommendation is "we need another spike")
- Follow-on work items are created if implementation will proceed

---

## Dependencies [optional]

```
Blocked by: [Access, environment, vendor contact, etc.]
Informs: [Story or feature that will follow this spike]
Related to: [Other spikes, stories, or epics]
```

---

## Notes [optional]

Context from stakeholders, constraints, prior research, or links to relevant resources.

---

## Suggested Tags [optional]

`spike` `research` `discovery` `architecture` `technical-debt` `vendor` `performance` `security` `integration`

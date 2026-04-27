# Business Rules → Code Checklist

**Purpose:** Prevent business rules defined in the product brief or client brief from being lost during story planning and implementation.

**Origin:** Discovered during Break Point E4.4 — a 72-hour minimum advance booking rule existed in `product-brief-distillate.md` but was never mapped to schema validation or form UI. The form accepted past dates silently.

**When to use:** Before marking any form story as ready for implementation (after `bmad-create-story:validate`).

---

## Checklist — Every Form Story

### Step 1: Read the business rules BEFORE writing the schema

Open these files and search for rules relevant to the form's domain:
- `docs/product-brief-distillate.md` — booking policies, operating rules, constraints
- `docs/research/*.md` — market behavior, customer expectations
- `_bmad-output/planning-artifacts/prd.md` — functional requirements
- `_bmad-output/planning-artifacts/ux-design-specification.md` — UX flows with constraints

Search terms: `mínimo`, `anticip`, `política`, `require`, `minimum`, `advance`, `booking`, `reserva`, `días`, `horas`

### Step 2: Map every rule to a Zod validation

For each business rule found, ask:

| Field type | Questions to answer |
|---|---|
| Date / datetime | Past dates allowed? Minimum advance notice? Maximum horizon? |
| Number | Minimum value? Maximum? Integer only? |
| Text | Format constraints? Forbidden words? |
| Phone | Country format? Prefix required? |
| Select | Which options are valid? Any conditional options? |
| File | Max size? Allowed types? |

**If the rule exists in the brief but is NOT in the schema → it will be silently broken.**

### Step 3: Match UI attributes to schema rules

Every schema constraint must have a corresponding UI affordance:

| Schema rule | UI equivalent |
|---|---|
| `date >= today + N days` | `<input min={minDateStr}>` calculated dynamically |
| `number >= N` | `<input min={N}>` |
| `string.max(N)` | `maxLength={N}` on input/textarea |
| `regex(phone)` | `placeholder` showing expected format |
| `enum(values)` | Select options match enum exactly |

**If the UI doesn't reflect the rule, users waste a submit attempt finding out.**

### Step 4: Add the rule as an AC in the story doc

Business rules must appear as explicit Acceptance Criteria, not just be "in the schema somewhere":

```markdown
**Given** a visitor submits a date less than 72 hours from now
**When** Zod validates the fecha field
**Then** "La fecha debe ser con al menos 3 días de anticipación" appears
```

This makes the rule visible in code reviews, retrospectives, and future story updates.

---

## Known Business Rules — Break Point V1

| Rule | Source | Implemented in |
|---|---|---|
| Event booking: 72h minimum advance | product-brief-distillate.md:31 | `app/events/schema.ts` — `.refine()` on fecha field |
| Event booking: 50% deposit confirms date | product-brief-distillate.md:30 | Copy only (no form field) — policy shown in PricingBlock |
| Phone: Bolivian mobile format | PRD / schema | `app/events/schema.ts` — phoneRegex |
| Message: max 300 characters | Story 4.3 AC | `app/events/schema.ts` — `.max(300)` |
| Rate limit: 5 form submissions/hr/IP | Story 4.4 AC | `lib/rate-limit.ts` — slidingWindow(5, '1 h') |
| Field booking: no minimum defined yet | product-brief-distillate.md:110 | N/A — not yet formalized |
| Cancellation policy: not defined | product-brief-distillate.md:109 | N/A — deferred to V2 |

---

## How to Use This in Future Projects

1. When creating the schema for a new form, open this checklist
2. Run the search in Step 1 against the client's product brief
3. For every rule found, create a Zod validation + UI attribute + AC
4. Add the rule to the "Known Business Rules" table for that project
5. During code review (`bmad-code-review`), verify the table is complete

**The rule:** If a business constraint exists in writing anywhere in the project docs, it must appear in the Zod schema before the story is considered done.

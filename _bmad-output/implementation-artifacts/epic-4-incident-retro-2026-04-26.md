# Epic 4 — E4.3 Incident Retrospective

**Date:** 2026-04-26
**Epic:** 4 — Eventos Page (Event Inquiry & Lead Capture)
**Scope:** Incident retrospective for E4.3 (Contact Form UI/Validation) failure and recovery
**Facilitator:** Amelia (Developer)
**Participants:** Mauricio (Project Lead), Alice (Product Owner), Charlie (Senior Dev), Dana (QA Engineer), Elena (Junior Dev)

---

## Incident Summary

Story E4.3 (Contact Form — UI, Validation & States) failed on first implementation attempt due to:
1. **Missing dependency** — Zod was not in `package.json` despite the story spec requiring it
2. **pnpm store version conflict** — Running `pnpm add zod` triggered a v3/v10 store format conflict, corrupting `node_modules`
3. **next: command not found** — Corrupted node_modules broke the dev server entirely
4. **Files were never committed** — All work done in `main` with no branch, leaving untracked/modified files

Root cause: The story spec assumed an environment state that did not exist. No explicit prerequisite check was performed before implementation.

---

## What Went Well

- **Adversarial Review [AR] before implementation** — After resetting to clean state, running AR on the story ticket found 2 real code bugs before writing any code.
- **Plan Mode** — Exact line-by-line changes documented (before/after) made implementation surgical, not exploratory.
- **Focus management fix** — `document.querySelector('[aria-invalid="true"]')` covers all 6 fields elegantly with zero per-field code. Better than the brittle `firstErrorRef` approach.
- **Mauricio's decision to stop and restart** — Rather than continuing to patch a broken environment, resetting and doing proper analysis was the right call.
- **Zod v4 investigation** — Confirmed correct API for `z.preprocess` and `z.enum` before writing code.
- **4.3 + 4.5 unified delivery** — Both stories implement one component; merging them into one commit made sense.

---

## What Didn't Work

### 1. Implicit Prerequisites
The story said "use Zod for validation" but Zod was not in `package.json`. The story assumed the dependency existed. This is the primary root cause of the incident.

### 2. pnpm Store Version Conflict
Different pnpm versions on the machine caused store format incompatibility (v3 vs v10). Installing a new dependency exposed this pre-existing fragility.

### 3. No Branch Before Starting
Implementation started on `main` directly. All files remained untracked. When the environment broke, there was no clean recovery point via git.

### 4. Route Discrepancy in Docs
Story spec says `/eventos`, actual code uses `/events` (Next.js App Router convention). This discrepancy was discovered during implementation and caused confusion in manual verification steps.

### 5. Tailwind v4 Spacing Token Conflict (from E4.2 / E3.x)
`--spacing-xl: 80px` in `@theme` overrides Tailwind's named size scale. `max-w-xl` resolved to 80px, not 576px. This was a silent layout bug discovered from a screenshot review. The codebase had no documentation of this v4-specific behavior.

---

## Root Causes (Systemic)

| Cause | Category | Impact |
|---|---|---|
| Story prerequisites not explicit | Process | Primary — caused the Zod install attempt |
| No pre-install dependency analysis | Process | Primary — would have caught version conflicts |
| Tailwind v4 API differences not documented | Documentation | Secondary — caused silent layout bug |
| Zod v4 API differences not documented | Documentation | Secondary — affected `z.enum` and `z.preprocess` patterns |
| Route naming convention not enforced in docs | Documentation | Minor — caused confusion in verification |

---

## Lessons Learned

### Lesson 1 — Dependency Prerequisites Must Be Explicit
Every story that uses a library must explicitly declare it as a prerequisite in the story ticket AND verify it exists in `package.json` before implementation begins. "The story says use X" is not a guarantee that X is installed.

### Lesson 2 — Verify Version API Compatibility
"Latest" does not mean "same API as previous version." Before using a library, confirm:
- Which version is installed (`package.json`)
- Whether the API matches the code examples in the story
- Zod v4 has breaking changes vs v3 (e.g., `z.enum()` uses `{ error }` not `.message`, `z.preprocess` is the correct pattern for empty string handling)

### Lesson 3 — Tailwind v4 Named Size Scale Is Overridden by `--spacing-*` Tokens
In this project, `--spacing-xl: 80px` is defined in `@theme`. This overrides `max-w-xl`, `h-xl`, `w-xl`, etc. Never use named size classes (`max-w-xl`, `max-w-lg`, `max-w-sm`) — always use explicit pixel values (`max-w-[576px]`, `max-w-[600px]`).

### Lesson 4 — Stop and Analyze > Keep Patching
When the environment is broken (commands not found, corrupted node_modules), the right move is full cleanup (`rm -rf node_modules && pnpm install`) before any other action. Patching on top of a corrupted environment compounds the problem.

### Lesson 5 — Branch Before Any Implementation Work
Even for "simple" stories, create the feature branch before touching any file. This provides a clean recovery point and keeps `main` clean.

---

## Action Items

### Process Improvements

**[P1] Dependency Pre-Check Checkpoint — PERMANENT PROCESS GATE**
Before planning or implementing any story that introduces a new dependency or env var:
- a) Is the npm package in `package.json`? If not, add it first as a separate task.
- b) Is the installed version compatible with the code examples in the story?
- c) Are all required env vars declared in `.env.example`?
- d) Does this dependency introduce any API differences vs previous versions used in the project?

Owner: Developer agent (apply at planning phase)
Success: No story reaches implementation with an implicit prerequisite

**[P2] Branch-first discipline**
Feature branch must exist before any file is touched. No implementation on `main`.

Owner: Developer agent (already addressed, reinforce)

### Documentation Fixes

**[D1] Fix `docs/stories/epic-4-eventos.md`**
- Change all route references from `/eventos` → `/events`
- Add to E4.3: `**Prerequisites:** zod ∈ package.json (≥ 4.0.0)`
- Add to E4.3: `**Note:** Stories 4.3 and 4.5 are delivered as a single commit — they implement one component.`

Owner: Tech Writer / Amelia
Priority: Before E4.4 planning

**[D2] Update `docs/architecture/coding-standards.md`**
Add section: Tailwind v4 Spacing Token Conflict — never use named size classes, always use explicit px values.
Add section: Zod v4 Patterns — `z.preprocess` for empty strings, `z.enum({ error: ... })` API.

Owner: Architect / Charlie
Priority: Before E4.4 planning

### Critical Path for E4.4

**[C1] Verify E4.3 implementation**
Run: `pnpm tsc --noEmit && pnpm lint && pnpm build`
Confirm: `/events` appears as `○ (Static)` in build output
Then commit E4.3 files.

**[C2] Configure env vars for E4.4**
Required: `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
Owner: Mauricio (external credentials)
Must be done before implementing E4.4.

---

## Readiness Assessment — E4.3

| Dimension | Status | Notes |
|---|---|---|
| Code correctness | ✅ Reviewed | AR + Plan Mode + manual inspection |
| Testing | ⏳ Pending | tsc + lint + build + manual smoke test |
| Committed | ⏳ Pending | Files are untracked/modified |
| Dependencies | ✅ Installed | zod in package.json, node_modules clean |
| Documentation | ⚠️ Needs fix | Route discrepancy in story doc |

---

## Next Steps

1. **Complete E4.3 verification** — `pnpm tsc --noEmit && pnpm lint && pnpm build`
2. **Commit E4.3** — `app/events/schema.ts`, `actions.ts`, `event-contact-form.tsx`, `page.tsx`, `package.json`, `pnpm-lock.yaml`
3. **Apply doc fixes [D1]** — `docs/stories/epic-4-eventos.md`
4. **Apply coding-standards updates [D2]** — Tailwind v4 + Zod v4 patterns
5. **Configure env vars [C2]** — Mauricio to set up Resend + Upstash credentials
6. **Implement E4.4** with dependency pre-check checkpoint active

---

## Process Gate Added — Dependency Pre-Check

The following checkpoint is now a permanent part of story planning and implementation:

```
DEPENDENCY PRE-CHECK (run before any implementation):
□ All required npm packages are in package.json
□ Installed versions match the API used in the story
□ All required env vars are in .env.example
□ Any version-specific API differences are documented
□ Feature branch exists before any file is touched
```

This gate applies to ALL stories going forward, not just E4.x.

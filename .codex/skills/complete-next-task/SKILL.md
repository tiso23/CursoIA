---
name: complete-next-task
description: "Orchestrate the complete workflow for exactly one documented project task associated unambiguously with a GitHub issue: select and implement it, move its issue to Doing, verify acceptance criteria, create and push one approved Commitlint-valid commit, and move the issue to Done only after every check succeeds. Use when the user asks to complete the next implementation task end to end."
---

# Complete Next Task

## Objective

Complete exactly one task and its associated GitHub issue by coordinating the project skills in a strict sequence. Stop at the first failed, rejected, unavailable, or ambiguous phase and report the exact stopping point.

## Required Skills

Load every required `SKILL.md` from `D:\Desarrollos_VSCode\Curso_Vitae\.codex\skills` before acting:

- `$execute-implementation-task`
- `$update-github-issue-state`
- `$create-github-commit`

## Required Agents

Load the following agent from `D:\Desarrollos_VSCode\Curso_Vitae\.codex\agents` before acting:

- `@acceptance-reviewer`

Use those exact project skill names. Do not replace any required skill with improvised commands, direct equivalent tool calls, or duplicated instructions. Do not omit a skill even when Codex can perform its function directly.

If a required skill is unavailable, cannot be loaded, rejects its operation, or cannot satisfy the requested phase, stop and report it. The restrictions and approval requirements of each specialized skill prevail during its phase.

If `@acceptance-reviewer` is unavailable, cannot be loaded, fails to run, returns output that does not end with `VERDICT: APPROVE` or `VERDICT: REJECT`, or returns `VERDICT: REJECT`, stop immediately. Leave the issue in `Doing` and report the exact output of the reviewer (or the failure reason if it did not run). Do not continue to the commit phase.

## Workflow

Maintain exactly one active task and one associated issue throughout this workflow.

### 1. Select The Task And Issue

Use the detection and analysis instructions from `$execute-implementation-task` to identify the current or next task from the real repository state.

Before modifying GitHub, branches, or application files:

1. Read the complete selected task and its acceptance criteria.
2. Find an explicit, unique association between that task and a GitHub issue number.
3. Confirm that the issue belongs to the repository derived from `origin`.
4. Record the initial worktree state.

Do not infer an issue from similar wording alone. If the task has no unambiguous issue association, stop before modifying GitHub or the repository and report that the association must be added.

### 2. Start The Issue

Invoke `$update-github-issue-state ISSUE_NUMBER doing`.

Require this phase to:

- Read the issue.
- Move it to `Doing`.
- Create or select the required `issue-ISSUE_NUMBER` branch from local `dev`.
- Switch the local repository to that branch.

Do not implement the task unless this phase succeeds completely.

### 3. Implement Exactly One Task

Use `$execute-implementation-task` for its analysis, implementation, and verification responsibilities:

- Implement only the selected task.
- Preserve pre-existing user changes.
- Respect project documentation and `AGENTS.md`.
- Do not change task status in `docs/implementation-tasks.md`.
- Verify every acceptance criterion with local evidence.
- Run the relevant tests, lint, typecheck, or build commands.

The commit phase belongs exclusively to `$create-github-commit` in this orchestrated workflow. Do not run a separate auto-commit from `$execute-implementation-task`. If `$execute-implementation-task` cannot complete its delegated implementation and verification phase without creating a commit, stop and report the contract conflict before committing.

Stop if implementation or any required verification fails. Do not continue to acceptance review or commit or `Done`.

### 3.5. Acceptance Review

Invoke `@acceptance-reviewer TASK_NUMBER` where `TASK_NUMBER` is the integer number of the selected task.

Require the agent to:

- Read `docs/implementation-tasks.md` and locate the task section.
- Read every source file and acceptance criterion for that task.
- Inspect the current `git diff HEAD` and repository state.
- Run non-destructive verifications (`tsc --noEmit`, lint, build) without modifying any file.
- Classify each acceptance criterion as `PASS`, `FAIL`, or `UNVERIFIED`.
- Return exactly `VERDICT: APPROVE` as the final line when every criterion is `PASS`.
- Return exactly `VERDICT: REJECT` as the final line in any other case.

**Stop conditions for this phase — leave the issue in `Doing`:**

- `@acceptance-reviewer` is not present in `.codex/agents/` or cannot be loaded.
- The agent fails to run or exits with an error.
- The agent output does not end with `VERDICT: APPROVE` or `VERDICT: REJECT` (ambiguous result).
- The agent ends with `VERDICT: REJECT`.

When this phase stops, report the full reviewer output (or the reason it did not run) and take no further action. Do not retry the reviewer or attempt to fix the failing criteria. Do not continue to the commit phase.

Proceed to the commit phase only when `@acceptance-reviewer` ends with `VERDICT: APPROVE`.

### 4. Create And Push One Commit

Invoke `$create-github-commit ISSUE_NUMBER`.

Require it to:

- Propose the exact included and excluded files.
- Build and validate a Conventional Commit message with Commitlint.
- Include `Refs #ISSUE_NUMBER`.
- Request explicit user approval before staging, committing, or pushing.
- Create exactly one approved commit.
- Push the current issue branch.

When the skill pauses for approval, preserve this workflow state and resume at this phase after the user responds. Do not stage, commit, or push through another path.

### 5. Verify Commit And Push

Continue only when `$create-github-commit` reports all of the following:

- Commitlint validation succeeded.
- Exactly one commit was created from the approved files.
- A commit hash was obtained.
- The current issue branch was pushed successfully to its configured remote.
- No commit or push error remains unresolved.

Treat missing evidence as a failed phase. Do not retry with direct Git commands that bypass the required skill.

### 6. Complete The Issue

Invoke `$update-github-issue-state ISSUE_NUMBER done` only after all previous phases succeed.

Allow that skill to re-read the issue and independently validate its completion rules. If any rule is unverifiable, ambiguous, or failing, leave the issue out of `Done` and report the evidence.

Do not close the GitHub issue unless the user explicitly requests closure separately.

## Stop Conditions

Stop immediately and preserve the current repository state when:

- The selected task is not associated unambiguously with one issue.
- A required skill is missing, unreadable, rejects the operation, or conflicts with its assigned phase.
- Moving the issue to `Doing` or creating the issue branch fails.
- Implementation changes would exceed the selected task.
- An acceptance criterion or project verification fails.
- `@acceptance-reviewer` is unavailable, fails to run, produces an ambiguous result, or ends with `VERDICT: REJECT`.
- The user does not approve the commit proposal.
- Commitlint, commit creation, or push fails.
- The final `Done` validation fails.

Never skip ahead after a failed phase. Never mark the issue `Done` based only on an implementation claim.

## Final Report

Report concisely:

- Selected task and issue number.
- Current issue status and branch.
- Implementation and acceptance-criteria evidence.
- Verification commands and results.
- Commit hash and pushed branch, when successful.
- Final issue status.
- Exact phase and reason when the workflow stopped.

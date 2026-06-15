---
name: update-github-issue-state
description: "Manage GitHub issue workflow state for this repository using the GitHub MCP. Use when the user asks to update a numbered GitHub issue with two required parameters: an issue number and a change type of doing or done; for doing, read the issue, move it to Doing, create a local branch from dev with the issue number, and switch the repo to that branch; for done, validate the issue's stated completion rules before moving it to Done."
---

# Update GitHub Issue State

## Inputs

Require both inputs before acting:

- `issue_number`: GitHub issue number.
- `change_type`: exactly `doing` or `done`.

If either input is missing or `change_type` has another value, ask for the missing value and stop.

## Repository Context

Derive `owner` and `repo` from `git remote -v`. Prefer `origin` and parse both HTTPS and SSH GitHub remotes.

Use the GitHub MCP for issue operations. If GitHub tools are not loaded, discover them with `tool_search` using queries such as `github issue read`, `github issue write`, and `github issue fields`.

Use these MCP operations when available:

- `mcp__github.issue_read` with `method: "get"` to read the issue.
- `mcp__github.issue_read` with `method: "get_comments"` to read validation discussion when checking `done`.
- `mcp__github.list_issue_fields` to discover the issue field that represents workflow status.
- `mcp__github.issue_write` with `method: "update"` and `issue_fields` to set the status.

## Status Field

Find a single-select issue field named `Status`, `Estado`, or an obvious workflow equivalent. Match option names case-insensitively:

- `doing` maps to `Doing`.
- `done` maps to `Done`.

Use the exact option name returned by `list_issue_fields` in `field_option_name`. If no matching field or option exists, do not guess; report the available fields/options and ask the user how to proceed.

## Workflow: doing

1. Read the issue with `issue_read`.
2. Move the issue status to `Doing` with `issue_write`.
3. Inspect the local git state with `git status --short` and current branch with `git branch --show-current`.
4. Create and switch to a branch from local `dev`:
   - If local `dev` does not exist, stop and explain that the branch must be created from local `dev`.
   - If the working tree has uncommitted changes, try the branch switch only if Git can do it cleanly; never stash, discard, or reset changes unless the user explicitly asks.
   - Use branch name `issue-<issue_number>`, for example `issue-12`.
   - Run `git switch dev` and then `git switch -c issue-<issue_number>`.
   - If `issue-<issue_number>` already exists, switch to it only after confirming it is the intended branch; do not recreate it.
5. Report the issue title, new status, and current local branch.

## Workflow: done

1. Read the issue with `issue_read`.
2. Read issue comments with `issue_read` using `method: "get_comments"`.
3. Identify validation rules in the issue body and comments. Treat sections named like `Validacion`, `Reglas de validacion`, `Criterios de aceptacion`, `Acceptance Criteria`, `Definition of Done`, or checked task lists as validation requirements.
4. Verify each rule against the repository state. Use project commands that already exist, such as tests, lint, typecheck, or build, when they are relevant to the issue. Do not edit code while validating.
5. If any rule cannot be verified, fails, or is ambiguous, do not move the issue to `Done`. Report the unchecked rule and the evidence gathered.
6. If all rules pass, move the issue status to `Done` with `issue_write`.
7. Report the issue title, validation evidence, and new status.

## Guardrails

- Do not modify application code as part of this skill.
- Do not close the GitHub issue unless the user explicitly asks; changing the workflow status is enough.
- Do not create pull requests, push branches, or commit changes unless the user explicitly asks.
- Do not use destructive git commands such as `git reset --hard`, `git checkout --`, or file deletion for cleanup.
- Keep the work limited to the requested issue number and requested state change.

---
name: create-github-commit
description: "Prepare, validate, create, and push a Git commit from existing repository changes, with an optional GitHub issue number. Use when the user asks to commit or push work and requires review of the exact included files, a Commitlint-compatible Conventional Commit message, an approved commit description, and optional GitHub issue association before any staging, commit, or push."
---

# Create GitHub Commit

## Inputs

Accept one optional input:

- `issue_number`: GitHub issue number to read and associate with the commit.

Do not require an issue number. If it is omitted, create a commit without an issue footer.

## Repository Context

1. Read `git status --short`, the current branch, configured upstream, and `git remote -v`.
2. Derive GitHub `owner` and `repo` from the `origin` remote. Support HTTPS and SSH remotes.
3. Inspect unstaged, staged, and untracked changes. Never assume all changes belong in one commit.
4. Do not edit application code, documentation, or existing changes as part of this skill.

## Optional GitHub Issue

When `issue_number` is provided:

1. Use the GitHub MCP `mcp__github.issue_read` with `method: "get"`.
2. Confirm the issue exists in the repository derived from `origin`.
3. Use the issue title and body only to understand commit scope and wording.
4. Associate the commit without closing the issue by adding `Refs #<issue_number>` as the final commit footer.
5. Do not update, label, close, or comment on the issue.

If GitHub tools are not loaded, discover `github issue read` with `tool_search`.

## Commitlint Setup

Before preparing the commit, verify that Commitlint is available:

1. Prefer the repository-local installation.
2. Check for `@commitlint/cli`, `@commitlint/config-conventional`, and a Commitlint config file.
3. If missing, install:

   `npm install --save-dev @commitlint/cli @commitlint/config-conventional`

4. Configure `commitlint.config.cjs` to extend `@commitlint/config-conventional`.
5. Add an npm script named `commitlint` when the repository uses npm and the script is absent.
6. Limit bootstrap changes to package manager files and Commitlint configuration. Do not edit application code.
7. Treat setup files as ordinary changes: include them in the proposed file list only when appropriate and never stage them before approval.

## Prepare Proposal

1. Group the existing changes into one coherent commit. If they contain unrelated work, propose a smaller file set or ask the user which group to commit.
2. Draft a Conventional Commit header:

   `<type>(optional-scope): concise imperative subject`

3. Choose the narrowest suitable type, commonly `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, or `chore`.
4. Draft a short commit body describing what changed and why. This is the commit description.
5. Add `Refs #<issue_number>` as the final footer when an issue number was provided.
6. Validate the exact multiline message with the repository-local Commitlint command:

   `npm run commitlint`

   Pipe the proposed message through standard input. If validation fails, revise the message and validate again before showing it to the user.

## Required Approval

Before running `git add`, present:

- Exact files to include.
- Exact files that will remain excluded.
- Commit header.
- Commit body or explicit statement that the body is empty.
- Issue footer, when present.
- Current branch and push destination.

Ask for explicit approval of the files, header, body, issue footer, and push. Stop and wait.

Treat edits requested by the user as rejection of the current proposal. Revise, rerun Commitlint, and request approval again.

## Commit And Push

Only after explicit approval:

1. Stage the approved files with explicit paths. Never use `git add .` or `git add -A`.
2. Run `git status --short`, `git diff --cached --name-only`, and inspect the staged diff.
3. If the staged files differ from the approved list, stop without committing.
4. Create the commit using the approved header, body, and optional `Refs #N` footer.
5. Read the resulting commit hash and summary.
6. Push the current branch:
   - Use `git push` when an upstream exists.
   - Use `git push -u origin <current-branch>` when no upstream exists.
7. Report the commit hash, pushed branch, associated issue when present, and any files left uncommitted.

## Guardrails

- Do not edit code to make a commit pass.
- Do not stage or commit files that were not explicitly approved.
- Do not amend, rebase, force-push, reset, stash, or discard changes.
- Do not commit directly to a protected branch unless the user explicitly approves that branch in the proposal.
- Do not expose secrets. Inspect likely environment and credential files before proposing them.
- If Commitlint, commit, or push fails, report the failure and preserve the repository state.

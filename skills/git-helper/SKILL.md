---
name: git-helper
description: Automated git workflow management for initializing repositories, configuring .gitignore, and performing safe git operations. Use for (1) Starting new projects with git init, (2) Setting up standard .gitignore files, (3) Performing daily git tasks like add, commit, push, pull, (4) Ensuring safety by preventing direct pushes to the main branch.
---

# Git Helper

## Overview

This skill provides a streamlined and safe workflow for managing git repositories. It automates the initialization process, handles common .gitignore configurations, and enforces safety rules to protect the main branch.

## Core Workflows

### 1. Project Initialization
When starting a new project, follow these steps:
1.  Run `git init`.
2.  Create a `.gitignore` file using the templates in `references/gitignore_templates.md`.
3.  Add all initial files: `git add .`.
4.  Create the initial commit: `git commit -m "initial commit"`.

### 2. Daily Git Operations
Use standard git commands for routine tasks:
- **Add**: `git add <files>` or `git add .`
- **Commit**: `git commit -m "<message>"`
- **Pull**: `git pull origin <branch>`
- **Status**: `git status`

### 3. Safe Pushing
**CRITICAL**: Always use the `scripts/safe_push.sh` script instead of raw `git push` to ensure you don't accidentally push to the `main` or `master` branch.

Usage:
```bash
./skills/git-helper/scripts/safe_push.sh origin <branch_name>
```

## Resources

### scripts/
- `safe_push.sh`: A bash script that verifies the current branch is not `main` or `master` before executing the push command.

### references/
- `gitignore_templates.md`: Contains curated .gitignore entries for Node.js, Python, OS-specific files, and IDE configurations. Includes protection for sensitive files like `.env`.

## Safety Rules
- **NEVER** push directly to `main` or `master`. Always work on feature branches and use PRs or the safe push script.
- **ALWAYS** check `git status` before adding and committing to ensure no sensitive files are staged.
- **ALWAYS** ensure `.gitignore` is present and correctly configured before the first commit.

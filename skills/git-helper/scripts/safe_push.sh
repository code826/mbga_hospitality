#!/bin/bash

# Get the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" == "main" ] || [ "$current_branch" == "master" ]; then
    echo "❌ Error: Pushing directly to '$current_branch' is prohibited by the git-helper skill."
    exit 1
fi

echo "🚀 Pushing branch '$current_branch' to remote..."
git push "$@"

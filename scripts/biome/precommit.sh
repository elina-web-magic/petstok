#!/usr/bin/env bash

files=$(git diff --cached --name-only --diff-filter=ACMR | grep -E "\.(js|ts|tsx|jsx|json|css)$" || true)

if [ -n "$files" ]; then
	echo "Staged files found:"
	echo "$files"

	pnpm exec biome check --write --no-errors-on-unmatched $(echo "$files" | tr '\n' ' ')
	git add $(echo "$files" | tr '\n' ' ')
else
	echo "No staged files to fix."
fi
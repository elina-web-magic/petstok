#!/usr/bin/env bash

files=$(git diff --cached --name-only --diff-filter=ACMR | grep -E "\.(js|ts|tsx|jsx|json|css)$")
if [ -n "$files" ]; then
	echo "Staged files found: $files"
	pnpm exec biome check --write --no-errors-on-unmatched "$files"
	git add $files
else
	echo "No staged files to fix."
fi
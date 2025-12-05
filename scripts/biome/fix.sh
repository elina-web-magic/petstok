#!/usr/bin/env bash

if [ -z "$1" ]; then
	echo "Running Biome fix on ALL files..."
	pnpm exec biome check --write --unsafe .
else
	echo "Running Biome fix on: $@"
	pnpm exec biome check --write --unsafe "$@"
fi
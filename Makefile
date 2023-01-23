SHELL:=/bin/bash
.ONESHELL:
.PHONY: build clean clean-dist-files dev help install start

build: clean ## Build production package
	@/bin/bash -c 'NODE_OPTIONS='--openssl-legacy-provider' NODE_ENV=production npx nuxt generate'

show-files: ## Show files to be removed beforehand
	@/bin/bash -c 'find ./dist/* -type f -exec ls {} \;' || true

clean-dist-files: ## Remove files in /dist subdirectories
	@/bin/bash -c 'find ./dist/* -type f -exec rm -f --verbose {} \;' || true

clean: show-files clean-dist-files ## Remove build application directory
	@export IFS=$$'\n'
	for directory in $$(find ./dist/* -type d | sort --reverse);
	do
		bash -c "rmdir --verbose '$$directory'";
	done

dev: clean ## Start development server
	@/bin/bash -c 'source .env && NODE_OPTIONS='--openssl-legacy-provider' npx nuxt'

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## Lint source files
	@/bin/bash -c 'npx eslint --fix --ext .ts,.js,.vue .'

install: ## Install dependencies
	@/bin/bash -c '( test -e .env && source .env || true ) && NODE_OPTIONS='--openssl-legacy-provider' npm install'

start: clean ## Start production server
	@/bin/bash -c 'source .env && npx nuxt start'

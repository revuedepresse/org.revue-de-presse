SHELL:=/bin/bash
.ONESHELL:
.PHONY: dev generate help install start

deps-analysis: ## Analyze dependencies graph
	@/bin/bash -c 'NODE_OPTIONS="--openssl-legacy-provider" npx nuxt build --modern --analyze'

generate: ## Build production package
	@/bin/bash -c 'NODE_OPTIONS="--openssl-legacy-provider" NODE_ENV=production npx nuxt generate --modern'

build: generate ## Build production package
	@export IFS=$$'\n'

	for page in $$(find ./dist/* -type f | sort --reverse);
	do
		\cat $$page | sed -E 's#\{\{ date \}\}#'"$$(echo "$${page}" | sed -E 's/\.\/dist\///g' | sed 's#\.html##g')"'#g' > ./template.html
		mv ./template.html $$page
	done

dev: ## Start development server
	@/bin/bash -c 'source .env && NODE_OPTIONS="--openssl-legacy-provider" npx nuxt'

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## Lint source files
	@/bin/bash -c 'npx eslint --fix --ext .ts,.js,.vue .'

install: ## Install dependencies
	@/bin/bash -c '( test -e .env && source .env || true ) && NODE_OPTIONS="--openssl-legacy-provider" npm install'

start: clean ## Start production server
	@/bin/bash -c 'source .env && npx nuxt start'

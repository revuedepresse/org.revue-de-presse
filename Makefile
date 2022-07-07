SHELL:=/bin/bash

.PHONY: build dev help install start

build: ## Build production package
	@/bin/bash -c '( test -e .env && source .env || true ) && npx nuxt generate'

dev: ## Start development server
	@/bin/bash -c 'source .env && npx nuxt'

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## Lint source files
	@/bin/bash -c 'npm run lint'

install: ## Install dependencies
	@/bin/bash -c '( test -e .env && source .env || true ) && npm install'

start: ## Start production server
	@/bin/bash -c 'source .env && npx nuxt start'

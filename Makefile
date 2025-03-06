SHELL:=/bin/bash
.ONESHELL:
.PHONY: dev generate help install start

deps-analysis: ## Analyze dependencies graph
	@/bin/bash -c 'NODE_OPTIONS="--openssl-legacy-provider" npx nuxt build --modern --analyze'

generate: ## Build production package
	@/bin/bash -c 'NODE_OPTIONS="--openssl-legacy-provider" NODE_ENV=production npx nuxt generate --modern'

publish-asset-links: ## Publish assets links for TWA
	@/bin/bash -c 'mkdir -p dist/well-known && cp ./static/assetlinks.json ./dist/well-known'

copy-domain-name-ownership-proof: ## Copy proof of domain name ownership
	@/bin/bash -c 'cp ./static/2023-03-14_linkedin-community-management-api-validation.txt ./dist/well-known'

build: generate publish-asset-links copy-domain-name-ownership-proof ## Build production package
	@/bin/bash -c 'source fun.sh && move_pages'

dev: ## Start development server
	@/bin/bash -c 'source .env && NODE_OPTIONS="--openssl-legacy-provider" npx nuxt'

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## Lint source files
	@/bin/bash -c 'npx eslint --fix --ext .ts,.js,.vue .'

install: ## Install dependencies
	@/bin/bash -c '( test -e .env && source .env || true ) && NODE_OPTIONS="--openssl-legacy-provider" npm install'

install-bubblewrap: ## Install bubblewrap
	@/bin/bash -c 'asdf install nodejs 18.14.2 && asdf local nodejs 18.14.2 && npm i -g @bubblewrap/cli'

start: clean ## Start production server
	@/bin/bash -c 'source .env && npx nuxt start'

update-twa: install-bubblewrap ## Build Android app using Trusted Web Activites
	@/bin/bash -c 'asdf local nodejs 18.14.2 && bubblewrap update'


# SLS=./node_modules/.bin/serverless
SLS=./scripts/sls.sh

.PHONY: deploy print package check-env

deploy: check-env
	@$(SLS) $(stage) deploy

print: check-env
	@$(SLS) $(stage) print

package: check-env
	@$(SLS) $(stage) package

smoketest:
	@bundle exec ruby scripts/putgetTest.rb

domain: check-env
	@$(SLS) $(stage) create_domain

check-env:
ifndef stage
	$(error Rerun as 'make <command> stage=<something>')
endif

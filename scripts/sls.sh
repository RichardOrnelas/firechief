#!/bin/bash
# This is because serverless has a stupid annoying interpolation system
# that cannot properly do `profile=acorns-${stage}`
# so we make this elaborate script to fix it
#
# Call this using:
# sls.sh <environment> <sls_command> [sls_params...]

deploy_env=$1
sls_command=$2

shift
shift

revision=$(git rev-parse --quiet --short HEAD | xargs echo -n)

# Force the profile for the ARN resolvers
export AWS_PROFILE="acorns-${deploy_env}"
export RELEASE_VERSION="${revision}"

./node_modules/.bin/serverless ${sls_command} \
  --stage ${deploy_env} \
  --aws-profile acorns-${deploy_env} \
  $*
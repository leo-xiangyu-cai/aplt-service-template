#!/usr/bin/env sh

set -euo pipefail

readonly service_name="${1}"
pwd
ls -la
#cruft create . --no-input --extra-context "{\"service_name\": \"$service_name\"}"
cruft create .
#cruft create https://github.com/timothycrosley/cookiecutter-python/

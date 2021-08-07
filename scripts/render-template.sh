#!/usr/bin/env sh

set -euo pipefail

readonly service_name="${1}"
cruft create . --no-input --extra-context "{\"service_name\": \"$service_name\"}"

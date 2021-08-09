#! /usr/bin/bash

set -euo pipefail

git init

declare blue
blue=$'\e[1;34m'
end=$'\e[0m'

git add .
git commit -m "git init"

printf "%s\n" "${blue}Input your remote git repo url:${end}"
read -r remoteRepo
git remote add origin "$remoteRepo"
git remote -v

git push origin master

git config core.hooksPath './scripts/hooks'

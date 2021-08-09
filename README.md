# Aplt Service Template
This is a template to generate a pre-configured Aplt service repository.

The generated project will include the following:
- a scaffolded Koa service
- logging (TODO)
- health checks (TODO)
- sensible defaults:
    - CI pipeline as code (TODO)
    - Unit tests (with coverage)
    - linting
    - batect tasks for: unit testing, linting, etc.
- shifting security left (TODO):
  - secrets detection, image vulnerability scan

## Prerequisites
* Docker

## Usage

1. Clone this repository. 
1. Use batect to generate a service repository.
```shell
# Replace Sample Template with the name of your service (e.g. Account)
./batect render -- "Sample Template"
```
1. Move the directory to where you want to locally place.
```shell
mv sample-template ..
```
1. GitHub: Create a new repo on github.

1. Git: run following command and add the remote repo address.
```shell
sh scripts/git-init.sh
```
You can do it by yourself without the bash script. Init, add, commit and push your new repo to github.

If you do it without bash shell, remember to run the following batect task before git push so that the pre-push command can be triggered by git push.
```shell
./batect setupGitHooks
```

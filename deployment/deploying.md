Caution: this information is likely to be outdated.

Updated version available here: https://publichappinessmovement.com/t/topic/1880/


# Deploying

## Overview

Deployment to the live sites is controlled via branches:

* `deploy-phm` for publichappinessmovement
* `deploy-btm` for brightertomorrowmap

Travis will watch those branches for changes and automatically deploy if they are updated.

## Promoting a change to production

If for example you want to deploy what's on the current `master` branch to publichappinessmovement, you would do:

```
$ git branch -f deploy-phm master
$ git push origin deploy-phm
```

This updates `deploy-phm` to point at the same commit `master` is pointed at, and then pushes the update to `deploy-phm` to Github. (This is no different to doing a fast-forward merge on that branch, but `commit -f` saves you the extra step of checking the branch out.)

You can also deploy any other commit either by passing in the commit hash or the name of a branch pointing at it:

```
$ git branch -f deploy-phm 2f87a4b3
$ git push origin deploy-phm
```

```
$ git branch -f deploy-phm some-testing-branch
$ git push origin deploy-phm
```

If the update is not a fast-forward from the deploy branch's previous state, you will need to force push.

## Adding / changing production environments

Deployment configurations for each website/environment are contained in subdirectories here, e.g. [./brightertomorrowmap/](./brightertomorrowmap/).

The mapping of branch name to directory is handled by [branch-to-dir.sh](./branch-to-dir.sh) and you can change mappings by changing that file.

To add a new website, create a new subdirectory, put its deployment configurations in it, and add the mapping from your desired deployment branch name to `branch-to-dir.sh`. You will also need to add the branch to the list in `.travis.yml` to make Travis deploy from it.

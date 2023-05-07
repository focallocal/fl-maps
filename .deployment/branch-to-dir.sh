#!/usr/bin/env bash
set -euo pipefail

# This file is used by Travis to map branch names to deployment settings
# See `deploying.md` for more details

branch_name="${1?Expected branch name as 1st parameter}"

case "$branch_name" in
    master)
        echo "testing"
        ;;

    deploy-btm)
        echo "brightertomorrowmap"
        ;;

    deploy-phm)
        echo "publichappinessmovement"
        ;;

    *)
        echo "Error: did not recognise branch name \"$branch_name\"" >&2
        exit 1
        ;;
esac

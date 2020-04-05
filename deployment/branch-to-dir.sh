#!/usr/bin/env bash
set -euo pipefail
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

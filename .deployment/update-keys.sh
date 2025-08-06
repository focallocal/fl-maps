#!/usr/bin/env bash
set -euo pipefail

# run this to re-encrypt all secret files after adding/removing PGP keys
# see `secrets.md` for more

show-error() {
    echo "An error occurred. Your secrets files may be in a broken state, and you should revert any changes made using Git."
    exit 1
}

for file in */*enc*; do
    echo "Updating keys for $file"
    GPG_TTY=$(tty) sops updatekeys -y "$file"
    echo "Rotating master encryption key for $file"
    sops --rotate --in-place "$file"
done


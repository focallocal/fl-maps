We are using [sops](https://github.com/mozilla/sops) to manage secrets. It can encrypt the sensitive portions of json and yaml files while leaving non-sensitive parts, and the overall file structure, visible. It can also encrypt entire files of any type.

## Viewing or changing secrets

To view or change secrets, first you will need to install sops and GPG.

You will need to have the public key of everyone else currently authorised to access the files in your GPG keyring. For convenience, the public key Travis-CI is using is included here (`travis.gpg`).

The easiest way to edit files is to run the command `sops filename.json`. This will open them in your default editor so make sure `EDITOR` is set to something you like.

Example:

```
$ EDITOR=nano
$ sops settings.enc.json
```

This will open the decrypted file in your editor, and automatically re-encrypt it when you quit your editor.

You can also decrypt the files more permanently via:

```
$ sops --output settings.json --decrypt settings.enc.json
```

## Adding / removing people

Update [.sops.yaml](./.sops.yaml) to add/remove the PGP keys in question. Inside this file there are multiple lists of PGP keys, they should all be kept the same so you should add/remove your key to/from each of them. The lists are comma-separated.

Once you've done that, run the [update-keys.sh](./update-keys.sh) script. It should re-encrypt all the files and rotate the master encryption keys.

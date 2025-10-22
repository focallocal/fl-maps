# fl-maps Docker container

This folder contains a production Dockerfile to build a Meteor server bundle and run it with Node.

Production build (server bundle)
--------------------------------

This Dockerfile performs a multi-stage build:

- builder: installs Meteor, optionally decrypts `.deployment` files using sops (BuildKit secret), runs `meteor build --server-only`, and installs production npm modules inside the bundle
- runtime: copies the built `/bundle` and runs `node main.js`

Build (recommended, with BuildKit for secure sops key):

```bash
DOCKER_BUILDKIT=1 docker build \
	--secret id=sops_gpg_key,src=path/to/private.key \
	--build-arg BRANCH=master \
	-t fl-maps:prod -f fl-maps/Dockerfile .
```

If you don't need to decrypt `.deployment` files during image build, omit the `--secret` argument.

Run the production container (example):

```bash
# mount settings.json into the container or pass settings via env var METEOR_SETTINGS
docker run --rm -p 3005:3005 \
	-v $(pwd)/fl-maps/settings.json:/opt/app/programs/server/assets/app/settings.json:ro \
	-e PORT=3005 \
	-e NODE_ENV=production \
	fl-maps:prod
```

Notes and tips
-------------
- The runtime image runs `node main.js` from the Meteor-produced bundle. That bundle expects settings to be available at `programs/server/assets/app/settings.json` or via the `METEOR_SETTINGS` env var.
- For production it's best to supply `settings.json` via a secure volume or set `METEOR_SETTINGS` in your orchestrator (Kubernetes secrets, Docker secrets, etc.).
- The Dockerfile uses a BuildKit secret mount to import the GPG key only during build; this avoids leaking the key into image layers. Example shown above uses `DOCKER_BUILDKIT=1` and `--secret`.



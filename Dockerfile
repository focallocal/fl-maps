# Production Dockerfile for fl-maps (Meteor bundle -> Node runtime)
# Stage 1: build the Meteor server bundle (requires Meteor CLI)
FROM node:18-bullseye AS builder

ARG METEOR_RELEASE=2.12.0
ARG SOPS_VERSION=3.5.0
ARG BRANCH=master
ENV METEOR_ALLOW_SUPERUSER=1

# Install system deps and sops (robust: noninteractive, retry apt-get update, cleanup)
RUN set -eux; \
        export DEBIAN_FRONTEND=noninteractive; \
        for i in 0 1 2; do apt-get update && break || sleep 5; done; \
        apt-get install -y --no-install-recommends \
            curl ca-certificates python3 build-essential gnupg dirmngr apt-transport-https; \
        rm -rf /var/lib/apt/lists/*

# Install Meteor
RUN curl https://install.meteor.com/ | /bin/sh

WORKDIR /app

# Copy package.json first for better cache on npm installs (not strictly necessary for meteor build)
COPY package.json package-lock.json* ./

# Install production npm deps used by tooling; actual server bundle deps are installed into the bundle later
RUN npm install --production || true

# Copy app sources and deployment metadata
COPY . /app

# Install sops for optional decryption during build
RUN curl -L -o /tmp/sops.deb "https://github.com/mozilla/sops/releases/download/v${SOPS_VERSION}/sops_${SOPS_VERSION}_amd64.deb" && \
    dpkg -i /tmp/sops.deb || true && rm -f /tmp/sops.deb

# Decrypt .deployment files using BuildKit secret if provided
RUN --mount=type=secret,id=sops_gpg_key \
    if [ -f /run/secrets/sops_gpg_key ]; then \
      export GNUPGHOME=/tmp/gnupg && mkdir -p "$GNUPGHOME" && chmod 700 "$GNUPGHOME" && \
      GNUPGHOME=$GNUPGHOME gpg --batch --import /run/secrets/sops_gpg_key && \
      cd .deployment/$(./.deployment/branch-to-dir.sh "$BRANCH") && \
      for file in *.enc*; do GNUPGHOME=$GNUPGHOME sops --decrypt --output "${file%.enc*}${file##*.enc}" "${file}" || true; done && \
      rm -rf "$GNUPGHOME"; \
    fi || true

# Build a production server-only Meteor bundle
# Output directory is /app/build
RUN meteor build --directory /app/build --server-only --allow-superuser

# Install production node modules inside the built bundle
RUN cd /app/build/bundle/programs/server && \
    if [ -f package.json ]; then npm install --production; fi

### Stage 2: runtime
FROM node:18-slim AS runtime

WORKDIR /opt/app

# Copy bundle from builder
COPY --from=builder /app/build/bundle /opt/app

# Set production env
ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

# The meteor-built bundle expects to be run with: node main.js
CMD ["node", "main.js"]
# Multi-stage Dockerfile for fl-maps (Meteor + Node)
# Stage 1: build the Meteor bundle
FROM node:18-bullseye AS build

ARG METEOR_RELEASE=2.12.0
ENV METEOR_ALLOW_SUPERUSER=1

# Install curl and build deps (robust)
RUN set -eux; \
        export DEBIAN_FRONTEND=noninteractive; \
        for i in 0 1 2; do apt-get update && break || sleep 5; done; \
        apt-get install -y --no-install-recommends \
            curl ca-certificates python3 build-essential apt-transport-https; \
        rm -rf /var/lib/apt/lists/*

# Install Meteor (non-interactive)
RUN curl https://install.meteor.com/ | /bin/sh

WORKDIR /app

RUN ls

# Copy deployment metadata early so we can decrypt secrets during build if provided
COPY .deployment .


# Install sops so we can decrypt any encrypted settings/secrets (optional)
ARG SOPS_VERSION=3.5.0
RUN curl -L -o /tmp/sops.deb "https://github.com/mozilla/sops/releases/download/v${SOPS_VERSION}/sops_${SOPS_VERSION}_amd64.deb" && \
        dpkg -i /tmp/sops.deb || true && rm -f /tmp/sops.deb

# Use BuildKit secret to import GPG private key for sops decryption.
# To use this, build with BuildKit enabled and pass the secret with --secret id=sops_gpg_key,src=path/to/private.key
ARG BRANCH=master

# The following RUN uses BuildKit's secret mount. It will import the key from /run/secrets/sops_gpg_key
# into a temporary GNUPGHOME, decrypt files in the branch deployment dir, then remove the GNUPGHOME.
RUN --mount=type=secret,id=sops_gpg_key \
        if [ -f /run/secrets/sops_gpg_key ]; then \
            export GNUPGHOME=/tmp/gnupg && mkdir -p "$GNUPGHOME" && chmod 700 "$GNUPGHOME" && \
            GNUPGHOME=$GNUPGHOME gpg --batch --import /run/secrets/sops_gpg_key && \
            cd .deployment/$(./.deployment/branch-to-dir.sh "$BRANCH") && \
            for file in *.enc*; do GNUPGHOME=$GNUPGHOME sops --decrypt --output "${file%.enc*}${file##*.enc}" "${file}" || true; done && \
            rm -rf "$GNUPGHOME"; \
        fi || true

# Copy package and install npm deps (speeds up rebuilds)
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy the rest of the app
COPY . /app

# Build a production bundle
# Meteor bundle requires running meteor build, which outputs a tarball.
RUN meteor npm install && \
    meteor build --directory /app/build --allow-superuser || true

### Stage 2: runtime
FROM node:18-slim

WORKDIR /opt/app

# Install runtime deps (robust)
RUN set -eux; \
        export DEBIAN_FRONTEND=noninteractive; \
        for i in 0 1 2; do apt-get update && break || sleep 5; done; \
        apt-get install -y --no-install-recommends \
            ca-certificates; \
        rm -rf /var/lib/apt/lists/*

# Copy production node_modules from build stage
COPY --from=build /app/node_modules ./node_modules

# Copy app source (for Meteor run) and settings
COPY --from=build /app /opt/app

ENV PORT=3005
EXPOSE 3005

# Default command: run Meteor in production mode. This runs the app the same as "npm start".
CMD ["npm", "run", "start"]

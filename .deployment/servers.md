# Servers

## Overview

A complete site consists of three servers:

* Discourse
* fl-maps
* mongodb

The Discourse database lives on the same server as Discourse itself, but `fl-maps` and mongodb are on separate servers. The exception is the testing server, where the MongoDB server is on the same machine as the fl-maps app.

MongoDB databases for the production websites are hosted by mlab.

## Deployment architecture

The MongoDB server is configured entirely by `mup`, which also handles updating and deploying the `fl-maps` app. Travis-CI automatically deploys the `fl-maps` app for all the sites from the GitHub repo, [see deploying.md for more details](./deploying.md).

Discourse largely sets itself up via the default Docker installation method.

## Creating a Discourse Server

### Prerequisites

* A server to install on (or DigitalOcean access)
* Domain set up with Cloudflare
* Mailgun account

### Steps

1. Create a Droplet in Digital Ocean if not already done: at the time of writing, this should be a server running Ubuntu 18.04 (LTS), in the $5/month tier, in the AMS3 region. Be sure to give everyone SSH access who should have it.

2. In Cloudflare, configure the root record of the domain name to point at the IP of the Droplet, as "DNS only" not proxied, with the shortest TTL possible.

3. Create an alias for `www.` on the domain as a CNAME to the domain root, also "DNS only" with the shortest TTL possible.

4. Log in to Mailgun and add the new domain if it isn't already set up. The default options are fine.

5. Follow Mailgun's directions to add the email-related domain records to the domain in Cloudflare.

6. SSH into the new server as `root`

7. Follow [the documentation to start the Discourse install](https://github.com/discourse/discourse/blob/master/docs/INSTALL-cloud.md) (noting that you can skip the part about logging in and sudo-ing, as you are already signed in as root):

    1. Enter the domain name when prompted.
    2. Set the admin account email as `contact@focallocal.org`
    3. Take the SMTP server settings from Mailgun. To get an SMTP password, you may first need to reset it in the Mailgun interface, or create a new user.
    4. For LetsEncrypt, enter the email address `contact@focallocal.org`

8. Once the server is set up (this takes a while), confirm that it is accessible over the internet and HTTPS is working (no warnings or errors from your browser).

9. In the Cloudflare settings for the domain, change both the A record for the domain and the CNAME for `www.` that you created to be "Proxied" rather than "DNS only".

10. Also in Cloudflare, go to the "Speed" settings for the domain, and in the "Optimization" section, make sure that Brotli and Rocket Loader are both disabled.

11. Edit the file `/var/discourse/containers/app.yml`. At the bottom of the list under `templates:`, add:

    ```
      - "templates/cloudflare.template.yml"
    ```

12. Near the bottom of the file, under the `hooks:` section, there is a list that starts with:

    ```
              - git clone https://github.com/discourse/docker_manager.git
    ```

    Add the following to that list:

    ```
              - git clone https://github.com/discourse/discourse-voting
              - git clone https://github.com/davidtaylorhq/discourse-whos-online
              - git clone https://github.com/vinkas0/discourse-navigation
              - git clone https://github.com/discourse/discourse-kanban-theme
              - git clone https://github.com/sylque/dcs-discourse-plugin.git
              - git clone https://github.com/discourse/discourse-assign
              - git clone https://github.com/discourse/discourse-calendar
              - git clone https://github.com/paviliondev/discourse-custom-wizard
              - git clone https://github.com/paviliondev/discourse-events
              - git clone https://github.com/paviliondev/discourse-quick-messages
              - git clone https://github.com/huangtony/discourse-onesignal-plugin
    ```

13. Now rebuild the Discourse server:

    ```
    ./launcher rebuild app
    ```

14. Finally, hand the Discourse server over to Andy and ask him to finish the configuration :)

## Creating an fl-maps App Server

1. Create a Droplet in Digital Ocean if not already done: at the time of writing, this should be a server running Ubuntu 18.04 (LTS), in the $5/month tier, in the AMS3 region. Be sure to give everyone SSH access who should have it.

2. In Cloudflare, configure the subdomain `fl-maps.` of the domain to point at the IP of the Droplet, as "DNS only" not proxied, with the shortest TTL possible.

3. SSH into the server as `root`, just to ensure SSH is working - we'll need it in the next step.

4. Create a new directory in the `deployment` directory in this repository to keep the settings for this environment in.

5. Create a `mup.js` file in that new directory that points at this server (you may want to copy it from `brightertomorrowmap`). For now, it should use the user `root` with no password or key specified. The server configuration block should look a bit like this:

    ```
    servers: {
        one: {
            host: '134.209.85.87',
            username: 'root',
        }
    },
    ```

    Also note that the mup configuration should be configured to use LetsEncrypt.

    Either point MONGO_URL at the MongoDB server for this app, or add a mongo block if this server should host its own (development/testing servers only).

    If anything sensitive needs to be put in the mup settings, put them in a file named `mup-secrets.json` and then add this line to the start of `mup.js`:

    ```
    var secret = require('./mup-secrets.json');
    ```

    You can then access items in `mup-secrets.enc.json` from `mup.js` with e.g:

    ```
    env: {
      ROOT_URL: 'https://fl-maps.testing-happiness.ga',
      MONGO_URL: secret.mongo_url,
    }
    ```

6. From the new directory, run `mup` to set up the server:

    ```
    $ mup setup
    ```

7. Create a `settings.json` file for the usual Meteor app settings.

8. Run `mup` to deploy the app:

    ```
    $ mup deploy
    ```
9. Verify that you can reach the app in a browser, and that HTTPS is working.

10. In the Cloudflare settings for the domain, change the A record for `fl-maps.` that you created to be "Proxied" rather than "DNS only".

11. In the directory you created, create an SSH keypair for Travis to use to log in to this server (enter no passphrase when prompted):

    ```
    $ ssh-keygen -t rsa -m PEM -f travis-ssh-key -C "Travis-CI"
    ```

12. On the server, create a user for Travis to use:

    ```
    $ useradd -s /bin/bash -m -G sudo,docker deploy
    ```

13. Allow sudo to be used without a password (necessary for mup to use it). Edit the sudoers file:

    ```
    $ visudo
    ```

    This command will open the sudoers file in an editor. Change the line:

    ```
    %sudo  ALL=(ALL) ALL
    ```

    To:

    ```
    %sudo ALL=(ALL) NOPASSWD:ALL
    ```

    Save the file, and exit the editor.

14. Create an SSH config dir for the deploy user:

    ```
    $ mkdir /home/deploy/.ssh
    ```

15. Copy the contents of Travis's public key that you created (`travis-ssh-key.pub`) into `/home/deploy/.ssh/authorized_keys`:

    ```
    $ nano /home/deploy/.ssh/authorized_keys
    ```

16. ```
    $ chown -R deploy:deploy /home/deploy/.ssh
    $ chmod -R go-rwx /home/deploy/.ssh
    ```

17. Back on your machine, verify that you can sign in as the `deploy` user using Travis's SSH key:

    ```
    ssh -i travis-ssh-key deploy@134.122.58.242
    ```

18. Encrypt all the sensitive files using `sop`: (Read [secrets.md](./secrets.md) for more information on using `sops` in this project.)

    ```
    $ sops --encrypt --output travis-ssh-key.enc travis-ssh-key
    $ sops --encrypt --output settings.enc.json settings.json

    # and, if you have a mup-secrets.json file:
    $ sops --encrypt --output mup-secrets.enc.json mup-secrets.json
    ```

19. Delete all the unencrypted sensitive files (and the no-longer needed public key):

    ```
    $ rm settings.json travis-ssh-key travis-ssh-key.pub

    # and if you have it:
    $ rm mup-secrets.json
    ```

20. Change `mup.js` to change the user from "root" to "deploy" and to specify the Travis SSH key:

    ```
        one: {
            host: '1.2.3.4',
            username: 'deploy',
            pem: './travis-ssh-key',
        }
    ```

21. Add the new environment directory you've created to `branch-to-dir.sh`

22. Add the branch for deploying this environment to `.travis.yml`

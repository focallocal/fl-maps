![Focallocal logo](http://news.focallocal.org/wp-content/uploads/2015/02/focallocal-very-low-res1-min.png)

This is the base branch for the new react-based fl-maps project.

All edits are initially made in this master branch (fl-maps), and then <b>copy/pasted into the fl-sleeper branch, and a separate PR made to the fl-sleeper branch</b> _(refer to note "Copying changes with git cherry-pick" under the "Workflow" section below, for how to automatically copy the changes across)_ unless they are in the i18n folder. We aim to keep the codebase identical as much as possible until the team expands.

All text and labels viewable to users must be defined in [the i18n folder](https://github.com/focallocal/fl-maps/tree/master/imports/both/i18n) to be ready for multi-language support - this file is also used to define differences between both maps, The Public Happiness Platform at focallocal.org and Our Homelessness project at brightertomorrowmap.com. 

When the active team grows the two codebases can diverge, if you'd like to lead/support one side or advertise for more devs to join our build, let Andy know.

# Contribution Guide

The project is based on [Meteor](https://www.meteor.com/) and [React](https://reactjs.org/). (*try a [**todo-list tutorial**](https://www.meteor.com/tutorials/react/creating-an-app) if you've never used one of them*)

## Getting Started:

1) [Join our Google calendar](https://calendar.google.com/calendar?cid=dDFranFza2RmOXBzb2JpM291NnVmdjc4NXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ), and set yourself a regular reminder to visit it add the hours you want to work on this project this week, or month. This makes it much easier for the team to arrange collaborations, and most people find volunteer commitments always getting get put off if they aren't scheduled. Using these steps will help you keep with the commitment you want to make. 
2) Head to our [Slack channel](https://focallocal.slack.com) and say Hi in the Introductions Slack channel, and give other devs there an intro to your background
3) Read through this readme guide in our Github to get an idea of the project
4) Set up a local dev enviroment (most of us use Atom.io). Settings.json is pinned to the #meteor-maps channel in Slack. (let us know if you have difficulties, a lot of people find setting up fiddly)
5) Once setup, [jump onto Trello](https://trello.com/invite/b/PFj7RlgM/a12e9b4bdc6fff4a5e7439754c9a7e3b/focallocalorg), assign yourself your first mission and of you're ready to being move it into the sprint queue

## Workflow:

1) Begin each work session by reviewing others pull requests in Github and commenting on your findings. It helps to keep everyone up to date with whats going on and create a self-checking community. If you're the 3rd dev commenting/checking please tag @AndyatFocallocal to merge the PR.
2) Visit Trello and use the Meteor filter to hide Missions for other teams
3) Use filters in Trello to see which Cards/Missions are most needing your attention, or grab a Mission from Quick Bug Squashing
4) Grab a card, assign yourself to it and move it into correct 'Sprint' List - to prevent two people working on the same issue/mission
5) When complete and your PR is awaiting review, move the card into 'Missions Complete', also click the link inside the card to close the issue in Github

Issues are created on Github, and then get automatically posted on Trello (with a delay up to 15mins). Here's direct links, i suggest adding them to your browsers bookmarks to make navigation easy:
https://github.com/focallocal/fl-maps/tree/react-maps
https://trello.com/b/PFj7RlgM/focallocalorg
https://focallocal.slack.com
fl-master branch: https://focallocal.org
fl-sleeper: https://brightertomorrowmap.com

**Making Suggestions:** Please post suggested improvements in the meteor-maps channel in Slack so that other devs can comment their thoughts, suggestions, and keep track of changes in the codebase. If/when approved make an issue in Github ready for coding to begin.

**Copying changes with git "git cherry-pick":** As mentioned above, changes to the codebase are done to the master branch and copy/pasted onto the fl-sleeper branch in a separate PR. Copy/pasting can be done directly through the CLI as follows:

1. Make a note of your commit id in the master branch. Assuming the most recent commit is the one you want to copy:
 
    `git log -1`

2. Checkout the latest fl-sleeper branch onto which you want to copy across the changes

    `git checkout <TARGET-BRANCH-NAME>`

3. Use "git cherry-pick" to apply the exact insertions and deletions from your master branch commit, onto the target fl-sleeper branch that you have just checked out

    `git cherry-pick <COMMIT ID>`

4. This will copy across the changes without affecting any other files. In the very unlikely scenario there are conflicts you would need to resolve these before the cherry-pick executes. Note: if there is more than one commit to copy across, you need to include all relevant commit IDs in the command.

## Setting Up The Development Environment

1. install meteor

  https://www.meteor.com/install

2. create a fork of this repository and then

    `git clone https://github.com/your-github-username/fl-maps`

3. Set up git

      - `git remote add upstream https://github.com/focallocal/fl-maps`
      ```
        // make sure there are 2 remotes (origin that points to your fork and upstream for the original repo)
        git remote -v
      ```

    - **every time you start working on a new feature, run: `git pull upstream master` which ensures you are always working with the most updated version of the project.**

    - create a new branch `git checkout -b new-feature-name`

4. obtain the most recent *settings.json* file from slack, its pinned in the #meteor-maps thread, and place it in the project's folder
    - *settings.json* has a property named `'mapType': 'gatherings'` ,
     you can change 'gatherings' to 'btm' to work on Focallocal or Brighter Tomorrow

5. run the project

    ```javascript
    meteor npm install
    npm run start // see notes below if it fails to run
    ```

6. make changes

7. run tests (`npm test` or `npm run test-watch`)

8. if all the tests have passed, run

    ```
      git add .
      git commit -m 'description of what has changed'
      git push origin your_working_branch_name
    ```

9. go to github and create a new pull request from your fork (make sure it's against the fl-maps/master branch)

#### ** !if you encounter any errors related to sass-loader, run the following command! **

`meteor npm rebuild node-sass --force`

Currently you'll see a _**Compiled with warnings.**_ message, ignore it.

#### ** Step (5) Warnings **
For step (5) be sure you don't run `meteor npm install` twice. Just do it once followed by `npm run start` and it will work.

<details><summary>Detailed Explanation</summary>
If run twice you may get several warnings such as these:

```
npm WARN bootstrap@4.1.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
  npm WARN react-google-maps@9.4.5 requires a peer of @types/googlemaps@^3.0.0 but none is installed. You must install peer dependencies yourself.
  npm WARN react-google-maps@9.4.5 requires a peer of @types/markerclustererplus@^2.1.29 but none is installed. You must install peer dependencies yourself.
  npm WARN react-google-maps@9.4.5 requires a peer of @types/react@^15.0.0 || ^16.0.0 but none is installed. You must install peer dependencies yourself.
  npm WARN uniforms@1.24.3 requires a peer of graphql@>=0.8.2 <1.0.0 but none is installed. You must install peer dependencies yourself.
  npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
  npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

```
  
If you try to install them by:
```
meteor npm install jquery @types/googlemaps@^3.0.0 @types/markerclustererplus@^2.1.29 @types/react@^16.0.0 graphql@0.13.2
```

... then during the `npm run start` step, compile will fail with errors such as these:
```
ERROR in ./imports/both/i18n/en/categories.json
Module parse failed: Unexpected token < in JSON at position 149
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token < in JSON at position 149
...

ERROR in chunk main [entry]
...
W20190111-19:03:18.261(8)? (STDERR)     ERROR in /home/sum/sum/job/remoteok/focallocal/fl-maps/node_modules/graphql/index.mjs
2:0-49 Can't reexport the named export 'graphql' from non EcmaScript module (only default export is available)
...
W20190111-19:03:18.272(8)? (STDERR)     2:0-49 Can't reexport the named export 'graphqlSync' from non EcmaScript module (only default export is available)
...
W20190111-19:03:18.292(8)? (STDERR)     39:0-61:50 Can't reexport the named export 'DEFAULT_DEPRECATION_REASON' from non EcmaScript module (only default export is available)
...
W20190111-19:03:18.300(8)? (STDERR)     39:0-61:50 Can't reexport the named export 'GraphQLBoolean' from non EcmaScript module (only default export is available)

```
</details>

#### ** Updating Node & npm **

If you've tried the above, and things still aren't working you may need to update your version of node & npm. First, check your version of node by running `node -v`, and take note of it. The current version of node as of writing this is 11.9.0.

To update node, install the package `n`, by running the command: `npm install -g n`. After the installation, run `n latest`. **note**: you may need to run `sudo n latest`, if on Mac or Linux.

Updating npm is quite simple, the command being: `npm install -g npm`. 

After updating the packages, close your current terminal and open a new one, so that the changes may take effect. Confirm the update by typing `node -v`.

## Working On Issues

Issues can be found on our Trello board which gives a more visual representation of progress than Github. The two currently active lists on Trello will be the 1st version (example v0.1) reading from left to right, and also the Quick Bug Squashing List: [**Trello**](https://trello.com/b/PFj7RlgM/focallocalorg) and not github (use github only to open issues!).

*if you decide to work on an issue please click 'members' and add your name to it, then move it into the 'sprint' queue. You can also use filters to see Meteor only issues (missions). (Don't forget to move it into the 'complete' list when finished, and also close the issue in Github.

### Outside Software

The map utilizes Discourse for its forums and SSO. It will likely also use Discourse Messaging for notifications/users setting how often they receive notifications. The idea has been floated of also using it for users profiles, but that needs more discussion.

Recently, the app layout has been changed so that the Discourse forum can be displayed side by side with the map (try the green vertical split bar). This has two advantages:
1. Access to the forum is easier.
2. A forum page can now be associated with a map element. For example, if you go to a map event and click "Photos", the right panel opens on a specific forum page where you can post photos. This feature is implemented using Docuss, a third-party software solution.
<details>
<summary>More About Docuss</summary>

Docuss is composed of: 
1. a [Discourse plugin](https://github.com/sylque/dcs-discourse-plugin), installed in our Discourse instance, and 
2. a JavaScript library, for interacting with the plugin. 

For example, this is how, from the Meteor app, you can change the forum url to the `dcs-foo` tag page:

```js
import { dcs } from "/imports/client/utils/dcs-master"
dcs.gotoTag('dcs-foo')
```

Docuss is in prototype phase and lacks documentation. Please get in touch with @syl on Slack if you have any questions.

</details>

---

<a name='guidelines' />

## Guidelines

The first thing you should know is that this is not a typical meteor app:

- We favor **imports statements** over **global variables**

- And also **npm modules** over **meteor's packages** (as much as possible)

- We replace meteor's built in compiler with [`meteor-webpack`](https://github.com/ardatan/meteor-webpack).   
this allows us to take advantage over many great webpack-based tools like [react-hot-loader](https://github.com/gaearon/react-hot-loader) among others..

- We use [jest](https://facebook.github.io/jest/) as a test runner for most of the ui parts

### Writing Components

Our project is based on a library called [**reactstrap**](https://reactstrap.github.io/) which provides several react-components which are based on [**bootstrap**](https://getbootstrap.com/).
That means that usually instead of writing plain html tags, you'll be able to just use one of the components provided by reactstrap.

for example, instead of writing a button element like this
```javascript
// plain html

<button className='primary'>My Button</button>
```

you can check on the documentation of reactstrap if it provides a button component, and since it does, you can just use
```javascript
import { Button } from 'reactstrap'

<Button color="primary">primary</Button>
```

#### *Google Maps* Component

We use the react-google-maps package for anything related to google-maps. if you need to work with it - please follow it's docs https://tomchentw.github.io/react-google-maps/

#### *Select* Component

We use the react-select package for *select* elements, you can learn how to use it here: https://deploy-preview-2289--react-select.netlify.com/

## Packages

The following is a list of the packages that you should be familiar with:

#You don't need to master them, learn them when you need to use them.

#### Meteor Packages

* [react-meteor-data](https://github.com/meteor/react-packages/) - Get reactive updates from the server into components
* [meteoreact:accounts](https://github.com/royGil/accounts-react/) - Automatic generation of user related forms
* [mdg:validated-method](https://github.com/meteor/validated-method) - A powerful wrapper for meteor's methods

#### Npm Packages

* [Reactstrap](https://reactstrap.github.io/) - React components for bootstrap
* [React Router v4](https://github.com/ReactTraining/react-router) - A router for react
* [Simpl-schema](https://github.com/aldeed/simple-schema-js) - Schema definitions for our collections
* [Uniforms](https://github.com/vazco/uniforms) - Automatic generation of forms in react
* [NProgress](http://ricostacruz.com/nprogress/) - Display a progress bar between client-server requests
* [react-google-maps](https://github.com/tomchentw/react-google-maps) - React components that wraps google-maps api
* [Enzyme](https://github.com/airbnb/enzyme) - A testing utility for react

*Please make sure you are familiar with those packages before attempting to use them*

## Coding Style

This project uses the [**standard**](https://standardjs.com/) coding style guidelines (enforced by [**eslint-standard-config**](https://github.com/standard/eslint-config-standard))

*Please ensure your text editor is configured to use a linter so it can warn you about an incorrect code*

## **Gotchas**

* React-hot-loader will only hot-reload for changes that are made inside the <App /> component. This is the default behavior but I've added this note just to make sure you are aware of this.

* Both of the maps (gathering and brightertomorrow) are using the same code base - we differentiate their strings by using different i18n files for each.

---

## Core Design Considerations

Goal for users: **Posting something new onto the map**

Platform goal: **Growing a positive and active community focused on the subject chosen for that map**

When users visit the map the should feel: **Connected to a Community**

The platform should be:

* **positive**

* **action focused**

* **welcoming and cheerful**


## Vision for the Maps Platform

We are building two maps together to ensure the platform remains focused on the Core Design Considerations, rather than wondering towards one specific issue. This keeps community at the center of our build, and ensures the map can become a useful open source platform for others later

Upon reaching v1: Our development of the Brighter Tomorrow Map will slow, the platform will be released as open source for others to use. The Focallocal.org map build will continue and specialize to better integrate with the other areas of the Focallocal.org platform

### Design Constraints

The Orange main menu and its text 'Focallocal' are used in all projects built by the Focallocal Public Happiness community, so members can easily identify the project, and to maintain the positive and cheerful atmosphere in all related projects.

### Two Maps

We have two maps based on the same codebase at the moment. We're keeping the code merged until v0.3 as it helps to keep them both focused on their core ethos 'community connection', and enables them both to launch at the same time. The Homelessness map, and the community hub that will push it out to help people around the world.

Map 1 - The Brighter Tomorrow Map focuses on reducing homelessness through community connection.

Map 2 - Focallocal.org focuses on connecting people to take action where they live and improve well-being, that includes by building projects like The Brighter Tomorrow Map, which is our flagship project

In GitHub you'll find two main branches 'master' and 'fl-sleeper'. Any differences between the two are stated in our language plugin i18n. All text visible to users should be set in i18n so it can be changed easily between the two (at some point in the future we'll probably turn this into a user friendly backend).

When code you are working on is/needs to be different in the two maps, the code to change can be found in i18n. This is generally text, links and images. (search i18n in the project to find its folder).

## Hosting

we have three hosts;

vultr.com
wehostinghub.com
digitalocean.com

they are all being routed through cloudflare, but the nameservers for Vultr.com are the only ones pointing at cloudflare's nameservers.

We have our domain registered at Hihosting.co.uk, and the nameservers point to cloudflare.

## Other Areas of Focallocal.org

Focallocal.org is building towards a decentralized community where anyone can join to work on projects and take action to build a friendlier happier and safer world around them. Its a hub for our volunteer community to coordinate, collaborate, and begin to grow. Its also not very good right now (i built most of it (Andy)) and it is fragmented.

What it is, is a minimum functional platform to support a community who will redesign and improve it to meet their needs as they grow; its also a pool of skills, like marketing experts, graphic designers, etc, to contribute to both maps, and many other Public Happiness projects built by our community. Anyone joining in one of our projects to create a happier world is a member of the Focallocal Community and you're all also welcome to improve other areas of focallocal.org - it's your platform

## Docus

if you have any need to edit Docus, most files including home directory can be found here: https://github.com/focallocal/fl-maps/blob/master/imports/client/ui/app.js

Its repo is here: https://github.com/sylque/dcs-discourse-plugin/issues
and you need to tag @sylque in the repo to discuss development

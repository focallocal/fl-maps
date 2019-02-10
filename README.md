![Focallocal logo](http://news.focallocal.org/wp-content/uploads/2015/02/focallocal-very-low-res1-min.png)

This is the base branch for the new react-based fl-maps. All edits to either map are initially made in this master branch (fl-maps), and then pushed to the fl-sleeper branch after. All text and labels viewable to users must be defined in the i18n folder to be ready for multi-language support - this file is also used to define differences between both maps (focallocal.org and brightertomorrowmap.com)

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

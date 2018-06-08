![Focallocal logo](http://news.focallocal.org/wp-content/uploads/2015/02/focallocal-very-low-res1-min.png)

This is the base branch for the new react-based fl-maps.

# Contribution Guide

The project is based on [Meteor](https://www.meteor.com/) and [React](https://reactjs.org/). (*try a [**todo-list tutorial**](https://www.meteor.com/tutorials/react/creating-an-app) if you've never used one of them*)

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

    - **everytime you start working on a new feature, run: `git pull upstream react-maps` which ensures you are always working with the most updated version of the project.**

    - create a new branch `git checkout -b new-feature-name`

4. obtain the *settings.json* file from slack, its pinned in the #meteor-maps thread, and place it in the project's folder

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

9. go to github and create a new pull request from your fork (make sure it's against the react-maps branch)

#### ** !if you encounter any errors related to sass-loader, run the following command! **

`meteor npm rebuild node-sass --force`

Currently you'll see a _**Compiled with warnings.**_ message, ignore it.

## Working On Issues

Issues can be found on our Trello board which gives a more visual representation of progress than Github. The two currently active lists on Trello will be the 1st version (example v0.1) reading from left to right, and also the Quick Bug Squashing List: [**Trello**](https://trello.com/b/PFj7RlgM/focallocalorg) and not github (use github only to open issues!).

*if you decide to work on an issue please click 'members' and add your name to it, then move it into the 'sprint' queue. You can also use filters to see Meteor only issues (missions). (Don't forget to move it into te 'complete' list when finished, and also close the issue in Github.

### Outside Software

The map utilises Discourse for its forums and SSO. It will likely also use Discourse Messaging for notifications/users setting how often they receive notifications. The idea has been floated of also using it for users profiles, but that needs more discussion.

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
* [Simpl-schema](https://github.com/aldeed/simple-schema-js) - Schema defintions for our collections
* [Uniforms](https://github.com/vazco/uniforms) - Automatic generation of forms in react
* [NProgress](http://ricostacruz.com/nprogress/) - Display a progressbar between client-server requests
* [react-google-maps](https://github.com/tomchentw/react-google-maps) - React components that wraps google-maps api
* [Enzyme](https://github.com/airbnb/enzyme) - A testing utility for react

*Please make sure you are familiar with those packages before attempting to use them*

## Coding Style

This project uses the [**standard**](https://standardjs.com/) coding style guidelines (enforced by [**eslint-standard-config**](https://github.com/standard/eslint-config-standard))

*Please ensure your text editor is configured to use a linter so it can warn you about an incorrect code*

## **Gotchas**

* React-hot-loader will only hot-reload for changes that are made inside the <App /> component. This is the default behavior but i've added this note just to make sure you are aware rof this.

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

We are building two maps together to ensure the platform remains focused on the Core Design Considerations, rather than wondering towards one specific issue. This keeps community at the center of our build, and ensures the map can become a useful opensource platform for others later

Upon reaching v1: Our development of the Brighter Tomorrow Map will slow, the platform will be released as opensource for others to use. The Focallocal.org map build will continue and specialise to better integrate with the other areas of the Focallocal.org platform

### Design Constraints 

The Orange mainmenu and its text 'Focallocal' are used in all projects built by the Focallocal Public Happiness community, so members can easily identify the project, and to maintain the positive and cheerful atmosphere in all related projects. 

## Other Areas of Focallocal.org

Focallocal.org is building towards a dentralised community where anyone can join to work on projects and take action to build a friendlier happier and safer world around them. Its a hub for our volunteer community to coordinate, collaborate, and begin to grow. Its also a bit shit right now, i built most of it (Andy), and it is fragmented. 

What it is, is a minimum functional platform which can support a community who will redesign and improve it to meet their needs as they grow, and also a pool of skills, like marketing experts, graphic desingers, etc, to contribute to both maps, and many other Public Happiness projects.

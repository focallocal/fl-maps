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

There might be opened issues - please look for them over [**Trello**](https://trello.com/b/PFj7RlgM/focallocalorg) and not github (use github only to open issues!).

*if you decide to work on an issue please mark it with a **"work in progress"** label.*

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

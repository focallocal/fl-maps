![Focallocal logo](http://news.focallocal.org/wp-content/uploads/2015/02/focallocal-very-low-res1-min.png)

This is the base branch for the new react-based fl-maps.

```javascript
git clone -b react-maps https://github.com/focallocal/fl-maps
cd fl-maps
meteor npm install
npm run start // Dont forget to include the settings.json file
```

I'm aware of all the missiing features/styles etc, just wanted to share the work i've done so far.

Let me know what you think!

# Contribution Guide

This application is based on [Meteor](https://www.meteor.com/) and [React](https://reactjs.org/). (*try a [**todo-list tutorial**](https://www.meteor.com/tutorials/react/creating-an-app) if you've never used one of them*)

The first thing you should know is that this is not a typical meteor app:

- We favor **imports statements** over **global variables**

- We replace meteor's built in compiler with [`meteor-webpack`](https://github.com/ardatan/meteor-webpack).   
this allows us to take advantage over many great webpack-based tools like [react-hot-loader](https://github.com/gaearon/react-hot-loader) among others..

- We use [jest](https://facebook.github.io/jest/) as a test runner for most of the ui parts

## Packages

The following is a list of the packages that you should be familiar with:

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

* Currently, the server will only reload itself when files **inside the server folder** are changed. (this is a bug in the current version of the meteor-webpack package).
If you change something in a different folder and need the server to reload - just type and save a "dummy" character (space/tab...) into one of the files in the server folder.

* React-hot-loader will only hot-reload for changes that are made inside the <App /> component. This is the default behavior but i've added this note just to make sure you are aware rof this.

* Both of the maps (gathering and brightertomorrow) use the same code base - we differentiate their strings by using different i18n files for each.

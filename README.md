![Focallocal logo](http://news.focallocal.org/wp-content/uploads/2015/02/focallocal-very-low-res1-min.png)

[Official Website](http://focallocal.org)
[![Build Status](https://travis-ci.org/focallocal/fl-maps.svg?branch=master)](https://travis-ci.org/focallocal/fl-maps)
# Focallocal: Gathering Map and Brighter Tomorrow Map 

*Focallocal events* is a part of the [Focallocal](http://focallocal.org) movement. 
> Focallocal is an open, encouraging and supportive community for people who want to explore creative and fun ways to make our communities friendlier, more connected, safer and happier for everyone to enjoy living in.

> Together, our ideas and the success stories from community members activities are shared and repeated by other Focallocallers all around the World, each making a positive difference to life in their local community.


*Because organising social events to make our communities happier, and supporting people who are homeless in your local community, should both be as simple as ordering pizza*


## Project Information
There are 2 instances of this Meteor app running:
- Focallocal Gathering Map: http://gather.focallocal.org
    - Builds from `master` branch
- Brighter Tomorrow Map: http://brightertomorrowmap.com/
    - Builds from `street-sleeper` branch

Travis CI builds from the `master` branch and pushes changes to the `street-sleeper` branch.
Code for the two branches are mostly identical, and any differences between the two branches are achieved throught the `il8n` plugin.  

## Contributing

Developer Setup:

```
# skip if meteor is already installed.
# can alternatively install through website at www.meteor.com
curl https://install.meteor.com | /bin/sh

# clone the repository
# if you forked the repo, clone your forked downstream repo 
git clone https://github.com/focallocal/fl-maps.git fl-maps

# enter the project folder
cd fl-maps

# Install dependencies
meteor npm install

# Install meteor packages and start meteor server
# make sure that you have the settings.json file at project root.
npm start 
```

Submit PRs to `master`. `street-sleeper` will be updated through Travis CI. 

### Testing
#### Running 
Currently we are experimenting with functional tests. On slow machines it's recomended to run the app without tests
    VELOCITY=0 meteor 
If you prefer to run the app with the test framework (executing tests every time you save) then run it with
   
    CHIMP_OPTIONS="--format=pretty --sync=false --browser=firefox" meteor
    

There are few end-to-end Velocity tests located under `tests/`, written in Cucumber. 
[Guidelines for writing Cucumber Velocity tests](velocity.readme.io/v1.0/docs/getting-started-with-cucumber)
Running `meteor` will run meteor app process altogether with **mirror**. 
> Mirrors are used by test frameworks to run tests within. Tests are typically destructive and as such require a different database. Mirrors run a parallel version of your app with a different database as not to intrude on the main development workflow.
  
You can check if the mirror is running - http://localhost:5000
There is some issue when running these tests under default PhantomJS driver, at least on my machine. 
That's why I'm using firefox driver by default. To select another driver you can bypass default Velocity settings.
    export CHIMP_OPTIONS="--format=pretty --sync=false --browser=firefox"
It's documented [here](https://velocity.readme.io/docs/getting-started-with-cucumber#section-chimp-options)
You can disable Velocity tests
    export VELOCITY=0 
    meteor run


### CI
We have [Travis build](https://travis-ci.org/focallocal/fl-maps) in place which monitors this repository. 
Every **commit to master** branch results in a new build being triggered. 
The point is to achieve continuous delivery which means 
1. Building - with the latest meteor 
2. Testing
3. Deploying 
    * contact Andy or one of the team for the latest settings.json file
    * Deploy to http://gather.focallocal.org if it's a push to `master` branch
    * Deploy to http://focallocal-test.meteor.com if it's a push to `any other` branch
    * Changes are pushed to the Brighter Tomorrow Map, with variables between the two set in i18n
The workflow is configured in `.travis.yml` and deployment is configured in the `expect` script `deploy.exp`
4. Pull Request
    * You first create a fork of fl-maps.
    * Then you clone your fork on your computer.
    * You set up 2 remotes: your fork named 'origin', and the fl-maps named 'upstream'
    * Before begining working on the code, you always pull everything from upstream inside your version of master, then you create a new branch, example - fixingBug32
    * When you are ready to upload the code, you create a push on you're ORIGIN remote.
    * Lastly, you go on github, inside your fork page, and you will see a button -- CREATE PULL REQUEST

The most important thing before starting is to ALWAYS pull everything from the UPSTREAM remote
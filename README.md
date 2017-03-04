[![Build Status](https://travis-ci.org/focallocal/fl-maps.svg?branch=master)](https://travis-ci.org/focallocal/fl-maps)
Focallocal events 
====================
*Because organising social events should as simple as ordering pizza.*


Usage
-----
1. Go to http://gather.focallocal.org
2. Register using your email or use your account Facebook|Google|Twitter|Meetup
3. Go to the map page http://gather.focallocal.org/events/map
4. Add a new event using (+) button
5. Share the event details on social media (using buttons on final message modal window)

Project set up (for developers)
----------------------------
Project is built on [Meteor](https://github.com/meteor/meteor), a simple environment 
for building modern web applications.

Install Meteor

    curl https://install.meteor.com | /bin/sh

Clone the project repository

    git clone https://github.com/focallocal/fl-maps.git
    cd fl-events
    
#### Running 
Currently we are experimenting with functional tests. On slow machines it's recomended to run the app without tests

    VELOCITY=0 meteor 

If you prefer to run the app with the test framework (executing tests every time you save) then run it with
   
    CHIMP_OPTIONS="--format=pretty --sync=false --browser=firefox" meteor
    
#### Testing
There are few end-to-end Velocity tests located under... yes, you guessed: `tests/`. They are written in Cucumber. 
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
    
##### What are these tests for?
Currently, I develop the project with tests disabled and I trigger tests after implementing a feature. It takes some time on my old laptop to run mirror with firefox browser.
Ideally, these tests should be mostly unit tests with few end-to-end tests, and they all should be running in the background using the fastest driver - PhantomJS. If you have some time to play with this, then pull requests are more than welcomed!

Additionally, it's essential to set up cloud based testing solution, to run functional tests against all the modern browsers, including mobile browsers. (See TODO)

Continuous integration
----------------------------
We have [Travis build](https://travis-ci.org/focallocal/fl-maps) in place which monitors this repository. 
Every **commit to master** branch results in a new build being triggered. 
The point is to achieve continuous delivery which means 

1. Building - with the latest meteor 
2. Testing - (TODO) run functional tests 
3. Deploying 
    * use settings.json from a secret variable in Travis build's settings
    * Deploy to http://gather.focallocal.org if it's a push to `master` branch
    * Deploy to http://focallocal-test.meteor.com if it's a push to `any other` branch
The workflow is configured in `.travis.yml` and deployment is configured in the `expect` script `deploy.exp`

   
Contributing
------------

* Create something awesome -- make the code better, add some functionality,
  whatever (this is the hardest part).
* `Fork it`
* Create a topic branch to house your changes
* Get all of your commits in the new topic branch
* Submit a `pull request`

`Fork it`: http://help.github.com/forking/
`pull request`: http://help.github.com/pull-requests/


TODO
------------
- [ ] All the features are long listed in Asana.com. It's closed for members but anybody is welcomed to join.
- [ ] Set up a cloud based testing solution as a part of Continous Integration solution.
- [ ] Host application on a dedicated server. Currently we host the app on free meteor infrastructure. As long we don't have too many users, it's ok, but If we want to scale, we have to invest some money in VPS.
- [ ] Fix Velocity tests configuration to run PhantomJS tests seamlessly. 

About the Project
-----------------
*Focallocal events* is a part of a big project, or rather movement, [Focallocal](http://focallocal.org). 
> Focallocal is an open, encouraging and supportive community for people who want to explore creative and fun ways to make our communities friendlier, more connected, safer and happier for everyone to enjoy living in.
> Together, our ideas and the success stories from community members activities are shared and repeated by other Focallocallers all around the World, each making a positive difference to life in their local community.

[I want to know more!](http://focallocal.org/about-us)

![Focallocal logo](http://focallocal.org/wp-content/uploads/2015/02/focallocal-very-low-res1-min.png)



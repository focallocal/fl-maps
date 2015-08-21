(function () {

    'use strict';

    // You can include npm dependencies for support files in tests/cucumber/package.json
    //var _ = require('underscore');

    module.exports = function () {

        // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
        var url = require('url');

        this.Given(/^I am a new user$/, function () {
            // no callbacks! DDP has been promisified so you can just return it

            return this.server.call('reset'); // this.ddp is a connection to the mirror
        });

        this.Then(/^I should see popup "([^"]*)"$/, function (expectedPopup) {
            // you can use chai-as-promised in step definitions also
            return this.client.
                waitForVisible('#map-canvas'). // WebdriverIO chain-able promise magic
                getText('.material-tooltip span').should.become(expectedPopup);
        });

    };

})();
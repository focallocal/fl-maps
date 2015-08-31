(function () {

    'use strict';

    module.exports = function () {
        var url = require('url');

        this.Given(/^I am logged in$/, function () {
            return this.client.
                url(url.resolve(process.env.ROOT_URL, '/sign-in')).
                waitForExist('body *').
                waitForVisible('body *').
                setValue('#at-field-email', 'testuser@example.com').
                setValue('#at-field-password', 'testpassword').
                click('#at-btn').
                waitForExist('body');
        });


        this.When(/^I click the button "([^"]*)"$/, function (buttonId) {
            return this.client.waitForVisible(buttonId).
                click(buttonId);
        });

        this.When(/^I click on the map$/, function () {
            return this.client.
                click('img.leaflet-tile:nth-child(3)').
                waitForVisible('.leaflet-popup-content').
                click('.leaflet-popup-content > a');
        });

        this.Then(/^I should see toast saying "([^"]*)"$/, function (msg) {
                return this.client.
                    waitForVisible('#toast-container').
                    getText('#toast-container .toast').should.become(msg);
        });

        this.Then(/^I should see the new event form$/, function () {
            return this.client.
                waitForVisible('#events-form').
                should.eventually.be.true;
        });
    };

})();
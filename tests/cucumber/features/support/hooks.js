(function () {
    'use strict';

    module.exports = function() {
        this.Before(function () {
            this.server.call('addUser', {email: "testuser@example.com"});
        });

    }

})();
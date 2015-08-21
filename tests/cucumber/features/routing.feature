Feature: Test application navigation

  # The background will be run for every scenario
  Background:
    Given I am a new user

  # This scenario will run as part of the Meteor dev cycle because it has the @dev tag
  Scenario: Open main page
    When I navigate to "/"
    Then I should see the title "Welcome | Events for Focallocal"

  Scenario: Open map
    When I navigate to "/events/map"
    Then I should see the title "Map | Events for Focallocal"

  Scenario: Open calendar
    When I navigate to "/events/list"
    Then I should see the title "Calendar | Events for Focallocal"

  Scenario: Open login screen
    When I navigate to "/sign-in"
    Then I should see the title "Login | Events for Focallocal"

  Scenario: Open login screen
    When I navigate to "/sign-up"
    Then I should see the title "Register | Events for Focallocal"

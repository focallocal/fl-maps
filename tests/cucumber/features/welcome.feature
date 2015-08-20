Feature:

  # The background will be run for every scenario
  Background:
    Given I am a new user

  # This scenario will run as part of the Meteor dev cycle because it has the @dev tag
  @dev
  Scenario: Open main page
    When I navigate to "/"
    Then I should see the title "Welcome | Events for Focallocal"



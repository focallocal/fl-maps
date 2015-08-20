Feature:

  # The background will be run for every scenario
  Background:
    Given I am a new user

  @dev
  Scenario: Open the map and check the popup is visible
    When I navigate to "/events/map"
    Then I should see popup "Create an event now!"


@newEvent @dev
Feature: Creating an event

    As a user, so that I can create a new event,
    I want to click a button, fill details and after submit
    I want to see new event on the map.

  Background:
    Given I am logged in

  Scenario: Clicking the 'new event' button will open a hint popup
    When I navigate to "/events/map"
    And I click the button "#event-new-btn"
    Then I should see the new event form

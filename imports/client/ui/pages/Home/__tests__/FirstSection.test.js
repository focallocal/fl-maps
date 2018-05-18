import React from 'react'
import { shallow, mount } from 'enzyme'
import { Button } from 'reactstrap'
import { BrowserRouter as Router } from 'react-router-dom'
import FindOrPost from '../FirstSection/FindOrPost'
import Find from '../FirstSection/FindOrPost/Find'

describe('<FindOrPost />', () => {
  const mountComponent = (props) => (
    mount(
      <Router>
        <FindOrPost {...props} />
      </Router>
    )
  )

  const component = mountComponent({ user: {} })

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render a <Find /> component', () => {
    expect(component.find(Find)).toHaveLength(1)
  })

  it('should render a route-link to new-event-modal view if user is logged in', () => {
    const eventPostRoute = '/map?new=1'

    expect(component.find('.post-wrapper').find(Button).props().to).toBe(eventPostRoute)
  })

  it('should render a route-link to sign-up view if user is not logged in', () => {
    const component_ = mountComponent({ user: null })
    const signUpRoute = '/sign-up'

    expect(component_.find('.post-wrapper').find(Button).props().to).toBe(signUpRoute)
  })
})

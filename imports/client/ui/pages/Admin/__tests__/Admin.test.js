import React from 'react'
import { shallow } from 'enzyme'
import { Admin } from '../index'
import { Navbar, Nav, Alert, Button } from 'reactstrap'

describe('<Admin />', () => {
  const userEmailOnly = {
    profile: { name: 'RR@gmail.com' }
  }
  const userGoogleAuth = {
    profile: { name: 'Dan Man' }
  }
  const users = [userEmailOnly, userGoogleAuth]

  const shallowRenderer = (props) =>
    shallow(
      <Admin
        currentUser={{
          _id: 'GKnfyoGCYCGXAB9rR',
          name: 'test@gmail.com'
        }}
      />
    )
  const wrapper = shallowRenderer()
  it('should render <Alert color="secondary">No More Users</Alert> when isNoMoreUsers equals true', () => {
    wrapper.setState({ isNoMoreUsers: true })
    expect(wrapper.contains(<Alert color="secondary">No More Users</Alert>)).toEqual(true)
  })

  it('should change user data profile.name cutting out everything after the @ symbol', () => {
    expect(wrapper.instance().nameOnly(users)).toEqual([{ profile: { name: 'RR' } }, { profile: { name: 'Dan Man' } }])
  })
})

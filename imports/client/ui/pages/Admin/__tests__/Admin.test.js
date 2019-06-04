import React from 'react'
import { Meteor } from 'meteor/meteor'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import qs from 'query-string'
import { Admin } from '../index'
import { Navbar, Nav, Alert, Button } from "reactstrap";

describe('<Admin />', ()=> {

  const shallowRenderer = (props) =>
    shallow(
      <Admin
        currentUser={{
          _id: "GKnfyoGCYCGXAB9rR",
          name: "test@gmail.com"
        }}
      />
    )
  const wrapper = shallowRenderer();
  it('should render <Alert color="secondary">No More Users</Alert> when isNoMoreUsers equals true', ()=> {
    wrapper.setState({ isNoMoreUsers: true });
    expect(wrapper.contains(<Alert color="secondary">No More Users</Alert>)).toEqual(true)
  })

 
})
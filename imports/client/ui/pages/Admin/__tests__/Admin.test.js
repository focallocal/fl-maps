import React from 'react'
import { Meteor } from 'meteor/meteor'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import qs from 'query-string'
import { Admin } from '../index'
import { Navbar, Nav, Alert, Button } from "reactstrap";
// import { users} from './db/index';

describe('<Admin />', ()=> {
  const userEmailOnly = {
    profile: { name: "RR@gmail.com" },
  }
  const userGoogleAuth = {
    profile: { name: "Dan Man" },
  }
  const users = [userEmailOnly, userGoogleAuth]

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

  it('should change user data profile.name cutting out everything after the @ symbol',()=>{
    expect(wrapper.instance().nameOnly(users)).toEqual([{ profile: { name: "RR" }, }, { profile: { name: "Dan Man" },}])
    //.toHaveLength(2);
  });



 
})
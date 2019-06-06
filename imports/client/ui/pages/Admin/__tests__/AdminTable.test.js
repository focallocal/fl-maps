import React from 'react'
import { Meteor } from 'meteor/meteor'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import qs from 'query-string'
import  AdminTable  from '../AdminTable/index'
import {RadioInput} from '../RoleSelect/index'
import { Navbar, Nav, Alert, Button } from "reactstrap";

describe("<AdminTable/>", ()=>{
 const userAdmin = {

    _id: "GKnfyoGCYCGXAB9rR",
    profile: { name: "RR@gmail.com" },
    roles: { __global_roles__: ['admin'] },

  }
  const userNoRole = {
    _id: "GKnfyoGCYCGXAB9rR",
    profile: { name: "RR@gmail.com" },
  }
 
 const events= [];
 const wrapper = mount(<AdminTable
    deleteUser={() => { return null}} 
    users = {[]}
    changeUserRole = {() => { return null }}
    events = {[]}
  />)
  it('should render AdminTable', ()=>{
 
   expect(wrapper.exists()).toBe(true)
  })

  it('should render 2 <tr></tr> for the head and data Rows when 1 user is passed in', ()=> {
    wrapper.setProps({ users: [userAdmin],events})

    expect(wrapper.find("tr")).toHaveLength(2)
  })

  it('should pass RadioInput with correct role prop', () => {
    wrapper.setProps({ users: [userAdmin], events })

    expect(wrapper.find(RadioInput).prop('rolesData')).toEqual(['admin'])
  })

  it("should render RadioInput's <input type=radio/> with correct role checked otherwise null", () => {
    wrapper.setProps({ users: [userAdmin], events })

    expect(wrapper.find("input[value='admin']").prop('defaultChecked')).toEqual('checked')
    expect(wrapper.find("input[value='moderator']").prop('defaultChecked')).toEqual(null)
    expect(wrapper.find("input[value='user']").prop('defaultChecked')).toEqual(null)
  })

  it("should render RadioInput's <input type=radio/> with default user otherwise null", () => {
    wrapper.setProps({ users: [userNoRole], events })

    expect(wrapper.find("input[value='user']").prop('defaultChecked')).toEqual('checked')
    expect(wrapper.find("input[value='admin']").prop('defaultChecked')).toEqual(null)
    expect(wrapper.find("input[value='moderator']").prop('defaultChecked')).toEqual(null)
  })

  // after setting up events test their display  on different toggles
  // test child text of event td data
})
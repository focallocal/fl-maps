import React from 'react'
import { Meteor } from 'meteor/meteor'
import { shallow, mount } from 'enzyme'
import AdminTable, { Head, Rows } from '../AdminTable/index'

describe('<AdminTable/>', () => {
  const userAdmin = {

    _id: 'GKnfyoGCYCGXAB9rR',
    profile: { _id: '1234', name: 'RR@gmail.com' },
    roles: { __global_roles__: ['admin'] }

  }
  const userNoRole = {
    _id: 'GKnfyoGCYCGXAB9rR',
    profile: { name: 'RR@gmail.com' }
  }

  const events = []
  const wrapper = shallow(<AdminTable
    deleteUser={() => { return null }}
    users = {[]}
    changeUserRole = {() => { return null }}
    events = {[]}
  />)

  it('should render AdminTable', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should render 2 <tr></tr> for the head and data Rows when 1 user is passed in', () => {
    wrapper.setProps({ users: [userAdmin], events })
    expect(wrapper.find(Head).exists()).toBe(true)
  })

  it('should render 2 <tr></tr> for the head and data Rows when 1 user is passed in', () => {
    wrapper.setProps({ users: [userAdmin], events })
    expect(wrapper.find(Head).exists()).toBe(true)
  })

  it('should take in the correct props', () => {
    wrapper.setProps({ users: [userAdmin, userNoRole], events })
    const props = { users: [userAdmin, userNoRole], events }
    expect(wrapper.contains(<Head titles={['User', 'Roles', 'Events']} />)).toEqual(true)
  })
})

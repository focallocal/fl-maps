import React from 'react'
import { shallow, mount } from 'enzyme'
import Roles from '../AdminTable/Roles'
import {RadioInput} from '../RoleSelect/index'

describe("<Roles/>", ()=>{
 const userAdmin = {

    _id: "GKnfyoGCYCGXAB9rR",
    profile: {_id: "1234", name: "RR@gmail.com" },
    roles: { __global_roles__: ['admin'] },

  }
  const userNoRole = {
    _id: "GKnfyoGCYCGXAB9rR",
    profile: { name: "RR@gmail.com" },
  }
 
  const wrapper = mount(<Roles

    user={[]}
    changeUserRole={() => { return null }}

  />)

  it('should render <Roles/>', ()=>{
      expect(wrapper.exists()).toBe(true)
  })

  it('should pass RadioInput with correct role prop', () => {
    wrapper.setProps({ user: userAdmin})

    expect(wrapper.find(RadioInput).prop('rolesData')).toEqual(['admin'])
  })

  it("should render RadioInput's <input type=radio/> with correct role checked otherwise null", () => {
    wrapper.setProps({ user: userAdmin})

    expect(wrapper.find("input[value='admin']").prop('defaultChecked')).toEqual('checked')
    expect(wrapper.find("input[value='moderator']").prop('defaultChecked')).toEqual(null)
    expect(wrapper.find("input[value='user']").prop('defaultChecked')).toEqual(null)
  })

  it("should render RadioInput's <input type=radio/> with default user otherwise null", () => {
    wrapper.setProps({ user: userNoRole})

    expect(wrapper.find("input[value='user']").prop('defaultChecked')).toEqual('checked')
    expect(wrapper.find("input[value='admin']").prop('defaultChecked')).toEqual(null)
    expect(wrapper.find("input[value='moderator']").prop('defaultChecked')).toEqual(null)
  })



})
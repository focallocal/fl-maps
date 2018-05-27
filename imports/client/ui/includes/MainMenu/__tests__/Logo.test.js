import React from 'react'
import { shallow } from 'enzyme'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo'

describe('<Logo />', () => {
  it('should render our logo with a NavLink to home page', () => {
    const wrapper = shallow(<Logo />)

    expect(wrapper.props().id).toEqual('brand-logo')
    expect(wrapper.find(NavLink).props().to).toEqual('/')
    expect(wrapper.find(NavLink).children().text()).toEqual('Focallocal')
  })
})

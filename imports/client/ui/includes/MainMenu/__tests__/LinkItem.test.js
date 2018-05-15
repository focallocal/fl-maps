import React from 'react'
import { shallow, mount } from 'enzyme'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { NavLink } from 'reactstrap'
import LinkItem from '../LinkItem'

describe('<LinkItem />', () => {
  let item = {
    title: 'Test Item',
    route: '/'
  }

  it('should render only a route link', () => {
    const component = shallow(<LinkItem item={item} />)

    expect(component.find(RouterNavLink)).toHaveLength(1)
    expect(component.find(NavLink)).toHaveLength(0)
  })

  it('should render only a link', () => {
    item.route = ''
    item.link = '/'
    const component = shallow(<LinkItem item={item} />)

    expect(component.find(NavLink)).toHaveLength(1)
    expect(component.find(RouterNavLink)).toHaveLength(0)
  })
})

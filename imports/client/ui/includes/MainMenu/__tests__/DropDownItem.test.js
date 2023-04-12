import React from 'react'
import { shallow, mount } from 'enzyme'
import { Router, MemoryRouter } from 'react-router-dom'
import { DropdownMenu, DropdownItem } from 'reactstrap'
import DropDownItem from '../DropDownItem'

describe('<DropDownItem />', () => {
  const item = {
    title: 'Test Item',
    content: [
      { title: 'link item', link: 'to-link' },
      { title: 'route item', route: 'to-route' }
    ]
  }

  const component = shallow(<DropDownItem item={item} />)

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render dropdown items from the "content" key', () => {
    expect(component.find(DropdownMenu).children()).toHaveLength(2)
  })

  it('should render different DropdownItem elements based on the link/route key', () => {
    const parent = component.find(DropdownMenu)

    expect(parent.find(DropdownItem).get(0).props.href).toBe('to-link')
    expect(parent.find(DropdownItem).get(1).props.to).toBe('to-route')
  })
})

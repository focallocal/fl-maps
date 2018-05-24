import React from 'react'
import { shallow } from 'enzyme'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { Button } from 'reactstrap'
import MainMenu from '../index'
import i18n from '/imports/both/i18n/en'

describe('<MainMenu />', () => {
  const component = shallow(<MainMenu />)

  it('a menu component should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render an add-event button from i18n file', () => {
    const addEventButton = component.find('#add-event')

    expect(addEventButton).toHaveLength(1)
    expect(addEventButton.find(RouterNavLink).props().to).toEqual('?new=1')
    expect(addEventButton.find(Button).children().text()).toEqual(i18n.MainMenu.addEvent)
  })
})

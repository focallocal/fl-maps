import React from 'react'
import { shallow } from 'enzyme'

import MainMenu from '../index'
import i18n from '/imports/both/i18n/en'

describe('<MainMenu />', () => {
  const menu = shallow(<MainMenu />)

  it('a menu component should render', () => {
    expect(menu.exists()).toBeTruthy()
  })

  it('the menu should render its element based on the english i18n file', () => {
    const { rightLinks, leftLinks, userLink } = i18n.MainMenu

    const leftLinksElement = menu.find('#left-links').children()
    const rightLinksElement = menu.find('#right-links').children()

    // Add the number of links which are not rendered by the i18n file
    // Logo and UserLink for now.
    expect(leftLinks.length + 1).toEqual(leftLinksElement.length)
    // expect(rightLinks.length + 1).toEqual(rightLinksElement.length)
  })
})

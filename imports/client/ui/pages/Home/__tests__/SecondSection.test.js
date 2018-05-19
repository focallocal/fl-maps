import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import About from '../SecondSection/About'
import i18n from '/imports/both/i18n/en'
import SmileyLogo from '../SecondSection/About/Logos/SmileyLogo/SmileyLogo'
import FriendsLogo from '../SecondSection/About/Logos/FriendsLogo/FriendsLogo'
import ShareLogo from '../SecondSection/About/Logos/ShareLogo/ShareLogo'

const { Home } = i18n
describe('<About />', () => {
  const mountComponent = (props) => (
    mount(
      <Router>
        <About />
      </Router>
    )
  )

  const component = mountComponent({ user: {} })

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render an <About /> component', () => {
    expect(component.find(About)).toHaveLength(1)
  })

  it('should render section HTML tags', () => {
    expect(component.find('section')).toHaveLength(1)
  })

  it('should render <About /> with section tags', () => {
    const about = component.find(About)
    expect(about.find('section')).toHaveLength(1)
  })

  it('should render <About /> with h2 tags', () => {
    const about = component.find(About)
    expect(about.find('h2')).toHaveLength(1)
  })

  it('should render <About /> with second_section title', () => {
    const about = component.find(About)
    expect(about.find('h2').text()).toBe(Home.second_section.title)
  })

  it('should render <About /> with four p tags', () => {
    const about = component.find(About)
    expect(about.find('p').length).toBe(4)
  })

  it('should render <About /> with second_section content one', () => {
    const about = component.find(About)
    const actual = about.find('p').at(0)
    expect(actual.text()).toBe(Home.second_section.content.first)
  })

  it('should render <About /> with second_section content two', () => {
    const about = component.find(About)
    const actual = about.find('p').at(1)
    expect(actual.text()).toBe(Home.second_section.content.second)
  })

  it('should render <About /> with second_section content three', () => {
    const about = component.find(About)
    const actual = about.find('p').at(2)
    expect(actual.text()).toBe(Home.second_section.content.third)
  })

  it('should render <About /> with second_section content four', () => {
    const about = component.find(About)
    const actual = about.find('p').at(3)
    expect(actual.text()).toBe(Home.second_section.content.fourth)
  })

  it('should render <About /> with items div', () => {
    const about = component.find(About)
    const actual = about.find('.items')
    expect(actual.exists()).toBeTruthy()
  })

  it('should render <About /> with SmileyLogo', () => {
    const about = component.find(About)
    const actual = about.find(SmileyLogo)
    expect(actual.exists()).toBeTruthy()
  })

  it('should render <About /> with FriendsLogo', () => {
    const about = component.find(About)
    const actual = about.find(FriendsLogo)
    expect(actual.exists()).toBeTruthy()
  })

  it('should render <About /> with ShareLogo', () => {
    const about = component.find(About)
    const actual = about.find(ShareLogo)
    expect(actual.exists()).toBeTruthy()
  })
})

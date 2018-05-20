import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import Adventures from '../ThirdSection/Adventures'
import i18n from '/imports/both/i18n/en'

const { Home } = i18n
describe('<Adventures />', () => {
  const mountComponent = (props) => (
    mount(
      <Router>
        <Adventures />
      </Router>
    )
  )

  const component = mountComponent({ user: {} })

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render component', () => {
    expect(component.find(Adventures)).toHaveLength(1)
  })

  it('should render template HTML tags', () => {
    expect(component.find('template')).toHaveLength(1)
  })

  it('should render template HTML tags', () => {
    expect(component.find('section')).toHaveLength(1)
  })

  it('should render with h2 tags', () => {
    const adventures = component.find(Adventures)
    expect(adventures.find('h2')).toHaveLength(1)
  })

  it('should render with third_section title', () => {
    const adventures = component.find(Adventures)
    expect(adventures.find('h2').text()).toBe(Home.third_section.title)
  })

  it('should render with four p tags', () => {
    const adventures = component.find(Adventures)
    expect(adventures.find('p').length).toBe(4)
  })

  it('should render with third_section content first', () => {
    const adventures = component.find(Adventures)
    const actual = adventures.find('p').at(0)
    expect(actual.text()).toBe(Home.third_section.content.first)
  })

  it('should render with third_section content second', () => {
    const adventures = component.find(Adventures)
    const actual = adventures.find('p').at(1)
    expect(actual.text()).toBe(Home.third_section.content.second)
  })

  it('should render with third_section content third', () => {
    const adventures = component.find(Adventures)
    const actual = adventures.find('p').at(2)
    expect(actual.text()).toBe(Home.third_section.content.third)
  })

  it('should render with third_section content fourth', () => {
    const adventures = component.find(Adventures)
    const actual = adventures.find('p').at(3)
    expect(actual.text()).toBe(Home.third_section.content.fourth)
  })

  //
  // it('should render  with second_section content one', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(0)
  //   expect(actual.text()).toBe(Home.second_section.content.first)
  // })
  //
  // it('should render  with second_section content two', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(1)
  //   expect(actual.text()).toBe(Home.second_section.content.second)
  // })
  //
  // it('should render  with second_section content three', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(2)
  //   expect(actual.text()).toBe(Home.second_section.content.third)
  // })
  //
  // it('should render  with second_section content four', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(3)
  //   expect(actual.text()).toBe(Home.second_section.content.fourth)
  // })
  //
  // it('should render  with items div', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('.items')
  //   expect(actual.exists()).toBeTruthy()
  // })

  // it('should render  with SmileyLogo', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find(SmileyLogo)
  //   expect(actual.exists()).toBeTruthy()
  // })
  //
  // it('should render  with FriendsLogo', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find(FriendsLogo)
  //   expect(actual.exists()).toBeTruthy()
  // })
  //
  // it('should render  with ShareLogo', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find(ShareLogo)
  //   expect(actual.exists()).toBeTruthy()
  // })
})

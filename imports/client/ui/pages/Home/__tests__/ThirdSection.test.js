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

  it('should render an <Adventures /> component', () => {
    expect(component.find(Adventures)).toHaveLength(1)
  })

  it('should render <Adventures /> template HTML tags', () => {
    expect(component.find('template')).toHaveLength(1)
  })

  it('should render <Adventures /> template HTML tags', () => {
    expect(component.find('section')).toHaveLength(1)
  })

  it('should render <Adventures /> with h2 tags', () => {
    const about = component.find(Adventures)
    expect(about.find('h2')).toHaveLength(1)
  })

  // it('should render <Adventures /> with second_section title', () => {
  //   const about = component.find(Adventures)
  //   expect(about.find('h2').text()).toBe(Home.second_section.title)
  // })
  //
  // it('should render <Adventures /> with four p tags', () => {
  //   const about = component.find(Adventures)
  //   expect(about.find('p').length).toBe(4)
  // })
  //
  // it('should render <Adventures /> with second_section content one', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find('p').at(0)
  //   expect(actual.text()).toBe(Home.second_section.content.first)
  // })
  //
  // it('should render <Adventures /> with second_section content two', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find('p').at(1)
  //   expect(actual.text()).toBe(Home.second_section.content.second)
  // })
  //
  // it('should render <Adventures /> with second_section content three', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find('p').at(2)
  //   expect(actual.text()).toBe(Home.second_section.content.third)
  // })
  //
  // it('should render <Adventures /> with second_section content four', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find('p').at(3)
  //   expect(actual.text()).toBe(Home.second_section.content.fourth)
  // })
  //
  // it('should render <Adventures /> with items div', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find('.items')
  //   expect(actual.exists()).toBeTruthy()
  // })

  // it('should render <Adventures /> with SmileyLogo', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find(SmileyLogo)
  //   expect(actual.exists()).toBeTruthy()
  // })
  //
  // it('should render <Adventures /> with FriendsLogo', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find(FriendsLogo)
  //   expect(actual.exists()).toBeTruthy()
  // })
  //
  // it('should render <Adventures /> with ShareLogo', () => {
  //   const about = component.find(Adventures)
  //   const actual = about.find(ShareLogo)
  //   expect(actual.exists()).toBeTruthy()
  // })
})

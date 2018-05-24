import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import MoreLinks from '../FifthSection/MoreLinks'
// import i18n from '/imports/both/i18n/en'

// const { Home } = i18n
describe('<MoreLinks />', () => {
  const mountComponent = (props) => (
    mount(
      <Router>
        <MoreLinks />
      </Router>
    )
  )

  const component = mountComponent({ user: {} })

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })
  //
  // it('should render component', () => {
  //   expect(component.find(Mission)).toHaveLength(1)
  // })
  //
  // it('should render section HTML tags', () => {
  //   expect(component.find('section')).toHaveLength(1)
  // })
  //
  // it('should render section with content-section selector', () => {
  //   expect(component.find('.content-section').exists()).toBeTruthy()
  // })
  //
  // it('should render div with text-content selector', () => {
  //   expect(component.find('.text-content').exists()).toBeTruthy()
  // })
  //
  // it('should render iframe tag', () => {
  //   expect(component.find('iframe').exists()).toBeTruthy()
  // })
  //
  // it('should render with h2 tags', () => {
  //   expect(component.find('h2')).toHaveLength(1)
  // })
  //
  // it('should render with fourth_section title', () => {
  //   expect(component.find('h2').text()).toBe(Home.fourth_section.title)
  // })
  //
  // it('should render with one p tag', () => {
  //   expect(component.find('p').length).toBe(5)
  // })
  //
  // it('should render with fourth_section content first', () => {
  //   const actual = component.find('p').at(4)
  //   expect(actual.text()).toBe(Home.fourth_section.content.first)
  // })
  //
  // it('should render with fourth_section content second', () => {
  //   const actual = component.find('p').at(0)
  //   expect(actual.text()).toBe(Home.fourth_section.content.second)
  // })
  //
  // it('should render with fourth_section content third', () => {
  //   const actual = component.find('p').at(1)
  //   expect(actual.text()).toBe(Home.fourth_section.content.third)
  // })
  //
  // it('should render with fourth_section content fourth', () => {
  //   const actual = component.find('p').at(2)
  //   expect(actual.text()).toBe(Home.fourth_section.content.fourth)
  // })
  //
  // it('should render with fourth_section content fifth', () => {
  //   const actual = component.find('p').at(3)
  //   expect(actual.text()).toBe(Home.fourth_section.content.fifth)
  // })
})

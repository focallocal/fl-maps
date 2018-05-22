import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import Mission from '../FourthSection/Mission'
import i18n from '/imports/both/i18n/en'

const { Home } = i18n
describe('<Mission />', () => {
  const mountComponent = (props) => (
    mount(
      <Router>
        <Mission />
      </Router>
    )
  )

  const component = mountComponent({ user: {} })

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render component', () => {
    expect(component.find(Mission)).toHaveLength(1)
  })

  it('should render section HTML tags', () => {
    expect(component.find('section')).toHaveLength(1)
  })

  it('should render section with content-section selector', () => {
    expect(component.find('.content-section').exists()).toBeTruthy()
  })

  it('should render div with text-content selector', () => {
    expect(component.find('.text-content').exists()).toBeTruthy()
  })

  it('should render iframe tag', () => {
    expect(component.find('iframe').exists()).toBeTruthy()
  })

  it('should render with h2 tags', () => {
    expect(component.find('h2')).toHaveLength(1)
  })

  it('should render with fourth_section title', () => {
    expect(component.find('h2').text()).toBe(Home.fourth_section.title)
  })
  //
  // it('should render with four p tags', () => {
  //   const adventures = component.find(Adventures)
  //   expect(adventures.find('p').length).toBe(4)
  // })
  //
  // it('should render with third_section content first', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(0)
  //   expect(actual.text()).toBe(Home.third_section.content.first)
  // })
  //
  // it('should render with third_section content second', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(1)
  //   expect(actual.text()).toBe(Home.third_section.content.second)
  // })
  //
  // it('should render with third_section content third', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(2)
  //   expect(actual.text()).toBe(Home.third_section.content.third)
  // })
  //
  // it('should render with third_section content fourth', () => {
  //   const adventures = component.find(Adventures)
  //   const actual = adventures.find('p').at(3)
  //   expect(actual.text()).toBe(Home.third_section.content.fourth)
  // })
})

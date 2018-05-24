import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import MoreLinks from '../FifthSection/MoreLinks'
import Option from '../FifthSection/MoreLinks/Option'
import i18n from '/imports/both/i18n/en'

const { Home } = i18n
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

  it('should render component', () => {
    expect(component.find(MoreLinks)).toHaveLength(1)
  })

  it('should render section HTML tags', () => {
    expect(component.find('section')).toHaveLength(1)
  })

  it('should render section with content-section selector', () => {
    expect(component.find('.content-section').exists()).toBeTruthy()
  })

  it('should render div with container selector', () => {
    expect(component.find('.container').exists()).toBeTruthy()
  })

  it('should render with h2 tags', () => {
    expect(component.find('h2')).toHaveLength(1)
  })

  it('should render with fifth_section title', () => {
    expect(component.find('h2').text()).toBe(Home.fifth_section.title)
  })

  it('should render with one p tag', () => {
    expect(component.find('p').length).toBe(1)
  })

  it('should render with fifth_section content first', () => {
    const actual = component.find('p').at(0)
    expect(actual.text()).toBe(Home.fifth_section.content.first)
  })

  it('should render three Option components', () => {
    const actual = component.find(Option)
    expect(actual.length).toBe(3)
  })

  it('should render Option with fifth_section first option', () => {
    const actual = component.find(Option).at(0)
    expect(actual.props().text).toBe(Home.fifth_section.content.options.first)
  })

  it('should render Option with fifth_section first option', () => {
    const actual = component.find(Option).at(1)
    expect(actual.props().text).toBe(Home.fifth_section.content.options.second)
  })

  it('should render Option with fifth_section first option', () => {
    const actual = component.find(Option).at(2)
    expect(actual.props().text).toBe(Home.fifth_section.content.options.third)
  })
})

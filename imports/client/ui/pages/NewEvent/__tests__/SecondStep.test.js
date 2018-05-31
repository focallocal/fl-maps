import React from 'react'
import { mount } from 'enzyme'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import FormWizard from '../FormWizard'

describe('<SecondStep />', () => {
  let element // needed for reactstrap popover component.

  beforeAll(() => {
    element = document.createElement('div')
    element.setAttribute('id', 'set-hours')

    document.body.appendChild(element)
  })

  afterAll(() => {
    document.body.removeChild(element)
  })

  const mountRenderer = props => {
    const wrapper = mount(
      <FormWizard
        currentStep={1}
        passFormRefToParent={() => {}}
        {...props}
      />
    )
    wrapper.setState({})

    return wrapper
  }

  const wrapper = mountRenderer()

  it('should render', () => {
    expect(wrapper.find('#second-step').exists()).toBe(true)
  })

  it('should render date-hours fields', () => {
    const dateHours = wrapper.find('#second-step .dates-hours')

    expect(dateHours).toHaveLength(1)
    expect(dateHours.find('.between').text()).toEqual('to')

    const children = dateHours.find(AutoField)
    const fields = [
      'when.startingDate', 'when.startingTime',
      'when.endingDate', 'when.endingTime'
    ]

    fields.forEach((field, index) => {
      expect(children.at(index).props().name).toEqual(field)
    })
  })

  it('should hide hours fields if multipleDays is checked', () => {
    const wrapper_ = mountRenderer()
    const multipleDays = wrapper_.find('#multipleDays')

    expect(wrapper_.find('#second-step .dates-hours').find(AutoField)).toHaveLength(4)
    multipleDays.at(2).simulate('click')
    expect(wrapper_.find('#second-step .dates-hours').find(AutoField)).toHaveLength(2)
  })

  it('should render a multipleDays radio input', () => {
    const multipleDays = wrapper.find('#multipleDays').at(0)

    expect(multipleDays.exists()).toBe(true)
    expect(multipleDays.props()).toEqual({
      id: 'multipleDays',
      label: 'More then one day',
      value: undefined,
      type: 'radio'
    })
  })

  test('checking multipleDays hould display .week-days', () => {
    const multipleDays = wrapper.find('#multipleDays')

    expect(wrapper.find('.week-days')).toHaveLength(0)
    multipleDays.at(2).simulate('click')
    expect(wrapper.find('.week-days')).toHaveLength(1)
  })

  test('checking multipleDays should hide #repeat', () => {
    expect(wrapper.find('#repeat').at(0).props().value).toEqual(false)
  })

  it('should render a repeat radio input', () => {
    const repeat = wrapper.find('#repeat').at(0)

    expect(repeat.exists()).toBe(true)
    expect(repeat.props()).toEqual({
      id: 'repeat',
      label: 'Custom recurrence',
      value: false,
      type: 'radio'
    })
  })

  test('checking repeat should display #recurring', () => {
    const repeat = wrapper.find('#repeat')

    expect(wrapper.find('#recurring')).toHaveLength(0)
    repeat.at(2).simulate('click')
    expect(wrapper.find('#recurring')).toHaveLength(1)
  })

  test('checking repeat should hide #multipleDays', () => {
    expect(wrapper.find('#multipleDays').at(0).props().value).toEqual(false)
  })
})

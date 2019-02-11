import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import AutoForm from '/imports/client/utils/uniforms-custom/AutoForm'
import { getHour } from '/imports/both/collections/events/helpers'
import FormWizard from '../FormWizard'

describe('<FormWizard />', () => {
  let element // needed for reactstrap popover component.

  beforeAll(() => {
    element = document.createElement('div')
    element.setAttribute('id', 'set-hours')

    document.body.appendChild(element)
  })

  afterAll(() => {
    document.body.removeChild(element)
  })

  const mountRenderer = props =>
    mount(
      <FormWizard
        currentStep={0}
        passFormRefToParent={() => {}}
        {...props}
      />
    )

  const wrapper = mountRenderer()

  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should call passFormRefToParent function from props when ref is set', () => {
    const spy = sinon.spy()
    mountRenderer({ passFormRefToParent: spy })

    expect(spy.calledOnce).toBe(true)
  })

  test('initial loadModelFromStorage', () => {
    const spy = jest.spyOn(FormWizard.prototype, 'loadModelFromStorage')
    const wrapper_ = mountRenderer()

    expect(spy).toHaveBeenCalled()

    const emptyModel = wrapper_.instance().loadModelFromStorage()
    expect(emptyModel).toEqual({
      createdAt: emptyModel.createdAt,
      organiser: { _id: '-', name: '-' },
      engagement: { limit: '1000', attendees: [] },
      when: {
        recurring: {
          forever: true
        },
        repeat: false,
        startingTime: getHour(),
        endingTime: getHour(3)
      }
    })
  })

  it('should render an AutoForm component', () => {
    expect(wrapper.find(AutoForm)).toHaveLength(1)
  })

  it('should render a reset button that resets the form on click', () => {
    jest.useFakeTimers()

    const wrapper_ = mountRenderer()
    wrapper_.setState({}) // force re-render so "this.form" is not null (ref)

    const reset = wrapper_.find('.reset')

    expect(reset).toHaveLength(1)
    expect(wrapper_.state().reset).toBe(false)

    const spy = sinon.spy(wrapper_.instance().form, 'reset')
    reset.simulate('click')
    expect(spy.calledOnce).toBe(true)
    expect(wrapper_.state().reset).toBe(true)

    // we have a timer that auto-updates the component state to { reset: false }
    jest.runAllTimers()
    expect(wrapper_.state().reset).toBe(false)
    jest.clearAllTimers()
  })

  it('should render steps based on "currentStep" prop', () => {
    const wrapper_ = mountRenderer({ currentStep: 0 })
    wrapper_.setState({})

    expect(wrapper_.find('#first-step')).toHaveLength(1)
    wrapper_.setProps({ currentStep: 1 })
    expect(wrapper_.find('#second-step')).toHaveLength(1)
  })
})

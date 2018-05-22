/*
  The New-Event-Modal is a complex component, the following tests will ensure it's working as expected.
  This is an integration test that will mimic a user going through the form
*/
import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { CustomInput, Alert } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import NewEventModal from '../index.js'
import SecondStep from '../FormWizard/SecondStep'
import JustOneDay from '../FormWizard/DateTimeModule/JustOneDay'
import SpecificPeriod from '../FormWizard/DateTimeModule/SpecificPeriod'
import SetSameHoursPopover from '../FormWizard/DateTimeModule/SpecificPeriod/SetSameHoursPopover'
import Recurring from '../FormWizard/DateTimeModule/Recurring'
import MonthlyPickDays from '../FormWizard/DateTimeModule/Recurring/MonthlyPickDays'

describe('<NewEventModal />', () => {
  let component
  let formRef

  beforeAll(() => {
    Meteor.userId = sinon.stub().returns(true)
    component = mount(
      <MemoryRouter initialEntries={['/']}>
        <NewEventModal isOpen={true} toggleModal={jest.fn()}/>
      </MemoryRouter>
    )
    formRef = component.find(NewEventModal).instance().state.form
    localStorage.removeItem('new-event-model')
  })

  afterAll(() => {
    Meteor.userId = sinon.stube().returns(null)
    component = false
  })

  it('should set the form\'s model "when.type" key with a "oneDay" value', () => {
    expect(formRef.getModel().when.type).toEqual('oneDay')
  })

  it('should render a "next" button on the first step', () => {
    expect(component.find('.modal-footer button').text()).toEqual('Next')
  })

  test('<JustOneDay /> should render 4 fields', () => {
    expect(component.find('.modal-body form #first-step').children()).toHaveLength(4)
  })

  it('should go to the next step on "Next" button click', () => {
    expect(component.find('.modal-body form #second-step').exists()).toBe(false)
    component.find('.modal-footer button').at(0).simulate('click')
    expect(component.find('.modal-body form #second-step').exists()).toBe(true)
  })

  /* Second Step */

  it('should check "oneDay" option by default', () => {
    expect(component.find('#oneDay').at(0).props().checked).toBe(true)
  })

  it('should show only the content of the checked option', () => {
    expect(component.find(JustOneDay).props().show).toBe(true)
    expect(component.find(SpecificPeriod).props().show).toBe(false)
    expect(component.find(Recurring).props().show).toBe(false)
  })

  test('handleCheckbox method should remove data of previously checked option and save new selected', () => {
    component.find(SecondStep).instance().handleCheckbox('specificPeriod')
    component.update() // wait for a re-render

    expect(component.find('#specificPeriod').at(0).props().checked).toBe(true)
    expect(component.find(SpecificPeriod).props().show).toBe(true)
  })

  test('<SpecificPeriod /> should render 3 fields', () => {
    const wrapper = component.find(SpecificPeriod)
    expect(wrapper.find('.inline-inputs').find(AutoField)).toHaveLength(2)
    expect(wrapper.find('.weekdays')).toHaveLength(1)
  })

  test('resetDates method should reset date values', () => {
    const date = new Date()
    formRef.change('when.specificPeriod', {
      startingDate: date,
      endingDate: date
    })
    component.find(SpecificPeriod).instance().resetDates()

    const { startingDate, endingDate } = formRef.getModel().when.specificPeriod
    expect(startingDate).toEqual(null)
    expect(endingDate).toEqual(null)
  })

  test('<SetSameHoursPopover /> should set the same hours for all checked days', () => {
    const wrapper = component.find(SetSameHoursPopover).instance()
    formRef.change('when.specificPeriod.days', [{ day: 'Sunday' }, { day: 'Monday' }])

    const modelBefore = formRef.getModel()
    expect(modelBefore.when.specificPeriod.days[0].startingTime).toEqual(undefined)
    expect(modelBefore.when.specificPeriod.days[0].endingTime).toEqual(undefined)

    wrapper.handleStartingTime({ label: '15:00' })
    wrapper.handleEndingTime({ label: '20:00' })

    const modelAfter = formRef.getModel()
    expect(modelAfter.when.specificPeriod.days[0].startingTime).toEqual('15:00')
    expect(modelAfter.when.specificPeriod.days[0].endingTime).toEqual('20:00')
  })

  test('<WeekDays /> should render a list of all week days and from/until hours inputs', () => {
    const wrapper = component.find('.weekdays')

    expect(wrapper.children()).toHaveLength(7)
  })

  test('clicking on a checkbox should add/remove a day object from days array', () => {
    const wrapper = component.find('.weekdays')
    expect(formRef.getModel().when.specificPeriod.days).toHaveLength(2)
    wrapper.find(CustomInput).at(0).find('input').simulate('change')
    expect(formRef.getModel().when.specificPeriod.days).toHaveLength(1)
  })

  test('<Recurring /> should render 6 fields', () => {
    component.find(SecondStep).instance().handleCheckbox('recurring')
    component.update() // wait for a re-render

    const wrapper = component.find(Recurring)

    expect(wrapper.find(AutoField)).toHaveLength(4)
    expect(wrapper.find(MonthlyPickDays)).toHaveLength(1)
    expect(wrapper.find('#forever').exists())
  })

  test('handleCheckbox should toggle forever key value', () => {
    formRef.change('when.recurring.forever', true)
    expect(formRef.getModel().when.recurring.forever).toBe(true)
    component.find(Recurring).instance().handleCheckbox(false)
    expect(formRef.getModel().when.recurring.forever).toBe(false)
  })

  it('should go to the last step', () => {
    expect(component.find('.modal-body form #third-step').exists()).toBe(false)
    component.find('.modal-footer button').at(0).simulate('click')
    expect(component.find('.modal-body form #third-step').exists()).toBe(true)
  })

  test('<ThirdStep /> should render 3 fields', () => {
    expect(component.find('#third-step').children()).toHaveLength(3)
  })

  test('submit should throw errors and display alert', (done) => {
    const wrapper = component.find(NewEventModal)
    const instance = wrapper.instance()

    expect(instance.state.hasErrors).toBe(false)
    instance.submit()
    setTimeout(() => {
      expect(instance.state.hasErrors).toBe(true)
      done()
    }, 1) // wait for a promise

    instance.setState({ hasErrors: true })
    component.update()
    expect(component.find(NewEventModal).find(Alert).props().isOpen).toBe(true)
  })

  it('should be able to go back to the second and first step', () => {
    component.find('.modal-footer button').at(1).simulate('click')
    expect(component.find('.modal-body form #second-step').props().style.display).toBe('block')
    component.find('.modal-footer button').at(1).simulate('click')
    expect(component.find('.modal-body form #first-step').props().style.display).toBe('block')
  })
})

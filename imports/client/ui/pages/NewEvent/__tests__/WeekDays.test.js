import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import AutoForm from 'uniforms/AutoForm'
import { Input, FormGroup } from 'reactstrap'
import { EventsSchema } from '/imports/both/collections/events'
import WeekDays from '../FormWizard/DateTimeModule/WeekDays'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class Parent extends React.Component {
  render () {
    return (
      <AutoForm
        schema={EventsSchema}
      >
        <WeekDays
          form={{ change: () => {}, getModel: () => ({}) }}
          schemaKey={'when.days'}
          selectedDays={[{
            day: 'Sunday',
            startingTime: '09:00',
            endingTime: '17:00'
          }]}
          {...this.props}
        />
      </AutoForm>
    )
  }
}

describe('<WeekDays />', () => {
  const wrapper = mount(<Parent />)

  it('should render', () => {
    expect(wrapper.find(WeekDays)).toHaveLength(1)
  })

  it('should render a list of all weekday checkboxes', () => {
    expect(wrapper.find('.day-checkboxes').find(FormGroup)).toHaveLength(weekDays.length)
  })

  test('checkbox should be marked if selectedDays contains the rendered day object', () => {
    const sundayCheckbox = wrapper.find('.day-checkboxes').find('input[type="checkbox"]').at(0)
    expect(sundayCheckbox.props().checked).toBe(true)
  })

  test('unchecked day should not be checked', () => {
    const mondayCheckbox = wrapper.find('.day-checkboxes').find('input[type="checkbox"]').at(1)
    expect(mondayCheckbox.props().checked).toBe(false)
  })

  test('selected days should show time inputs', () => {
    expect(wrapper.find('.day-times').find('.day-time-row')).toHaveLength(1)
  })

  test('time row should have start and end time inputs', () => {
    const timeRow = wrapper.find('.day-time-row').at(0)
    const timeInputs = timeRow.find('.hours').find(Input)
    expect(timeInputs).toHaveLength(2)
  })

  test('unchecking a day should call form.change to remove it', () => {
    const spy = sinon.spy()
    const wrapper_ = mount(
      <Parent
        form={{ change: spy, getModel: () => ({}) }}
        selectedDays={[{ day: 'Sunday', startingTime: '09:00', endingTime: '17:00' }]}
      />
    )
    const sundayCheckbox = wrapper_.find('.day-checkboxes').find('input[type="checkbox"]').at(0)

    sundayCheckbox.simulate('change')
    expect(spy.calledOnce).toBe(true)
    expect(spy.firstCall.args[0]).toBe('when.days')
    expect(spy.firstCall.args[1]).toEqual([]) // Sunday should be removed
  })

  test('checking a new day should add it to selectedDays', () => {
    const spy = sinon.spy()
    const wrapper_ = mount(
      <Parent
        form={{ change: spy, getModel: () => ({}) }}
        selectedDays={[{ day: 'Sunday', startingTime: '09:00', endingTime: '17:00' }]}
      />
    )
    const mondayCheckbox = wrapper_.find('.day-checkboxes').find('input[type="checkbox"]').at(1)

    mondayCheckbox.simulate('change')
    expect(spy.calledOnce).toBe(true)
    expect(spy.firstCall.args[0]).toBe('when.days')
    // Should now have Sunday and Monday (sorted by weekday order)
    expect(spy.firstCall.args[1]).toHaveLength(2)
    expect(spy.firstCall.args[1][0].day).toBe('Sunday')
    expect(spy.firstCall.args[1][1].day).toBe('Monday')
  })
})

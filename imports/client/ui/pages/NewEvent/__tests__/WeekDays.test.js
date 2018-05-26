import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import AutoForm from 'uniforms/AutoForm'
import { CustomInput } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
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
          form={{}}
          schemaKey={'when.days'}
          selectedDays={[{
            day: 'Sunday'
          }]}
          {...this.props}
        />
      </AutoForm>
    )
  }
}

describe('<WeekDays />', () => {
  const wrapper = mount(<Parent />)
  const schemaKey = 'when.days'

  it('should render', () => {
    expect(wrapper.find(WeekDays)).toHaveLength(1)
  })

  it('should render a list of all weekdays', () => {
    expect(wrapper.find('.day')).toHaveLength(weekDays.length)
  })

  test('each item should render a checkbox, and hours inputs', () => {
    const day = wrapper.find('.day').at(0)
    const index = 0

    expect(day.find(CustomInput).props().id).toEqual('day-Sunday')
    expect(day.find('.hours').find(AutoField).at(0).props().name).toEqual(schemaKey + '.' + index + '.startingTime')
    expect(day.find('.hours').find(AutoField).at(1).props().name).toEqual(schemaKey + '.' + index + '.endingTime')
  })

  test('checkbox should be marked if selectedDays contains the rendered day object', () => {
    const day = wrapper.find('.day').at(0)

    expect(day.find(CustomInput).props().checked).toBe(true)
  })

  test('unchecking should remove the day object from the selectedDays array', () => {
    const spy = sinon.spy()
    const index = 0
    const wrapper_ = mount(
      <Parent
        form={{ change: spy }}
      />
    )
    const day = wrapper_.find('.day').at(index)

    day.find(CustomInput).find('input').simulate('change')
    expect(spy.calledOnceWith(`${schemaKey}`, [null])).toBe(true)
  })

  test('checking should add an object to selectedDays and populate the "day" key', () => {
    const spy = sinon.spy()
    const index = 1
    const wrapper_ = mount(
      <Parent
        form={{ change: spy }}
      />
    )
    const day = wrapper_.find('.day').at(index)
    day.find(CustomInput).find('input').simulate('change')
    expect(spy.calledOnceWith(`${schemaKey}.${index}.day`, 'Monday')).toBe(true)
  })

  test('providing hours only should automatically check the checkbox', () => {
    const wrapper = mount(
      <Parent
        selectedDays={[{ startingTime: '0:00', endingTime: '0:30' }]}
      />
    )

    expect(wrapper.find(CustomInput).at(0).props().checked).toEqual(true)
  })
})

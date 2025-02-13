import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import { AutoForm } from 'uniforms'
import { EventsSchema } from '/imports/both/collections/events'
import Weekly from '../FormWizard/DateTimeModule/Recurring/Weekly'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class Parent extends React.Component {
  render () {
    return (
      <AutoForm
        schema={EventsSchema}
      >
        <Weekly
          form={{}}
          schemaKey={'when.recurring.days'}
          selectedDays={['Sunday']}
          {...this.props}
        />
      </AutoForm>
    )
  }
}

describe('<WeekDays />', () => {
  const wrapper = mount(<Parent />)
  const schemaKey = 'when.recurring.days'

  it('should render', () => {
    expect(wrapper.find(Weekly)).toHaveLength(1)
  })

  it('should render a list of items based on all weekdays', () => {
    expect(wrapper.find('.weekdays').children()).toHaveLength(weekDays.length)
  })

  test('clicking on a checked item should remove it from the model', () => {
    const spy = sinon.spy()
    const wrapper_ = mount(
      <Parent
        form={{ change: spy }}
      />
    )

    const item = wrapper_.find('.weekdays').children().at(0)
    item.simulate('click')
    expect(spy.calledOnceWith(schemaKey, [])).toBe(true)
  })

  test('clicking on an unchecked item should add it to the model', () => {
    const spy = sinon.spy()
    const wrapper_ = mount(
      <Parent
        form={{ change: spy }}
        selectedDays={[]}
      />
    )

    const item = wrapper_.find('.weekdays').children().at(0)
    item.simulate('click')
    expect(spy.calledOnceWith(schemaKey, [ 'Sunday' ])).toBe(true)
  })
})

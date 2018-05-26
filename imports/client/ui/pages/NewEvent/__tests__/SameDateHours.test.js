import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Select from 'react-select'
import SameDateHours from '../FormWizard/SameDateHours'

describe('<SameDateHours />', () => {
  let element

  beforeAll(() => {
    element = document.createElement('span')
    element.setAttribute('id', 'set-hours')
    document.body.appendChild(element)
  })

  afterAll(() => {
    document.body.removeChild(element)
  })

  const mountRenderer = (props) =>
    shallow(
      <SameDateHours
        form={{
          getModel: () => ({ when: { days: [{}] } })
        }}
        {...props}
      />
    )

  it('should render a span element with id and text', () => {
    const wrapper = mountRenderer()
    const setHoursSpan = wrapper.find('#set-hours')

    expect(setHoursSpan.text()).toEqual(
      'Click here to set the same hours for all selected days'
    )
  })

  test('clicking on #set-hours should open a popover with 2 select elements', () => {
    const wrapper = mountRenderer()
    const setHoursSpan = wrapper.find('#set-hours')

    setHoursSpan.simulate('click')
    expect(wrapper.find(Select)).toHaveLength(2)
  })

  test('first search element should handle startingTime value', () => {
    const spy = sinon.spy()
    const wrapper = mountRenderer()
    wrapper.instance().props.form.change = spy

    const select = wrapper.find(Select).at(0)
    const hour = { value: 0, label: '0:00' }

    expect(wrapper.state().startingTime).toEqual(null)
    select.simulate('change', hour)
    expect(wrapper.state().startingTime).toEqual(hour)
    expect(spy.calledOnceWith('when.days', [{ startingTime: '0:00' }])).toBe(true)
  })

  test('second search element should handle endingTime value', () => {
    const spy = sinon.spy()
    const wrapper = mountRenderer()
    wrapper.instance().props.form.change = spy

    const select = wrapper.find(Select).at(1)
    const hour = { value: 0, label: '0:00' }

    expect(wrapper.state().endingTime).toEqual(null)
    select.simulate('change', hour)
    expect(wrapper.state().endingTime).toEqual(hour)
    expect(spy.calledOnceWith('when.days', [{ endingTime: '0:00' }])).toBe(true)
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import ErrorField from '/imports/client/utils/uniforms-custom/ErrorField'
import Recurring from '../FormWizard/DateTimeModule/Recurring'
import Weekly from '../FormWizard/DateTimeModule/Recurring/Weekly'
import Monthly from '../FormWizard/DateTimeModule/Recurring/Monthly'

describe('<Recurring />', () => {
  let baseForm = {
    monthly: {},
    days: [],
    when: {
      recurring: {
        forever: true,
        type: 'day',
        occurences: null
      }
    }
  }

  const clonedForm = () => JSON.parse(JSON.stringify(baseForm))

  const shallowRenderer = ({ form, change } = {}) =>
    shallow(
      <Recurring
        form={{
          getModel: () => { return form || clonedForm() },
          change: change
        }}
      />
    )

  const wrapper = shallowRenderer()

  it('should render', () => {
    expect(wrapper.find('#recurring').exists()).toEqual(true)
  })

  it('should render "every" and "type" fields and text', () => {
    const wrapper_ = wrapper.find('.every-type')
    const fields = wrapper_.find(AutoField)

    expect(wrapper.find('span').at(0).text()).toEqual('Repeat every')
    expect(fields).toHaveLength(2)
    expect(fields.at(0).props().name).toEqual('when.recurring.every')
    expect(fields.at(1).props().name).toEqual('when.recurring.type')
  })

  test('if type is "week" render <Weekly /> with props & <ErrorField />', () => {
    const form = clonedForm()
    form.when.recurring.type = 'week'
    const wrapper_ = shallowRenderer({ form })
    const weekly = wrapper_.find(Weekly)

    expect(wrapper.find(Weekly).exists()).toEqual(false) // by default should not render

    expect(weekly.exists()).toEqual(true)
    expect(weekly.props()).toHaveProperty('form')
    expect(weekly.props()).toHaveProperty('selectedDays')
    expect(weekly.props()).toHaveProperty('schemaKey')

    expect(wrapper_.find(ErrorField).at(0).props().name).toEqual('when.recurring.days')
  })

  test('if type is "month" render <Monthly /> with props', () => {
    const form = clonedForm()
    form.when.recurring.type = 'month'
    const wrapper_ = shallowRenderer({ form })
    const monthly = wrapper_.find(Monthly)

    expect(wrapper.find(Monthly).exists()).toEqual(false) // by default should not render

    expect(monthly.exists()).toEqual(true)
    expect(monthly.props()).toHaveProperty('form')
    expect(monthly.props()).toHaveProperty('startingDate')
    expect(monthly.props()).toHaveProperty('monthly')
  })

  it('should render a <CheckBox /> that toggles "forever" state', () => {
    const spy = sinon.spy()
    const wrapper_ = shallowRenderer({ change: spy })
    const checkbox = wrapper_.find('#forever')

    expect(checkbox).toHaveLength(1)
    checkbox.dive().simulate('change')
    expect(spy.calledOnce).toBe(true)
    expect(spy.args).toEqual([['when.recurring.forever', false]])
  })

  it('should render "occurences" and "until" fields and text', () => {
    let form = clonedForm()
    form.when.recurring.forever = false
    const wrapper_ = shallowRenderer({ form }).find('.occurences-until')
    const fields = wrapper_.find(AutoField)

    expect(fields).toHaveLength(2)
    expect(fields.at(0).props().name).toEqual('when.recurring.occurences')
    expect(fields.at(1).props().name).toEqual('when.recurring.until')

    expect(wrapper_.find('div').at(0).find('span').at(0).text()).toEqual('Repeat for')
    expect(wrapper_.find('div').at(0).find('span').at(1).text()).toEqual('occurence')
    expect(wrapper_.find('div').at(2).find('span').at(0).text()).toEqual(' or until')
  })

  it('should add "s" to "occurence" text if value of occurences > 1', () => {
    let form = clonedForm()
    form.when.recurring.forever = false
    form.when.recurring.occurences = 2
    const wrapper_ = shallowRenderer({ form }).find('.occurences-until')

    expect(wrapper_.find('div').at(0).find('span').at(1).text()).toEqual('occurences')
  })
})

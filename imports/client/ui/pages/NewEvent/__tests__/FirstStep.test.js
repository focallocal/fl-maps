import React from 'react'
import { mount } from 'enzyme'
import FormWizard from '../FormWizard'

describe('<FirstStep />', () => {
  const mountRenderer = props =>
    mount(
      <FormWizard
        currentStep={0}
        passFormRefToParent={() => {}}
        {...props}
      />
    )

  it('should render 4 AutoField components', () => {
    const wrapper = mountRenderer()
    wrapper.setState({})
    const FirstStep = wrapper.find('#first-step')
    const children = FirstStep.children()
    const fields = ['name', 'address', 'categories', 'engagement.limit']

    expect(children).toHaveLength(4)
    fields.forEach((field, index) => {
      expect(children.at(index).props().name).toEqual(fields[index])
    })
  })
})

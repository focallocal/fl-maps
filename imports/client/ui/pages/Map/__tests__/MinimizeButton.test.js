import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import MinimizeButton from '../EventsList/MinimizeButton'
import { Button } from 'reactstrap'

describe('<MinimizeButton />', () => {
  const shallowRender = (props) =>
    shallow(
      <MinimizeButton
        {...props}
      />
    )

  const component = shallowRender({ toggleFilters: () => {} })

  it('should render a button with id "minimize"', () => {
    expect(component.find(Button)).toHaveLength(1)
    expect(component.props().id).toEqual('minimize')
  })

  it('should get an onMinimize prop to be called upon click event', () => {
    const spy = sinon.spy()
    const component_ = shallowRender({ onMinimize: spy })

    component_.simulate('click')
    expect(spy.calledOnce).toBe(true)
  })
})

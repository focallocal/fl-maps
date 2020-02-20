import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import SearchButtons from '../SearchButtons'
import { Button } from 'reactstrap'

describe('<SearchButtons />', () => {
  const shallowRender = (props) => {
    return shallow(
      <SearchButtons
        {...props}
      />
    )
  }

  const component = shallowRender({ toggleFilters: () => {} })

  it('should render 2 button', () => {
    expect(component.find(Button)).toHaveLength(2)
  })

  it('should call toggleFilters on filters button click', () => {
    const spy = sinon.spy()
    const component_ = shallowRender({ toggleFilters: spy })

    component_.find(Button).at(0).simulate('click')
    expect(spy.calledOnce).toBe(true)
  })
})

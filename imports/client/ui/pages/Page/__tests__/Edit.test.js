import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'reactstrap'
import Edit from '../Edit'

describe('<Edit />', () => {
  const shallowRenderer = props =>
    shallow(
      <Edit
        data={{}}
        history={{ push: jest.fn() }}
        {...props}
      />
    )

  it('should render a button', () => {
    const wrapper_ = shallowRenderer()

    expect(wrapper_.find(Button)).toHaveLength(1)
    expect(wrapper_.find(Button).childAt(0).text()).toEqual('Edit Page')
  })

  test('openEditModal should open modal and cache the page data', () => {
    const wrapper_ = shallowRenderer({
      history: {
        push: jest.fn()
      },
      data: { test: 'test' }
    })

    const instance = wrapper_.instance()
    const { history, data } = instance.props

    instance.openEditModal()

    expect(history.push.mock.calls[0][0]).toEqual('?edit=1')
    expect(window.__editData).toEqual(data)
    delete window.__editData
  })
})

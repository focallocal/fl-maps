import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import NewEventModal from '../index'

describe('<NewEventModal />', () => {
  const shallowRenderer = props =>
    shallow(
      <NewEventModal
        isOpen={true}
        location={{
          pathname: '/',
          search: 'new=1'
        }}
        history={{
          push: jest.fn()
        }}
        {...props}
      />
    )

  const wrapper = shallowRenderer()

  test('toggleModal should delete "new" and "edit" params from query', () => {
    const spy = sinon.spy()
    const wrapper_ = shallowRenderer({
      history: { push: spy },
      location: { pathname: '/', search: '?new=1&edit=1' }
    })

    wrapper_.instance().toggleModal()

    expect(spy.calledOnce).toBe(true)
    expect(spy.args[0][0]).toEqual('/?') // removed "new" and "edit"
  })
})

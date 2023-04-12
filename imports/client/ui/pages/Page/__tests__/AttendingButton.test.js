import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import AttendingButton from '../AttendingButton'
/*
describe('<AttendingButton />', () => {
  const shallowRenerer = (props) => shallow(
    <AttendingButton
      _id='test id'
      history={{
        push: jest.fn()
      }}
      isLoggedIn={false}
      user={null}
      {...props}
    />
  )

  test('redirectToLogin', () => {
    const wrapper_ = shallowRenerer()
    const spy = sinon.spy(window.sessionStorage, 'setItem')
    const spy2 = sinon.spy(wrapper_.instance().props.history, 'push')

    wrapper_.instance().redirectToLogin()

    expect(spy.args[0][0]).toEqual('redirect', 'test id')
    expect(spy2.args[0][0]).toEqual('/sign-in')
  })
})
*/

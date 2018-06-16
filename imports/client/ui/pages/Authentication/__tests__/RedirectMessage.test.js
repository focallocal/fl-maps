import React from 'react'
import { shallow } from 'enzyme'
import RedirectMessage from '../RedirectMessage'

describe('<RedirectMessage />', () => {
  const shallowRenderer = props =>
    shallow(
      <RedirectMessage
        isSSO={false}
        redirect={false}
        {...props}
      />
    )

  it('should render a msg if redirect is true', () => {
    const wrapper_ = shallowRenderer({ redirect: true })

    expect(wrapper_.find('.redirect-msg').children().text()).toEqual('Please login to continue')
  })

  it('should render a msg if isSSO is true', () => {
    const wrapper_ = shallowRenderer({ isSSO: true })
    const msg = "You'll be redirected back to discourse after you login"

    expect(wrapper_.find('.redirect-msg').children().text()).toEqual(msg)
  })
})

import React from 'react'
import { Meteor } from 'meteor/meteor'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import qs from 'query-string'
import { Alert } from 'reactstrap'
import { Authentication } from '../index'
import PageLoader from '/imports/client/ui/components/PageLoader'

describe('<Authentication />', () => {
  const shallowRenderer = (props) =>
    shallow(
      <Authentication
        location={{
          pathname: '/',
          search: '/'
        }}
        {...props}
      />
    )

  const wrapper = shallowRenderer()

  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with default state', () => {
    expect(wrapper.state().loading).toEqual(false)
  })

  it('should set isSSO, loading + a sessionStorage item in the constructor when pathname is /sso_auth', () => {
    const spy = sinon.spy(sessionStorage, 'setItem')
    const location = {
      pathname: '/sso_auth',
      search: 'sso=abcdef&sig=ghiklmno'
    }
    const wrapper_ = shallowRenderer({
      location
    })

    expect(spy.calledOnce).toBe(true)
    expect(spy.calledWith('_sso', JSON.stringify(qs.parse(location.search)))).toEqual(true)
    expect(wrapper_.state().isSSO).toEqual(true)
    expect(wrapper_.state().loading).toEqual(false)
    spy.restore()
  })

  test('constructor should set loading true if sso and user is logged in', () => {
    const stub = sinon.stub(Meteor, 'userId').returns(true)
    const wrapper_ = shallowRenderer({
      location: {
        pathname: '/sso_auth',
        search: 'sso=abcdef&sig=ghiklmno'
      }
    })

    expect(wrapper_.state().loading).toEqual(true)
    stub.restore()
  })

  it('should render an alert message only if isSSO is true', () => {
    const wrapper_ = shallowRenderer({
      location: {
        pathname: '/sso_auth',
        search: 'sso=abcdef&sig=ghiklmno'
      }
    })

    expect(wrapper.find(Alert)).toHaveLength(0) // notice underscore after "wrapper"
    expect(wrapper_.find(Alert)).toHaveLength(1)
  })

  it('should render <PageLoader /> if loading is true', () => {
    const stub = sinon.stub(Meteor, 'userId').returns(true)
    const wrapper_ = shallowRenderer({
      location: {
        pathname: '/sso_auth',
        search: 'sso=abcdef&sig=ghiklmno'
      }
    })

    expect(wrapper_.find(PageLoader)).toHaveLength(1)
    stub.restore()
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Meteor } from 'meteor/meteor'
import { Col } from 'reactstrap'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import * as DOMInteractions from '/imports/client/utils/DOMInteractions'
import * as PageComponent from '../index'
import AttendingButton from '../AttendingButton'

const { Page } = PageComponent
describe('Page', () => {
  const fakeData = {
    address: {
      name: 'Location Test'
    },
    categories: [{ name: 'Category #1' }],
    organiser: {
      _id: ''
    },
    _id: '#testId'
  }

  let wrapper

  beforeEach(() => {
    window.cachedDataForPage = { ...fakeData }

    wrapper = shallowRenderer()
    wrapper.setState({ loaded: true })
  })

  const shallowRenderer = (props) =>
    shallow(
      <Page
        match={{ params: { id: '#1' } }}
        history={{ push: jest.fn() }}
        user={null}
        {...props}
      />
    )

  it('should store id from url', () => {
    expect(wrapper.state().id).toEqual('#1')
  })

  it('should store data from cache if exists', () => {
    const wrapper_ = shallowRenderer()

    expect(wrapper_.state().data).toEqual(window.cachedDataForPage)
  })

  it('should render a "header" element with title and sub-title', () => {
    expect(wrapper.find('.header')).toHaveLength(1)
    expect(wrapper.find('.title')).toHaveLength(1)
    expect(wrapper.find('.sub-title-categories')).toHaveLength(1)
  })

  it('should render a "body" container with two columns', () => {
    const body = wrapper.find('.body')

    expect(body.find(Col)).toHaveLength(2)
  })

  test('left column should render description', () => {
    const leftCol = wrapper.find('.body').find('.left')

    expect(leftCol.find('.description')).toHaveLength(1)
  })

  test('right colum should render datetime, location and an "attend" button', () => {
    const rightCol = wrapper.find('.body').find('.right')

    expect(rightCol.find(HoursFormatted)).toHaveLength(1)
    expect(rightCol.find('.location')).toHaveLength(1)
    expect(rightCol.find(AttendingButton)).toHaveLength(1)
  })

  test('AttendingButton props', () => {
    const instance = wrapper.instance()
    const btn = wrapper.find(AttendingButton)

    expect(btn.props()).toEqual({
      _id: '#testId',
      isLoggedIn: false,
      user: instance.props.user,
      history: instance.props.history
    })
  })

  test('clicking on "view map" should call scroll to map function', () => {
    const stub = sinon.stub(DOMInteractions, 'scrollToElement')

    wrapper.find('.view-map').simulate('click')
    expect(stub.calledWith('.embedded-map')).toEqual(true)
    stub.restore()
  })

  test('container should display a googlemaps iframe', () => {
    const body = wrapper.find('.body')

    expect(body.find('iframe.embedded-map')).toHaveLength(1)
  })

  test('should call Events.getEvent if no previous data on mounting', () => {
    window.cachedDataForPage = null
    const wrapper_ = shallowRenderer()
    const spy = sinon.spy(wrapper_.instance(), 'getEventData')
    const spy2 = jest.spyOn(Meteor, 'call')

    wrapper_.instance().componentDidMount()
    expect(spy.calledOnce).toBe(true)
    expect(spy2).toHaveBeenCalledWith('Events.getEvent', { id: wrapper_.state().id }, expect.any(Function))
  })

  test('if window.__updatedData is set, the cached state from the map should be updated with updated data', () => {
    window.__updatedData = { ...fakeData, _id: '#1', name: 'new data name' }
    window.previousStateOfMap = { events: [{ _id: '#1', name: 'data name' }] }
    const spy = sinon.spy(window, '__setDocumentTitle')

    shallowRenderer()

    expect(window.previousStateOfMap.events[0].name).toEqual('new data name')
    expect(spy.calledTwice).toEqual(true)
    spy.restore()
  })

  test('componentDidMount', () => {
    window.cachedDataForPage = null
    const wrapper_ = shallowRenderer()
    const spy = sinon.spy(wrapper_.instance(), 'getEventData')

    wrapper_.instance().componentDidMount()

    expect(spy.calledOnce).toEqual(true)
    spy.restore()
  })
})

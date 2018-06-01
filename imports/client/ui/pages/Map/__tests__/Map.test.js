import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import MarkerWrapper from '../MarkerWrapper'
import { MapComponent_ } from '../index'
import EventsList from '../EventsList'
import FiltersList from '../EventsFilter'
import mapOptions from '../mapOptions'

describe('<MapWrapper_ />', () => {
  afterEach(() => {
    document.querySelector('body').classList.remove('overflow')
  })

  const shallowRenderer = () =>
    shallow(
      <MapComponent_ />
    )
  const wrapper = shallowRenderer()

  test('defaults', () => {
    expect(wrapper.state()).toEqual({
      bounds: null,
      center: { lat: 46, lng: -43 },
      currentEvent: null,
      directions: null,
      error: null,
      events: [],
      filteredEvents: null,
      isFetching: true,
      showFilters: false,
      userLocation: null,
      zoom: 3
    })

    expect(wrapper.instance().memoizeLocations).toEqual({})
  })

  test('componentDidMount', () => {
    const wrapper_ = shallowRenderer()
    const spy = sinon.spy(wrapper_.instance(), 'callGetEvents')

    expect(document.querySelector('body').classList.contains('overflow')).toEqual(true)

    wrapper_.instance().componentDidMount()

    expect(wrapper_.instance()._isMounted).toEqual(true)
    expect(spy.calledOnce).toBe(true)
  })

  test('componentWillUnmount', () => {
    const wrapper_ = shallowRenderer()
    const spy = sinon.spy(window, 'clearInterval')
    const instance = wrapper_.instance()
    instance.interval = 'test_interval'

    wrapper_.unmount()

    expect(instance._isMounted).toEqual(false)
    expect(document.querySelector('body').classList.contains('overflow')).toEqual(false)
    expect(instance.interval).toEqual(null)
    expect(spy.calledWith('test_interval')).toBe(true)
  })

  test('<GoogleMap />', () => {
    const {
      center,
      zoom
    } = wrapper.state()

    const component = wrapper.find(GoogleMap)

    expect(component.prop('center')).toEqual(center)
    expect(component.prop('defaultZoom')).toEqual(zoom)
    expect(component.prop('zoom')).toEqual(zoom)
    expect(component.prop('defaultOptions')).toEqual(mapOptions())
    expect(component.prop('onZoomChanged')).toEqual(wrapper.instance().onZoomChanged)
  })

  test('<MarkerClusterer />', () => {
    const component = wrapper.find(MarkerClusterer)

    expect(component.prop('averageCenter')).toEqual(true)
    expect(component.prop('enableRetinaIcons')).toEqual(true)
    expect(component.prop('gridSize')).toEqual(60)
    expect(component.prop('maxZoom')).toEqual(20)
    expect(component.prop('onClick')).toEqual(wrapper.instance().onMarkerClustererClick)
  })

  test('<MarkerWrapper />', () => {
    const wrapper_ = shallowRenderer()
    // add one event so we can test MarkerWrapper
    const event = { _id: 'test-event', address: { location: { coordinates: [71, -43] } } }
    wrapper_.setState({ events: [event], currentEvent: 'test-event' })

    const component = wrapper_.find(MarkerWrapper)

    expect(component.prop('event')).toEqual(event)
    expect(component.prop('isCurrent')).toEqual(true)
    expect(component.prop('onMarkerClick')).toEqual(wrapper_.instance().onMarkerClick)
    expect(component.prop('position')).toEqual({ latLng: { lng: 71, lat: -43 } })
  })

  test('<FiltersList />', () => {
    const {
      events,
      showFilters
    } = wrapper.state()

    const component = wrapper.find(FiltersList)

    expect(component.prop('show')).toEqual(showFilters)
    expect(component.prop('events')).toEqual(events)
    expect(component.prop('onFilter')).toEqual(wrapper.instance().setFilteredEvents)
    expect(component.prop('toggleFiltersList')).toEqual(wrapper.instance().toggleFiltersList)
  })

  test('<EventsList />', () => {
    const {
      currentEvent,
      events,
      isFetching,
      userLocation
    } = wrapper.state()

    const {
      onMarkerClick,
      removeCurrentEvent,
      setDirections
    } = wrapper.instance()

    const component = wrapper.find(EventsList)

    expect(component.prop('currentEvent')).toEqual(currentEvent)
    expect(component.prop('events')).toEqual(events)
    expect(component.prop('isFetching')).toEqual(isFetching)
    expect(component.prop('userLocation')).toEqual(userLocation)
    expect(component.prop('onItemClick')).toEqual(onMarkerClick)
    expect(component.prop('removeCurrentEvent')).toEqual(removeCurrentEvent)
    expect(component.prop('onDirections')).toEqual(setDirections)
  })

  test('methods', () => {
    const methods = [
      'onMarkerClick', 'toggleFiltersList', 'setFilteredEvents', 'onMarkerClustererClick',
      'removeCurrentEvent', 'setDirections', 'setError', 'handleBounds', 'handlePlaces',
      'onZoomChanged', 'callGetEvents', 'getEvents'
    ]
    const instance = wrapper.instance()

    methods.forEach(method => {
      expect(typeof instance[method]).toEqual('function')
    })
  })
})

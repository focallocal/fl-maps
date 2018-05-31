import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import EventsList, { Loading, NoResults } from '../EventsList'
import EventsListItem from '../EventsList/EventsListItem'
import EventInfo from '../EventsList/EventInfo'
import MinimizeButton from '../EventsList/MinimizeButton'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import { ListGroup, Button } from 'reactstrap'
import { formatCategories, formatMilesFromLocation } from '/imports/client/utils/format'

let eventItem = {
  _id: '#1',
  address: {
    location: {
      coordinates: [70.6156, -41.5551]
    }
  },
  description: 'test description',
  categories: [{ name: 'test category', color: '#fff' }],
  name: 'test event',
  when: {}
}

describe('<EventsList />', () => {
  let ele

  beforeAll(() => {
    ele = document.createElement('div')
    ele.setAttribute('id', 'map-container')

    document.body.appendChild(ele)
  })

  afterAll(() => {
    document.body.removeChild(ele)
  })

  const shallowRender = (props) =>
    shallow(
      <EventsList
        events={[]}
        userLocation={{}}
        onDirections={() => {}}
        onFilter={() => {}}
        onItemClick={() => {}}
        currentEvent={null}
        removeCurrentEvent={() => {}}
        {...props}
      >
        <div>child</div>
      </EventsList>
    )

  const component = shallowRender()

  it('should render', () => {
    expect(component.exists()).toBe(true)
  })

  it('should render children inside the .header container', () => {
    expect(component.find('.header').children().at(0).text()).toEqual('child')
  })

  it('should render an empty <ListGroup /> if no events exists', () => {
    expect(component.state().events).toHaveLength(0)
    expect(component.find(ListGroup).children()).toHaveLength(0)
  })

  it('should render a <ListItem /> for each event', () => {
    const component_ = shallowRender({ events: [{}] })

    expect(component_.find(ListGroup).find(EventsListItem)).toHaveLength(1)
    expect(component_.find(ListGroup).children()).toHaveLength(1)
  })

  it('should render a loader only while searching for events', () => {
    const component_ = shallowRender({ isFetching: true })

    expect(component_.find(Loading).props().show).toEqual(true)
    component_.setState({ loading: false, noData: true })
    expect(component_.find(Loading).props().show).toEqual(false)
  })

  it('should display a message if could not find events', () => {
    const component_ = shallowRender()

    expect(component_.find(NoResults).props().show).toEqual(false)
    component_.setState({ noData: true, loading: false })
    expect(component_.find(NoResults).props().show).toEqual(true)
  })

  it('should display the <EventInfo /> component', () => {
    const wrapper_ = shallowRender({ events: [eventItem] })
    wrapper_.setProps({ currentEvent: '#1' })

    const component = wrapper_.find(EventInfo)
    expect(component).toHaveLength(1)
    expect(component.props()).toEqual({
      event: eventItem,
      onDirections: wrapper_.instance().props.onDirections,
      userLocation: {},
      returnToList: wrapper_.instance().returnToList
    })
  })

  test('MinimizeButton', () => {
    const wrapper_ = shallowRender()
    const btn = wrapper_.find(MinimizeButton)

    expect(ele.classList.contains('minimized')).toEqual(false)
    btn.prop('onMinimize')()
    expect(ele.classList.contains('minimized')).toEqual(true)
  })
})

describe('<EventsListItem />', () => {
  const shallowRender = (props) =>
    shallow(
      <EventsListItem
        item={eventItem}
        userLocation={null}
        onDirections={() => {}}
        onItemClick={() => {}}
        isCurrent={false}
        remove
        {...props}
      />
    )

  const component = shallowRender()

  it('should render a list item', () => {
    expect(component.find('.event-list-item')).toHaveLength(1)
  })

  it('should render the name of the event', () => {
    expect(component.find('.name').text()).toEqual('test event')
  })

  it('should render the categories and format them as text', () => {
    expect(component.find('.categories').text()).toEqual(formatCategories(eventItem.categories))
  })

  it('should display distance from event only if userLocation is provided', () => {
    expect(component.find('.distance').text()).toEqual('couldn\'t calculate distance to location')
  })

  it('should display distance if location is provided', () => {
    const component_ = shallowRender({ userLocation: { lat: 70.5, lng: -41.5 } })

    expect(component_.find('.distance').text()).toEqual('15122.5 miles away')
  })
})

describe('<EventInfo />', () => {
  const shallowRender = (props) =>
    shallow(
      <EventInfo
        event={eventItem}
        onDirections={() => {}}
        userLocation={{}}
        returnToList={() => {}}
        {...props}
      />
    )

  const wrapper = shallowRender()

  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should call returnToList when clicking on the icon inside the back button', () => {
    const spy = sinon.spy()
    const wrapper_ = shallowRender({ returnToList: spy })

    wrapper_.find('.back-btn i.fa-long-arrow-alt-left').simulate('click')
    expect(spy.calledOnce).toEqual(true)
  })

  test('first section', () => {
    const wrapper_ = wrapper.find('.first-section')
    const categories = formatCategories(eventItem.categories)
    const distance = formatMilesFromLocation({}, eventItem.address.location.coordinates)

    expect(wrapper_.find('.title').text()).toEqual(eventItem.name)
    expect(wrapper_.find('.categories').text()).toEqual(categories)
    expect(wrapper_.find('.distance').text()).toEqual(distance)
    expect(wrapper_.find(Button).render().text()).toEqual('Get Directions')
  })

  test('second section', () => {
    const wrapper_ = wrapper.find('.second-section')

    expect(wrapper_.find('.title').text()).toEqual('Date and Time')
    expect(wrapper_.find(HoursFormatted).props().data).toEqual(eventItem.when)
  })

  test('third section', () => {
    const wrapper_ = wrapper.find('.third-section')

    expect(wrapper_.find('.title').text()).toEqual('About')
    expect(wrapper_.find('.description').text()).toEqual(eventItem.description)
  })
})

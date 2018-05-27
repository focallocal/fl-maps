import React from 'react'
import { shallow } from 'enzyme'
import EventsList from '../EventsList'
import EventsListItem from '../EventsList/EventsListItem'
import { ListGroup } from 'reactstrap'
import { formatCategories } from '/imports/client/utils/format'

describe('<EventsList />', () => {
  const shallowRender = (props) =>
    shallow(
      <EventsList
        events={[]}
        userLocation={{}}
        onFilter={() => {}}
        toggleInfoWindow={() => {}}
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

    expect(component_.find('.loader')).toHaveLength(1)
    component_.setState({ loading: false, noData: true })
    expect(component_.find('.loader')).toHaveLength(0)
  })

  it('should display a message if could not find events', () => {
    const component_ = shallowRender()

    expect(component_.find('.no-near-events')).toHaveLength(0)
    component_.setState({ noData: true, loading: false })
    expect(component_.find('.no-near-events')).toHaveLength(1)
  })
})

describe('<EventsListItem />', () => {
  const eventItem = {
    name: 'test event',
    categories: [{ name: 'test category', color: '#fff' }],
    address: {
      location: {
        coordinates: [70.6156, -41.5551]
      }
    }
  }

  const shallowRender = (props) =>
    shallow(
      <EventsListItem
        item={eventItem}
        userLocation={null}
        onItemClick={() => {}}
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

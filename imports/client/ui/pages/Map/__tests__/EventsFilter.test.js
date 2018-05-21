import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import EventsFilter from '../EventsFilter'
import FiltersList from '../EventsFilter/FiltersList'
import { Tooltip, ListGroup, ListGroupItem } from 'reactstrap'
// import { generateFakeEvents } from '/tests/ui-tests/helpers/fakeData'
import categories from '/imports/both/collections/events/helpers/possibleCategories.json'

describe('<EventsFilter />', () => {
  const component = shallow(
    <EventsFilter
      events={[]}
      onFiltersChanged={() => {}}
    />
  )

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render a filter button', () => {
    expect(component.find('#filter-button')).toHaveLength(1)
  })

  it('should render a tooltip for the filter button', () => {
    expect(component.find(Tooltip).props().target).toEqual('filter-button')
  })

  it('should render a FiltersList component', () => {
    expect(component.find(FiltersList)).toHaveLength(1)
  })
})

describe('<EventsFilter /> actions', () => {
  let component
  let spy

  beforeAll(() => {
    // # see https://github.com/reactstrap/reactstrap/issues/738
    const tooltipContainer = document.createElement('div')
    tooltipContainer.setAttribute('id', 'filter-button')
    document.body.appendChild(tooltipContainer)

    spy = sinon.spy()
    component = mount(
      <EventsFilter
        events={[]}
        onFiltersChanged={spy}
      />,
      { attachTo: tooltipContainer }
    )
  })

  afterAll(() => {
    component = null
    spy = null
  })

  it('should hide the list upon mounting', () => {
    expect(component.find('#filters-list').props().style.display).toEqual('none')
  })

  it('should show the list after clicking on the filter-button', () => {
    component.find('#filter-button').at(1).simulate('click')
    expect(component.find('#filters-list').props().style.display).toEqual('')
  })

  it('should apply filters and pass updated events array to parent', () => {
    const instance = component.instance()

    instance.applyFilters([categories[0]])
    expect(spy.calledOnce).toBeTruthy()
  })
})

describe('<FiltersList />', () => {
  const component = shallow(
    <FiltersList
      show={false}
      onChange={() => {}}
    />
  )

  it('should generate a "checkedFilters" array with "true" values upon mounting', () => {
    expect(component.state().checkedFilters).toEqual(Array(categories.length).fill(true))
  })

  it('should render a list of all possible categories + a title item', () => {
    expect(component.find(ListGroup).children()).toHaveLength(categories.length + 1)
  })

  it('should render title, close icon and toggle checkbox inside the first item in the list', () => {
    const firstItem = component.find(ListGroupItem).at(0)

    expect(firstItem.find('div')).toHaveLength(1)
    expect(firstItem.find('.close')).toHaveLength(1)
    expect(firstItem.find('#toggle-all')).toHaveLength(1)
  })

  it('should map "true" indexes to categories with mapIndexToCategory', () => {
    const instance = component.instance()

    expect(instance.mapIndexToCategory([true])).toEqual([categories[0]])
    expect(instance.mapIndexToCategory([true, false, false])).toEqual([categories[0]])
    expect(instance.mapIndexToCategory([false, true])).toEqual([categories[1]])
  })
})

describe('<FiltersList /> actions', () => {
  const component = mount(
    <FiltersList
      show={false}
      onChange={() => {}}
    />
  )

  it('toggle all filters', () => {
    expect(component.state().checkedFilters).toEqual(Array(categories.length).fill(true))
    component.instance().toggleAllFilters()
    expect(component.state().checkedFilters).toEqual(Array(categories.length).fill(false))
    component.instance().toggleAllFilters()
  })

  it('toggle specific filter', () => {
    component.instance().handleFilterChange({ target: { id: 'filter-0' } })
    expect(component.state().checkedFilters[0]).toEqual(false)
    component.instance().handleFilterChange({ target: { id: 'filter-0' } })
    expect(component.state().checkedFilters[0]).toEqual(true)
  })

  it('should pass updated filters up to parent', () => {
    const spy = sinon.spy()
    const component_ = mount(<FiltersList show={false} onChange={spy} />)

    component_.instance().handleFilterChange({ target: { id: 'filter-0' } })
    component_.instance().toggleAllFilters()
    expect(spy.calledTwice).toBeTruthy()
  })
})

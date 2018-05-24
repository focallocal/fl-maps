import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import EventsFilter from '../EventsFilter'
import { ListGroup, ListGroupItem, CustomInput } from 'reactstrap'
import categories from '/imports/both/collections/events/helpers/possibleCategories.json'
import i18n from '/imports/both/i18n/en'

describe('<EventsFilter />', () => {
  const shallowRender = (props) =>
    shallow(
      <EventsFilter
        show={false}
        events={[]}
        onFilter={() => {}}
        toggleFiltersList={() => {}}
        {...props}
      />
    )

  const component = shallowRender()

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should add a "show" class to container based on props', () => {
    expect(component.find('.show')).toHaveLength(0)

    const componentWithShow = shallowRender({ show: true })
    expect(componentWithShow.find('.show')).toHaveLength(1)
  })

  it('should render a <ListGroup />', () => {
    expect(component.find('#filters-list').find(ListGroup)).toHaveLength(1)
  })

  it('should the first <ListGroupItem /> as a title', () => {
    expect(component.find(ListGroupItem).at(0).props().className).toEqual('title')
  })

  it('should render the title from i18n', () => {
    const title = component.find('.title').children().at(0)

    expect(title.find('div').at(0).text()).toEqual(i18n.Map.filtersTitle)
  })

  it('should render a "close" icon inside the title that calls toggleFiltersList on click', () => {
    const spy = sinon.spy()
    const component_ = shallowRender({ show: true, toggleFiltersList: spy })
    const close = component_.find('.title .close')

    expect(close).toHaveLength(1)
    close.simulate('click')
    expect(spy.calledOnce).toBe(true)
  })

  it('should check all categories by default', () => {
    expect(component.state().checkedFilters).toEqual(Array(categories.length).fill(true))
  })

  it('clicking on checkbox toggleAllFilters should toggle all filters', () => {
    const component_ = shallowRender()

    expect(component_.find(CustomInput).at(0).props().id).toEqual('toggle-all')
    component_.find(CustomInput).at(0).simulate('change')
    expect(component_.state().checkedFilters).toEqual(Array(categories.length).fill(false))
  })

  it('should render a <ListGroupItem /> for each category', () => {
    const component_ = shallowRender()

    expect(component_.find('.categories-items').find(ListGroupItem)).toHaveLength(categories.length)
  })

  it('clicking on an item checkbox should toggle it and remove it from filters array', () => {
    const component_ = shallowRender()

    const checkbox = component_.find('.categories-items').find(ListGroupItem).at(0).find(CustomInput)

    expect(component_.state().checkedFilters[0]).toEqual(true)
    checkbox.simulate('change', { target: { id: checkbox.props().id } })
    expect(component_.state().checkedFilters[0]).toEqual(false)
  })
})

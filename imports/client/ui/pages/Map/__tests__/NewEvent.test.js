import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Modal } from 'reactstrap'
import NewEvent, { queryStringToOpenModal, queryStringToCloseModal } from '../NewEvent'

describe('<NewEvent />', () => {
  // Mount helper
  const mountComponent = (initialEntries) => (
    mount(
      <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
        <NewEvent />
      </MemoryRouter>
    )
  )

  const component = mountComponent()

  it('should render', () => {
    expect(component.find(NewEvent).exists()).toBeTruthy()
  })

  it('should render a circle button with a plus icon', () => {
    const button = component.find('.btn.circle')
    const icon = '.fa-plus'

    expect(button).toHaveLength(1)
    expect(button.find(icon)).toHaveLength(1)
  })

  it('should render not render NewEventModal if not on /map route', () => {
    expect(component.find(Modal)).toHaveLength(0)
  })

  it('should show NewEventModal if /map route and querystring new=1', () => {
    const component_ = mountComponent(['/map?new=1'])

    expect(component_.find(Modal).at(0).props().isOpen).toBeTruthy()
  })

  it('should hide NewEventModal if /map route and querystring new=0', () => {
    const component_ = mountComponent(['/map?new=0'])

    expect(component_.find(Modal).at(0).props().isOpen).toBeFalsy()
  })

  test('querystrings that controls the modal state', () => {
    /* This test ensures that nobody is changing those values without noticing */
    const qsOpen = '?new=1'
    const qsClose = '?new=0'

    expect(queryStringToOpenModal).toBe(qsOpen)
    expect(queryStringToCloseModal).toBe(qsClose)
  })
})

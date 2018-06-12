import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Nav } from 'reactstrap'
import Sidebar from '../Sidebar'
import LinkItem from '../LinkItem'
import Logo from '../Logo'
import i18n from '/imports/both/i18n/en'

describe('<Sidebar />', () => {
  const shallowRenderer = props =>
    shallow(
      <Sidebar
        isOpen={false}
        i18nFile={i18n.MainMenu}
        toggle={() => {}}
        {...props}
      />
    )

  const wrapper = shallowRenderer()

  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should toggle a "--open" and "--show" classes for sidebar and backdrop if "isOpen" is true', () => {
    const wrapper_ = shallowRenderer()

    expect(wrapper_.find('#sidebar').props().className).toEqual('')
    expect(wrapper_.find('#sidebar-backdrop').props().className).toEqual('')
    wrapper_.setProps({ isOpen: true })
    expect(wrapper_.find('#sidebar').props().className).toEqual('--open')
    expect(wrapper_.find('#sidebar-backdrop').props().className).toEqual('--show')
  })

  it('should render a header with bars icon and logo', () => {
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('header').find('.fa-bars')).toHaveLength(1)
    expect(wrapper.find(Logo)).toHaveLength(1)
  })

  it('should render a <Nav /> with items from i18n file', () => {
    const wrapper_ = wrapper.find(Nav).find('.items-from-i18n')

    expect(wrapper_.exists()).toBe(true)
    expect(wrapper_.children()).toHaveLength(i18n.MainMenu.leftLinks.length)
  })

  it('should (un)set an event listener on (un)mounting with "toggleSidebarFromOutside"', () => {
    const spy = jest.spyOn(document, 'addEventListener')
    const spy2 = jest.spyOn(document, 'removeEventListener')
    const wrapper_ = shallowRenderer()
    const toggleSidebarFromOutside = wrapper_.instance().toggleSidebarFromOutside

    expect(spy).toBeCalledWith('click', toggleSidebarFromOutside)
    wrapper_.unmount()
    expect(spy2).toBeCalledWith('click', toggleSidebarFromOutside)

    spy.mockRestore()
    spy2.mockRestore()
  })

  test('"toggleSidebarFromOutside" should call props.toggle if target is sidebar-backdrop', () => {
    const spy = sinon.spy()
    const wrapper_ = shallowRenderer({
      toggle: spy
    })

    wrapper_.instance().toggleSidebarFromOutside({ target: { id: 'sidebar-backdrop' } })
    expect(spy.calledOnce).toBe(true)
  })
})

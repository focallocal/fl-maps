import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Nav } from 'reactstrap'
import Category from '../Sidebar/Category'
import LinkItem from '../LinkItem'

describe('<Category />', () => {
  const shallowRenderer = props =>
    shallow(
      <Category
        item={{ title: 'test-category', content: [] }}
        {...props}
      />
    )

  const wrapper = shallowRenderer()

  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should render inside a <li> element', () => {
    expect(wrapper.type()).toEqual('li')
  })

  it('should render a divider', () => {
    expect(wrapper.find('.divider')).toHaveLength(1)
  })

  it('should render a vertical <Nav />', () => {
    expect(wrapper.find(Nav).props().vertical).toEqual(true)
  })

  it('should render a title inside the Nav', () => {
    expect(wrapper.find(Nav).find('.title').text()).toEqual('test-category')
  })

  it('should render <LinkItem /> for each entry in the content key of the rendered item', () => {
    const content = [{
      title: 'test-title'
    }]
    const wrapper_ = shallowRenderer({ item: { title: '', content } })

    expect(wrapper_.find(LinkItem).props().item.title).toEqual(content[0].title)
  })
})

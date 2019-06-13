import React from 'react'
import { shallow, mount } from 'enzyme'
import EventsDisplay from '../EventsDisplay/index'
import LinkEvents from './../EventsDisplay/LinkEvents'

describe("<EventsDisplay/>", () => {
  const categoryOne = "Visit";
  const categoryTwo = "Food";
  const organiserOne = { _id: "A1234", name: "RR@gmail.com"};
  const organiserTwo = { _id: "9876B", name: "Org Two" };

  const events = [{
    _id: "GKnfyoGCYCGXAB9rR",
    organiser: organiserOne,
    name: "Breakfast service",
    categories: [{ name: categoryOne }, { name: categoryTwo }],
  },
    {
      _id: "5432yoGCYCGXABCDT",
      organiser: organiserOne,
      name: "Helping Hand",
      categories: [{ name: categoryOne }],
    }
 ]

  const wrapper = mount(<EventsDisplay
    deleteAllEvents={() => { return null }}

    userEvents={[]}

    isAllEvents= {false}
  />)
  wrapper.setProps({ userEvents: events})

  wrapper.find('#category-select').simulate('change', {
    target: { value: "categoryOne" }
  })

  it('should render Events', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should change allPosibleCategories state to array returned from getCatagoriesInitializeEvents', ()=>{
    expect(wrapper.state("allPosibleCategories")).toEqual(["All", categoryOne, categoryTwo])
  })

  it('should display correct categories for chosen events', ()=> {
    expect(wrapper.find('#category-select').exists()).toEqual(true)
     expect(wrapper.find(`option[value='${categoryOne}']`).text()).toEqual(categoryOne)
  })

  it('should render render Link Events when isAllEvents prop equals true', ()=> {
    wrapper.setProps({ userEvents: events, isAllEvents: true })
  expect(wrapper.find(LinkEvents).exists()).toEqual(true);
  })
})

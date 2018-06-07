import React from 'react'
import { shallow } from 'enzyme'
import Home from '../index'
import FirstSection from '../FirstSection'
import SecondSection from '../SecondSection'
// import ThirdSection from '../ThirdSection'
// import FourthSection from '../FourthSection'
// import FifthSection from '../FifthSection'

describe('<Home />', () => {
  const component = shallow(<Home />)

  it('should render', () => {
    expect(component.exists()).toBeTruthy()
  })

  it('should render all sections', () => {
    expect(component.find(FirstSection)).toHaveLength(1)
    expect(component.find(SecondSection)).toHaveLength(1)
    // expect(component.find(ThirdSection)).toHaveLength(1)
    // expect(component.find(FourthSection)).toHaveLength(1)
    // expect(component.find(FifthSection)).toHaveLength(1)
  })
})

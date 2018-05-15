import React from 'react'
import { shallow } from 'enzyme'
import App from './app.js'

test('<App /> should render', () => {
  const app = shallow(<App />)

  expect(app.exists()).toBe(true)
})

import React from 'react'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

const ThirdStep = ({ show }) => (
  <div id='second-step'>
    <AutoField name='overview' />
    <AutoField name='description' />
    <AutoField name='findHints' />
    <AutoField name='engagement.limit' />
  </div>
)

export default ThirdStep

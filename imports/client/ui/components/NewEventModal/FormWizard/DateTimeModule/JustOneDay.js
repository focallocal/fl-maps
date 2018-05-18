import React from 'react'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

const JustOneDay = ({ show }) => (
  <div style={{ display: show ? 'block' : 'none' }}>
    <AutoField name='when.oneDay.startingDate' />
    <div className='inline-inputs'>
      <AutoField name='when.oneDay.startingTime' />
      <AutoField name='when.oneDay.endingTime' />
    </div>
  </div>
)

export default JustOneDay

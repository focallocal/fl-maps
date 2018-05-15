import React, { Fragment } from 'react'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

const FirstStep = () => (
  <Fragment>

    <AutoField name='name' />
    <AutoField name='address' />
    <AutoField name='categories' />

    <div className='inline-inputs'>
      <AutoField name='startingDate' />
      <AutoField name='startingTime' />
    </div>

    <div className='inline-inputs'>
      <AutoField name='endingDate' />
      <AutoField name='endingTime' />
    </div>

  </Fragment>
)

export default FirstStep

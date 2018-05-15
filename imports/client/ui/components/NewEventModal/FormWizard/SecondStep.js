import React, { Fragment } from 'react'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

const SecondStep = () => (
  <Fragment>

    <AutoField name='overview' />
    <AutoField name='description' />
    <AutoField name='findHints' />
    <AutoField name='engagement.limit' />

  </Fragment>
)

export default SecondStep

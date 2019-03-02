import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import ErrorField from '/imports/client/utils/uniforms-custom/ErrorField'
import { CustomInput } from 'reactstrap'
import Weekly from './Weekly'
import Monthly from './Monthly'
import './styles.scss'

class Recurring extends Component {
  state = {
    forever: true
  }

  render () {
    const {
      form
    } = this.props

    const model = form.getModel()
    let {
      recurring
    } = model.when

    // NOTE: If this was previously a one-time event, being changed to recurring...
    // ...then 'recurring' ibject is null, so we re-initialise:
    if (!recurring) recurring = {}

    let forever = recurring.forever
    let monthly = recurring.monthly
    let startingDate = model.when.startingDate || new Date()
    let selectedDays = recurring.days || []
    let type = recurring.type
    let occurences = recurring.occurences

    const CheckBox = this.CheckBox

    return (
      <div id='recurring'>

        <div className='every-type inline-inputs hide-labels'>
          <span>Repeat every</span>
          <div>
            <AutoField name='when.recurring.every' />
            <AutoField name='when.recurring.type' />
          </div>
        </div>
        {type === 'week' && (
          <Fragment>
            <ErrorField name='when.recurring.days' errorMessage='Please select at least 1 day' />
            <Weekly
              form={form}
              selectedDays={selectedDays}
              schemaKey='when.recurring.days'
            />
          </Fragment>
        )}
        {type === 'month' &&
          <Monthly
            form={form}
            startingDate={startingDate}
            monthly={monthly}
          />
        }

        <CheckBox
          id='forever'
          label='Repeat forever'
          checked={forever}
        />
        {!forever && (
          <div className='occurences-until inline-inputs hide-labels'>
            <div>
              <span>Repeat for</span>
              <AutoField name='when.recurring.occurences' />
              <span>occurence{occurences > 1 ? 's' : ''}</span>
            </div>
            <div>
              <span> or until</span>
              <AutoField name='when.recurring.until' />
            </div>
          </div>
        )}
      </div>
    )
  }

  CheckBox = ({ label, id, checked }) => (
    <CustomInput
      id={id}
      className='checkbox'
      type='checkbox'
      label={label}
      checked={checked}
      onChange={() => this.handleCheckbox(!checked)}
    />
  )

  handleCheckbox = (checked) => {
    this.props.form.change(`when.recurring.forever`, checked)
  }
}

Recurring.propTypes = {
  form: PropTypes.object.isRequired
}

export default Recurring

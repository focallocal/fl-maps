import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { CustomInput, Input } from 'reactstrap'
import Monthly from './Monthly'
import './styles.scss'
import Weekly from './Weekly'

class Recurring extends Component {
  state = {
    forever: true,
    every: this.props.form.getModel().when?.recurring?.every ?? '',
    type: this.props.form.getModel().when?.recurring?.type ?? ''
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

    let forever = recurring.forever ?? false
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
            {/*<Input
              type="number"
              name="when.recurring.every"
              value={recurring.every || ''}
              onChange={(e) => form.change('when.recurring.every', parseInt(e.target.value))}
            />*/}
            <Input
              type="number"
              name="when.recurring.every"
              value={this.state.every}
              onChange={this.handleEveryChange}
            />
            {/*<Input
              type="select"
              name="when.recurring.type"
              value={recurring.type || ''}
              onChange={(e) => form.change('when.recurring.type', e.target.value)}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </Input>*/}

            <Input
              type="select"
              name="when.recurring.type"
              value={this.state.recurringType}
              onChange={this.handleTypeChange}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </Input>
          </div>
        </div>

        {this.state.recurringType === 'week' && (
          <Fragment>
            {selectedDays.length === 0 && (
              <div className="error-message">Please select at least 1 day</div>
            )}
            <Weekly
              form={form}
              selectedDays={selectedDays}
              schemaKey='when.recurring.days'
            />
          </Fragment>
        )}

        {this.state.recurringType === 'month' &&
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
              <Input
                type="number"
                name="when.recurring.occurences"
                value={recurring.occurences || ''}
                onChange={(e) => form.change('when.recurring.occurences', parseInt(e.target.value))}
              />
              <span>occurence{occurences > 1 ? 's' : ''}</span>
            </div>
            <div>
              <span> or until</span>
              <Input
                type="date"
                name="when.recurring.until"
                value={recurring.until || ''}
                onChange={(e) => form.change('when.recurring.until', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  handleEveryChange = (e) => {
    const value = parseInt(e.target.value, 10) || ''
    this.setState({ every: value })
    this.props.form.change('when.recurring.every', value)
  }

  handleTypeChange = (e) => {
    const value = e.target.value
    this.setState({ recurringType: value })
    this.props.form.change('when.recurring.type', value)
  }

  CheckBox = ({ label, id, checked }) => (
    <div>
      <span>{label}</span>
      <Input
        id={id}
        className='checkbox'
        type='checkbox'
        label={label}
        defaultChecked={false}
        onChange={(e) => 
          this.handleCheckbox(e.target.checked)
        }
      />
    </div>
  )

  handleCheckbox = (checked) => {
    this.props.form.change(`when.recurring.forever`, checked)
  }
}

Recurring.propTypes = {
  form: PropTypes.object.isRequired
}

export default Recurring

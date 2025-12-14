import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Input } from 'reactstrap'
import Monthly from './Monthly'
import Yearly from './Yearly'
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
        {/* Repeat forever toggle at top for form type 1 */}
        {this.props.formType === 1 && (
          <CheckBox
            id='forever'
            label='Repeat forever'
            checked={forever}
          />
        )}

        <div className='every-type inline-inputs hide-labels'>
          <span>Repeat every</span>
          <div>
            <Input
              type="number"
              name="when.recurring.every"
              value={this.state.every}
              onChange={this.handleEveryChange}
            />

            <Input
              type="select"
              name="when.recurring.type"
              value={this.state.recurringType}
              onChange={this.handleTypeChange}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
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
              initialSelectedDays={selectedDays}
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

        {this.state.recurringType === 'year' &&
          <Yearly
            form={form}
            startingDate={startingDate}
            yearly={recurring.yearly}
          />
        }

        {!forever && this.props.formType === 1 && (
          <div className='occurences-until inline-inputs hide-labels'>
            <span>Repeat for</span>
            <Input
              type="number"
              name="when.recurring.occurences"
              value={recurring.occurences || ''}
              onChange={(e) => this.handleOccurencesChange(parseInt(e.target.value))}
            />
            <span>occurence{occurences > 1 ? 's' : ''}</span>
            <span className='or-separator'>or until</span>
            <Input
              type="date"
              name="when.recurring.until"
              value={recurring.until || ''}
              onChange={(e) => this.handleUntilChange(e.target.value)}
            />
          </div>
        )}
      </div>
    )
  }

  handleEveryChange = (e) => {
    const value = parseInt(e.target.value, 10) || ''
    this.setState({ every: value })
    // Update the entire 'when' object since form.change doesn't handle nested paths
    const currentWhen = this.props.form.getModel().when || {}
    const updatedWhen = { 
      ...currentWhen, 
      recurring: { ...currentWhen.recurring, every: value }
    }
    this.props.form.change('when', updatedWhen)
  }

  handleTypeChange = (e) => {
    const value = e.target.value
    this.setState({ recurringType: value })
    // Update the entire 'when' object since form.change doesn't handle nested paths
    const currentWhen = this.props.form.getModel().when || {}
    const updatedWhen = { 
      ...currentWhen, 
      recurring: { ...currentWhen.recurring, type: value }
    }
    this.props.form.change('when', updatedWhen)
  }

  CheckBox = ({ label, id, checked }) => (
    <div>
      <span>{label}</span>
      <Input
        id={id}
        className='checkbox'
        type='checkbox'
        label={label}
        checked={checked}
        onChange={(e) => 
          this.handleCheckbox(e.target.checked)
        }
      />
    </div>
  )

  handleCheckbox = (checked) => {
    // Update the entire 'when' object since form.change doesn't handle nested paths
    // This only toggles the recurrence forever flag - it means "repeat indefinitely"
    // NOT the same as the 99-year permanent marker for forms 2/3
    const currentWhen = this.props.form.getModel().when || {}
    const updatedWhen = { 
      ...currentWhen, 
      recurring: { ...currentWhen.recurring, forever: checked }
    }
    
    this.props.form.change('when', updatedWhen)
  }

  handleOccurencesChange = (value) => {
    const currentWhen = this.props.form.getModel().when || {}
    const updatedWhen = { 
      ...currentWhen, 
      recurring: { ...currentWhen.recurring, occurences: value, until: '' }
    }
    this.props.form.change('when', updatedWhen)
  }

  handleUntilChange = (value) => {
    const currentWhen = this.props.form.getModel().when || {}
    const updatedWhen = { 
      ...currentWhen, 
      recurring: { ...currentWhen.recurring, until: value, occurences: '' }
    }
    this.props.form.change('when', updatedWhen)
  }
}

Recurring.propTypes = {
  form: PropTypes.object.isRequired,
  formType: PropTypes.number
}

Recurring.defaultProps = {
  formType: 1
}

export default Recurring

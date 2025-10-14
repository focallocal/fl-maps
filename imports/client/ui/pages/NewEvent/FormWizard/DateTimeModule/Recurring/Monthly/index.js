import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { determinePosition } from '/imports/both/collections/events/helpers'

function getOrdinalIndicator (dayInMonth) {
  if (dayInMonth > 3 && dayInMonth < 21) return `${dayInMonth}th`
  switch (dayInMonth % 10) {
    case 1: return `${dayInMonth}st`
    case 2: return `${dayInMonth}nd`
    case 3: return `${dayInMonth}rd`
    default: return `${dayInMonth}th`
  }
}

const weekdaysMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

// Helper to make sure we always work with a Date instance
function toDate (d) {
  if (!d) return null
  if (d instanceof Date) return isNaN(d.getTime()) ? null : d
  const parsed = new Date(d)
  return isNaN(parsed.getTime()) ? null : parsed
}

class RecurrMonthly extends Component {
  constructor(props) {
    super(props)

    const date = toDate(props.startingDate)
    const options = this.getOptionsFromDate(date)
    const monthly = props.monthly || {}
    const currentValue = options.find(opt => opt.value === monthly.type) || options[0]

    this.state = {
      options,
      selectedOption: currentValue
    }
  }

  componentDidUpdate(prevProps) {
    // if startingDate changed, regenerate options and keep UI consistent
    if (prevProps.startingDate !== this.props.startingDate) {
      const date = toDate(this.props.startingDate)
      const options = this.getOptionsFromDate(date)
      // pick corresponding option (or fallback to first)
      const monthlyType = this.props.monthly?.type
      const currentValue = options.find(opt => opt.value === monthlyType) || options[0]
      this.setState({ options, selectedOption: currentValue })
    }

    // if monthly prop changed externally, sync selectedOption
    if (prevProps.monthly !== this.props.monthly) {
      const date = toDate(this.props.startingDate)
      const options = this.getOptionsFromDate(date)
      const currentValue = options.find(opt => opt.value === this.props.monthly?.type) || options[0]
      if (currentValue.value !== this.state.selectedOption.value) {
        this.setState({ selectedOption: currentValue })
      }
    }
  }

  handleChange = (selectedOption) => {
    const { form, startingDate } = this.props
    const date = toDate(startingDate)

    if (!date) {
      console.warn('RecurrMonthly: invalid startingDate', startingDate)
      // still update UI
      this.setState({ selectedOption })
      return
    }

    const { value } = selectedOption
    const dayInMonth = date.getDate()

    let finalValue
    if (value === 'byDayInMonth') {
      finalValue = dayInMonth
    } else {
      finalValue = determinePosition(dayInMonth)[0] // your original logic
    }

    // Update UI immediately
    this.setState({ selectedOption })

    // Update form model
    if (typeof form?.change === 'function') {
      // store the full recurring.monthly object like your schema expects
      form.change('when.recurring.monthly', { type: value, value: finalValue })
    } else {
      console.warn('RecurrMonthly: form.change is not a function', form)
    }
  }

  getOptionsFromDate = (date) => {
    // If date is invalid, return two safe fallback options with placeholders
    if (!date) {
      return [
        { value: 'byDayInMonth', label: 'Monthly on day —' },
        { value: 'byPosition', label: 'Monthly on the — —' }
      ]
    }

    const dayInMonth = date.getDate()
    const position = determinePosition(dayInMonth)
    return [
      { value: 'byDayInMonth', label: `Monthly on day ${dayInMonth}` },
      { value: 'byPosition', label: `Monthly on the ${position} ${weekdaysMap[date.getDay()]}` }
    ]
  }

  render() {
    const { options, selectedOption } = this.state

    return (
      <div id='recurr-monthly'>
        <Select
          value={selectedOption}
          options={options}
          onChange={this.handleChange}
          isSearchable={false}
        />
      </div>
    )
  }
}

RecurrMonthly.propTypes = {
  form: PropTypes.object.isRequired,
  startingDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  monthly: PropTypes.object
}

export default RecurrMonthly

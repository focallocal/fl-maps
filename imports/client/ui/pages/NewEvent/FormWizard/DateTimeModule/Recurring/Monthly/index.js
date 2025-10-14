import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { determinePosition } from '/imports/both/collections/events/helpers'

const weekdaysMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

function toDate(input) {
  if (!input) return null
  if (input instanceof Date) return input
  const d = new Date(input)
  return isNaN(d.getTime()) ? null : d
}

export default function RecurrMonthly({ form, startingDate, monthly = {} }) {
  const date = useMemo(() => toDate(startingDate), [startingDate])

  const options = useMemo(() => {
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
  }, [date])

  const [selectedOption, setSelectedOption] = useState(
    options.find(opt => opt.value === monthly.type) || options[0]
  )

  // If `monthly` changes from outside (form reset or prefill)
  useEffect(() => {
    if (monthly?.type) {
      const match = options.find(opt => opt.value === monthly.type)
      if (match) setSelectedOption(match)
    }
  }, [monthly, options])

  const handleChange = (option) => {
    setSelectedOption(option)

    const value = option.value
    if (!date) return

    const dayInMonth = date.getDate()
    const finalValue =
      value === 'byDayInMonth'
        ? dayInMonth
        : determinePosition(dayInMonth)[0]

    // Push update into the form model
    if (typeof form?.change === 'function') {
      form.change('when.recurring.monthly', { type: value, value: finalValue })
    }

    console.log('Changed monthly recurrence →', { value, finalValue })
  }

  return (
    <div id='recurr-monthly'>
      <Select
        value={selectedOption}
        options={options}
        onChange={handleChange}
        isSearchable={false}
      />
    </div>
  )
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

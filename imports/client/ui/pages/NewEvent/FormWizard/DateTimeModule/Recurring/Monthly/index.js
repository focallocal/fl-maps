import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

const weekdaysMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

const positionLabels = ['1st', '2nd', '3rd', '4th', '5th']

function toDate(input) {
  if (!input) return null
  if (input instanceof Date) return input
  const d = new Date(input)
  return isNaN(d.getTime()) ? null : d
}

export default function RecurrMonthly({ form, startingDate, monthly = {} }) {
  const date = useMemo(() => toDate(startingDate), [startingDate])
  const weekdayFromDate = date?.getDay() ?? 5

  const [selectedWeekday, setSelectedWeekday] = useState(monthly.weekday ?? weekdayFromDate)
  const [selectedPosition, setSelectedPosition] = useState(monthly.position ?? 1)

  // If `monthly` changes from outside (form reset or prefill)
  useEffect(() => {
    if (monthly?.weekday !== undefined) setSelectedWeekday(monthly.weekday)
    if (monthly?.position !== undefined) setSelectedPosition(monthly.position)
  }, [monthly])

  // Initialize on mount
  useEffect(() => {
    updateMonthly({
      type: 'byPosition',
      weekday: selectedWeekday,
      position: selectedPosition
    })
  }, [])

  // Helper to update when.recurring.monthly properly
  const updateMonthly = (monthlyData) => {
    if (typeof form?.change === 'function') {
      const model = form.getModel ? form.getModel() : {}
      const when = model.when || {}
      const recurring = when.recurring || {}
      const updatedWhen = {
        ...when,
        recurring: {
          ...recurring,
          monthly: monthlyData
        }
      }
      form.change('when', updatedWhen)
    }
  }

  const handleWeekdayChange = (e) => {
    const weekday = parseInt(e.target.value)
    setSelectedWeekday(weekday)
    updateMonthly({
      type: 'byPosition',
      weekday,
      position: selectedPosition
    })
  }

  const handlePositionChange = (e) => {
    const position = parseInt(e.target.value)
    setSelectedPosition(position)
    updateMonthly({
      type: 'byPosition',
      weekday: selectedWeekday,
      position
    })
  }

  return (
    <div id='recurr-monthly'>
      <div className='monthly-position-options'>
        <div className='position-row'>
          <span>The</span>
          <Input
            type='select'
            value={selectedPosition}
            onChange={handlePositionChange}
            className='position-select'
          >
            {positionLabels.map((label, index) => (
              <option key={index} value={index + 1}>{label}</option>
            ))}
          </Input>
          
          <Input
            type='select'
            value={selectedWeekday}
            onChange={handleWeekdayChange}
            className='weekday-select'
          >
            {Object.entries(weekdaysMap).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Input>
          
          <span>of each month</span>
        </div>
      </div>
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

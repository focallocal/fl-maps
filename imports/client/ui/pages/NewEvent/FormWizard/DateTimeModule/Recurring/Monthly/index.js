import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import i18n from '/imports/both/i18n/en'

const labels = i18n.NewEventModal.recurrence

const weekdaysMap = {
  0: i18n.NewEventModal.weekdays.sunday,
  1: i18n.NewEventModal.weekdays.monday,
  2: i18n.NewEventModal.weekdays.tuesday,
  3: i18n.NewEventModal.weekdays.wednesday,
  4: i18n.NewEventModal.weekdays.thursday,
  5: i18n.NewEventModal.weekdays.friday,
  6: i18n.NewEventModal.weekdays.saturday
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
          <span>{labels.the}</span>
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
          
          <span>{labels.of} each month</span>
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

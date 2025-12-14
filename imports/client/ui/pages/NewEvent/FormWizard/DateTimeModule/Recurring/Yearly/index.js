// @ts-nocheck
import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import i18n from '/imports/both/i18n/en'

const labels = i18n.NewEventModal.recurrence
const monthsI18n = i18n.NewEventModal.months

const weekdaysMap = {
  0: i18n.NewEventModal.weekdays.sunday,
  1: i18n.NewEventModal.weekdays.monday,
  2: i18n.NewEventModal.weekdays.tuesday,
  3: i18n.NewEventModal.weekdays.wednesday,
  4: i18n.NewEventModal.weekdays.thursday,
  5: i18n.NewEventModal.weekdays.friday,
  6: i18n.NewEventModal.weekdays.saturday
}

const monthsMap = {
  0: monthsI18n.january,
  1: monthsI18n.february,
  2: monthsI18n.march,
  3: monthsI18n.april,
  4: monthsI18n.may,
  5: monthsI18n.june,
  6: monthsI18n.july,
  7: monthsI18n.august,
  8: monthsI18n.september,
  9: monthsI18n.october,
  10: monthsI18n.november,
  11: monthsI18n.december
}

const positionLabels = ['1st', '2nd', '3rd', '4th', '5th']

function toDate(input) {
  if (!input) return null
  if (input instanceof Date) return input
  const d = new Date(input)
  return isNaN(d.getTime()) ? null : d
}

export default function RecurrYearly({ form, startingDate, yearly = {} }) {
  const date = useMemo(() => toDate(startingDate), [startingDate])

  const [selectedMonth, setSelectedMonth] = useState(yearly.month ?? date?.getMonth() ?? 0)
  const [selectedWeekday, setSelectedWeekday] = useState(yearly.weekday ?? date?.getDay() ?? 5)
  const [selectedPosition, setSelectedPosition] = useState(yearly.position ?? 1)

  // If `yearly` changes from outside (form reset or prefill)
  useEffect(() => {
    if (yearly?.month !== undefined) setSelectedMonth(yearly.month)
    if (yearly?.weekday !== undefined) setSelectedWeekday(yearly.weekday)
    if (yearly?.position !== undefined) setSelectedPosition(yearly.position)
  }, [yearly])

  // Initialize with byPosition on mount
  useEffect(() => {
    updateYearly({
      type: 'byPosition',
      month: selectedMonth,
      weekday: selectedWeekday,
      position: selectedPosition
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Helper to update when.recurring.yearly properly
  const updateYearly = (yearlyData) => {
    if (typeof form?.change === 'function') {
      const model = form.getModel ? form.getModel() : {}
      const when = model.when || {}
      const recurring = when.recurring || {}
      const updatedWhen = {
        ...when,
        recurring: {
          ...recurring,
          yearly: yearlyData
        }
      }
      form.change('when', updatedWhen)
    }
  }

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value)
    setSelectedMonth(month)
    updateYearly({ type: 'byPosition', month, weekday: selectedWeekday, position: selectedPosition })
  }

  const handleWeekdayChange = (e) => {
    const weekday = parseInt(e.target.value)
    setSelectedWeekday(weekday)
    updateYearly({ type: 'byPosition', month: selectedMonth, weekday, position: selectedPosition })
  }

  const handlePositionChange = (e) => {
    const position = parseInt(e.target.value)
    setSelectedPosition(position)
    updateYearly({ type: 'byPosition', month: selectedMonth, weekday: selectedWeekday, position })
  }

  return (
    <div id='recurr-yearly'>
      <div className='yearly-position-options'>
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
          
          <span>{labels.of}</span>
          
          <Input
            type='select'
            value={selectedMonth}
            onChange={handleMonthChange}
            className='month-select'
          >
            {Object.entries(monthsMap).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Input>
        </div>
      </div>
    </div>
  )
}

RecurrYearly.propTypes = {
  form: PropTypes.object.isRequired,
  startingDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  yearly: PropTypes.object
}

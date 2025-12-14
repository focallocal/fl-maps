import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, FormGroup } from 'reactstrap'

const weekdaysMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

const monthsMap = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

const positionLabels = ['1st', '2nd', '3rd', '4th', '5th']

function toDate(input) {
  if (!input) return null
  if (input instanceof Date) return input
  const d = new Date(input)
  return isNaN(d.getTime()) ? null : d
}

function formatMonthDay(date) {
  if (!date) return ''
  const month = monthsMap[date.getMonth()]
  const day = date.getDate()
  return `${month} ${day}`
}

export default function RecurrYearly({ form, startingDate, yearly = {} }) {
  const date = useMemo(() => toDate(startingDate), [startingDate])

  const [selectedType, setSelectedType] = useState(yearly.type || 'byDate')
  const [selectedMonth, setSelectedMonth] = useState(yearly.month ?? date?.getMonth() ?? 0)
  const [selectedWeekday, setSelectedWeekday] = useState(yearly.weekday ?? date?.getDay() ?? 5)
  const [selectedPosition, setSelectedPosition] = useState(yearly.position ?? 1)

  // If `yearly` changes from outside (form reset or prefill)
  useEffect(() => {
    if (yearly?.type) setSelectedType(yearly.type)
    if (yearly?.month !== undefined) setSelectedMonth(yearly.month)
    if (yearly?.weekday !== undefined) setSelectedWeekday(yearly.weekday)
    if (yearly?.position !== undefined) setSelectedPosition(yearly.position)
  }, [yearly])

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

  const handleTypeChange = (e) => {
    const type = e.target.value
    setSelectedType(type)
    
    if (type === 'byDate') {
      updateYearly({
        type: 'byDate',
        month: date?.getMonth() ?? 0,
        day: date?.getDate() ?? 1
      })
    } else {
      updateYearly({
        type: 'byPosition',
        month: selectedMonth,
        weekday: selectedWeekday,
        position: selectedPosition
      })
    }
  }

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value)
    setSelectedMonth(month)
    updateYearly({
      type: 'byPosition',
      month,
      weekday: selectedWeekday,
      position: selectedPosition
    })
  }

  const handleWeekdayChange = (e) => {
    const weekday = parseInt(e.target.value)
    setSelectedWeekday(weekday)
    updateYearly({
      type: 'byPosition',
      month: selectedMonth,
      weekday,
      position: selectedPosition
    })
  }

  const handlePositionChange = (e) => {
    const position = parseInt(e.target.value)
    setSelectedPosition(position)
    updateYearly({
      type: 'byPosition',
      month: selectedMonth,
      weekday: selectedWeekday,
      position
    })
  }

  return (
    <div id='recurr-yearly'>
      <FormGroup tag="fieldset">
        <FormGroup check>
          <Label check>
            <Input
              type='radio'
              name='yearlyType'
              value='byDate'
              checked={selectedType === 'byDate'}
              onChange={handleTypeChange}
            />{' '}
            On {formatMonthDay(date) || 'same date'} each year
          </Label>
        </FormGroup>
        
        <FormGroup check>
          <Label check>
            <Input
              type='radio'
              name='yearlyType'
              value='byPosition'
              checked={selectedType === 'byPosition'}
              onChange={handleTypeChange}
            />{' '}
            On a specific weekday each year
          </Label>
        </FormGroup>
      </FormGroup>

      {selectedType === 'byPosition' && (
        <div className='yearly-position-options'>
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
            
            <span>of</span>
            
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
      )}
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

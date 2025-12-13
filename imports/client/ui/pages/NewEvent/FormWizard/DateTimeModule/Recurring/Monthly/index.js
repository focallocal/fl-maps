import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Input, Label, FormGroup } from 'reactstrap'
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

const positionLabels = ['1st', '2nd', '3rd', '4th', '5th']

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
        { value: 'byPosition', label: 'Monthly on the — —' },
        { value: 'byCustomPositions', label: 'Specific weekdays each month' }
      ]
    }
    const dayInMonth = date.getDate()
    const position = determinePosition(dayInMonth)
    return [
      { value: 'byDayInMonth', label: `Monthly on day ${dayInMonth}` },
      { value: 'byPosition', label: `Monthly on the ${position} ${weekdaysMap[date.getDay()]}` },
      { value: 'byCustomPositions', label: 'Specific weekdays each month' }
    ]
  }, [date])

  const [selectedOption, setSelectedOption] = useState(
    options.find(opt => opt.value === monthly.type) || options[0]
  )
  
  // State for custom positions (e.g., 1st and 3rd Friday)
  const [selectedWeekday, setSelectedWeekday] = useState(monthly.weekday ?? date?.getDay() ?? 5)
  const [selectedPositions, setSelectedPositions] = useState(monthly.positions || [1])

  // If `monthly` changes from outside (form reset or prefill)
  useEffect(() => {
    if (monthly?.type) {
      const match = options.find(opt => opt.value === monthly.type)
      if (match) setSelectedOption(match)
    }
    if (monthly?.weekday !== undefined) setSelectedWeekday(monthly.weekday)
    if (monthly?.positions) setSelectedPositions(monthly.positions)
  }, [monthly, options])

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

  const handleChange = (option) => {
    setSelectedOption(option)

    const value = option.value
    if (!date) return

    const dayInMonth = date.getDate()
    
    if (value === 'byCustomPositions') {
      // Save custom positions format
      updateMonthly({ 
        type: value, 
        weekday: selectedWeekday,
        positions: selectedPositions
      })
    } else {
      const finalValue =
        value === 'byDayInMonth'
          ? dayInMonth
          : determinePosition(dayInMonth)[0]

      // Push update into the form model
      updateMonthly({ type: value, value: finalValue })
    }
  }
  
  const handleWeekdayChange = (e) => {
    const weekday = parseInt(e.target.value)
    setSelectedWeekday(weekday)
    updateMonthly({ 
      type: 'byCustomPositions', 
      weekday,
      positions: selectedPositions
    })
  }
  
  const handlePositionToggle = (position) => {
    const newPositions = selectedPositions.includes(position)
      ? selectedPositions.filter(p => p !== position)
      : [...selectedPositions, position].sort((a, b) => a - b)
    
    // Must have at least one position selected
    if (newPositions.length === 0) return
    
    setSelectedPositions(newPositions)
    updateMonthly({ 
      type: 'byCustomPositions', 
      weekday: selectedWeekday,
      positions: newPositions
    })
  }

  return (
    <div id='recurr-monthly'>
      <Select
        value={selectedOption}
        options={options}
        onChange={handleChange}
        isSearchable={false}
      />
      
      {selectedOption.value === 'byCustomPositions' && (
        <div className='custom-positions mt-3'>
          <FormGroup>
            <Label>Which weekday?</Label>
            <Input
              type='select'
              value={selectedWeekday}
              onChange={handleWeekdayChange}
            >
              {Object.entries(weekdaysMap).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Input>
          </FormGroup>
          
          <FormGroup>
            <Label>Which occurrences? (select one or more)</Label>
            <div className='position-checkboxes'>
              {positionLabels.map((label, index) => (
                <FormGroup check inline key={index}>
                  <Label check>
                    <Input
                      type='checkbox'
                      checked={selectedPositions.includes(index + 1)}
                      onChange={() => handlePositionToggle(index + 1)}
                    />{' '}
                    {label}
                  </Label>
                </FormGroup>
              ))}
            </div>
          </FormGroup>
        </div>
      )}
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

/**
 * RecurrWeekly
 *
 * Props:
 * - form: object with getModel() and change(field, value)
 * - schemaKey: string path e.g. 'when.recurring.days'
 * - initialSelectedDays (optional): array fallback
 */
export default function RecurrWeekly({ form, schemaKey, initialSelectedDays = [] }) {
  // Read authoritative days from the form model
  const getDaysFromModel = () => {
    try {
      const model = typeof form?.getModel === 'function' ? form.getModel() : {}
      const days = model?.when?.recurring?.days
      return Array.isArray(days) ? days : []
    } catch (err) {
      console.warn('getDaysFromModel error', err)
      return []
    }
  }

  // Initialize from model first, or fallback to prop
  const starting = getDaysFromModel();
  const [selectedDays, setSelectedDays] = useState(
    starting.length ? starting : (Array.isArray(initialSelectedDays) ? initialSelectedDays : [])
  )

  // If parent later updates initialSelectedDays, sync it (optional)
  useEffect(() => {
    if (Array.isArray(initialSelectedDays) && initialSelectedDays.length) {
      setSelectedDays(initialSelectedDays)
    }
  }, [initialSelectedDays])

  // Pulls fresh model on mount (in case initial prop empty)
  useEffect(() => {
    const modelDays = getDaysFromModel()
    if (modelDays.length) setSelectedDays(modelDays)
  }, []) // run once on mount

  const toggleDay = (day) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day]

    setSelectedDays(updated)

    try {
      const model = form.getModel ? form.getModel() : {}
      const when = model.when || {}
      const recurring = when.recurring || {}

      // Merge the update properly
      const newRecurring = {
        ...recurring,
        days: updated
      }

      // Update via form.change with the nested object
      form.change('when.recurring', newRecurring)
    } catch (err) {
      console.error('Error updating recurring.days:', err)
    }
  }

  return (
    <div id="recurr-weekly">
      Repeat on
      <div className="weekdays">
        {weekDays.map((day) => {
          const active = selectedDays.includes(day)
          return (
            <div
              key={day}
              onClick={() => toggleDay(day)}
              className={`day ${active ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDay(day) }}
              aria-pressed={active}
            >
              {day[0]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

RecurrWeekly.propTypes = {
  form: PropTypes.object.isRequired,
  schemaKey: PropTypes.string.isRequired,
  initialSelectedDays: PropTypes.array.isRequired
}

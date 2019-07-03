import React from 'react'
import { formatDateWithWords, formatDate } from '/imports/client/utils/format'
import { findNextEvent, calibrateEndWeekday } from '/imports/client/utils/findNextEvent'
import './styles.scss'

const HoursFormatted = ({ data }) => {
  const {
    startingDate,
    endingDate,
    startingTime,
    endingTime
  } = data

  const isSameDay = startingDate.toDateString() === endingDate.toDateString()

  if (data.multipleDays) {
    const isEnding = !!endingDate

    return (
      <div className='hours-formatted multiple-days'>
        {isEnding && (
          <div className='date'>
            {formatDateWithWords(startingDate)} - {formatDateWithWords(endingDate)}
          </div>
        )}

        {data.days.map((day, index) => (
          (day && day.day) &&
          <div key={index} className='day'>
            <div>{day.day.substr(0, 3)}</div>
            <span>{day.startingTime} - {day.endingTime}</span>
          </div>
        ))}
      </div>
    )
  }

  if (data.repeat) {
    const {
      days,
      every,
      forever,
      type,
      until,
      occurences,
      monthly,
      recurrenceEndDate
    } = data.recurring

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let daysOrdered = days
    if (days) daysOrdered = weekDays.filter((e) => days.indexOf(e) >= 0)

    let nextEventInstance = findNextEvent(startingDate, type, every, days, monthly)

    // DESCRIPTION: Reusable Fragment with timestamp on Next Occurence
    const nextOccurence = (
      <li className='hours-formatted regular-date'>
        <span>Next:<br/>
          {formatDateWithWords(nextEventInstance)}<br/>
          {startingTime} - </span>
        {isSameDay ? endingTime
          : <div>
            {formatDateWithWords(
              new Date(Date.parse(nextEventInstance) + (endingDate.getTime() - startingDate.getTime()))
            )}, {endingTime}
          </div>
        }
      </li>
    )

    // DESCRIPTION: Reusable Fragment with repetition details
    const repeatTitle = <span>Repeating:<br/></span>
    const repeatSchedule = `every ${every > 1 ? every : ''} ${type + (every > 1 ? 's' : '')}`
    const startingWeekday = startingDate.getDay()
    let endingWeekday = endingDate.getDay()
    if (daysOrdered) endingWeekday = weekDays.indexOf(daysOrdered[daysOrdered.length - 1])
    const adjustedEndDate = calibrateEndWeekday(startingDate, endingDate, days, recurrenceEndDate)

    const notForeverDay = (
      <div className='not-forever'>
        {(data.repeat && occurences) && `until ${formatDateWithWords(recurrenceEndDate)}`}
        {(data.repeat && until) && `until ${formatDateWithWords(until)}`}
      </div>
    )
    const notForeverWeek = (
      <div className='not-forever'>
        {(data.repeat && occurences && startingWeekday === endingWeekday)
          && `until ${formatDateWithWords(recurrenceEndDate)}`}
        {(data.repeat && occurences && startingWeekday !== endingWeekday)
          && `until ${formatDateWithWords(adjustedEndDate)}`}
        {(data.repeat && until) && `until ${formatDateWithWords(until)}`}
      </div>
    )
    const notForeverMonth = (
      <div className='not-forever'>
        {(data.repeat && occurences) && `through ${months[recurrenceEndDate.getMonth()]}`}
        {(data.repeat && until) && `through ${months[until.getMonth()]}`}
      </div>
    )

    if (type === 'day') {
      return (
        <ul className='hours-formatted repeat'>
          {(forever === true) && nextOccurence}
          {(!forever && recurrenceEndDate && new Date() < recurrenceEndDate) && nextOccurence}
          {(!forever && until && new Date() < until) && nextOccurence}
          <li>{repeatTitle} {repeatSchedule}, between {startingTime} - {endingTime} </li>
          {!forever && notForeverDay}
        </ul>
      )
    } else if (type === 'week') {
      return (
        <ul className='hours-formatted repeat'>
          {(forever === true) && nextOccurence}
          {(!forever && recurrenceEndDate && new Date() < recurrenceEndDate) && nextOccurence}
          {(!forever && until && new Date() < until) && nextOccurence}
          <li>
            <span className='every-sentence'>{repeatTitle} {repeatSchedule}</span><br/>
            {daysOrdered.map((day, index) => (
              day &&
                <div key={index} className='day'>
                  <span>on {day.substr(0, 3)}, {startingTime} - {endingTime}</span><br/>
                </div>
            ))}
          </li>
          {!forever && notForeverWeek}
        </ul>
      )
    } else if (type === 'month') {
      return (
        <ul className='hours-formatted repeat'>
          {nextOccurence}
          <li>
            <span className='every-sentence'>{repeatTitle} {repeatSchedule} </span><br/>
            <span>
              {(monthly.type === 'byDayInMonth' && monthly.value === 1) && `on the ${monthly.value}st`}
              {(monthly.type === 'byDayInMonth' && monthly.value === 2) && `on the ${monthly.value}nd`}
              {(monthly.type === 'byDayInMonth' && monthly.value === 3) && `on the ${monthly.value}rd`}
              {(monthly.type === 'byDayInMonth' && monthly.value > 3) && `on the ${monthly.value}th`}
              {(monthly.type === 'byPosition' && monthly.value === 1) && `on the ${monthly.value}st ${weekDays[startingDate.getDay()]}`}
              {(monthly.type === 'byPosition' && monthly.value === 2) && `on the ${monthly.value}nd ${weekDays[startingDate.getDay()]}`}
              {(monthly.type === 'byPosition' && monthly.value === 3) && `on the ${monthly.value}rd ${weekDays[startingDate.getDay()]}`}
              {(monthly.type === 'byPosition' && monthly.value > 3) && `on the ${monthly.value}th ${weekDays[startingDate.getDay()]}`}
            </span>
          </li>
          {!forever && notForeverMonth}
        </ul>
      )
    }
  }

  // DESCRIPTION: if !data.repeat then default view is start + end timestamp
  const endFragment = (
    isSameDay ? endingTime
      : <div>
        {formatDateWithWords(endingDate)}, {endingTime}
      </div>
  )
  const ongoing = endingDate.getFullYear() - startingDate.getFullYear() > 5

  return (
    <div className='hours-formatted regular-date'>
      <span>{ongoing && `From`} {formatDateWithWords(startingDate)}, {startingTime} - </span>
      {ongoing ? `until further notice` : endFragment}
    </div>
  )
}

export default HoursFormatted

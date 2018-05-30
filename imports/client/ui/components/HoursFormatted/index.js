import React from 'react'
import { formatDateWithWords, formatDate } from '/imports/client/utils/format'
import './styles.scss'

const HoursFormatted = ({ data }) => {
  const {
    startingDate,
    endingDate,
    startingTime,
    endingTime
  } = data

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
          day &&
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
      repeat,
      until
    } = data.recurring

    // Reusable parts
    const firstLine = `Every ${every} ${type + (every > 1 ? 's' : '')}`
    const notForever = (
      <div className='not-forever'>
        <span>Available</span>
        {repeat && ` for ${repeat} occurences`}
        {(repeat && until) && ` or until ${formatDate(until)}`}
        {(!repeat && until) && `until ${formatDate(until)}`}
      </div>
    )

    if (type === 'day') {
      return (
        <div className='hours-formatted repeat'>
          <span>{firstLine}, between {startingTime} - {endingTime} </span>
          {!forever && notForever}
        </div>
      )
    } else if (type === 'week') {
      return (
        <div className='hours-formatted repeat'>
          <div className='every-sentence'>{firstLine} on</div>
          {days.map((day, index) => (
            day &&
              <div key={index} className='day'>
                <div>{day.substr(0, 3)}</div>
                <span>{startingTime} - {endingTime}</span>
              </div>
          ))}
          {!forever && notForever}
        </div>
      )
    } else {
      // todo - handle "month"
    }
  }

  const isSameDay = startingDate.toDateString() === endingDate.toDateString()

  return (
    <div className='hours-formatted regular-date'>
      <span>{formatDateWithWords(startingDate)}, {startingTime} - </span>
      {isSameDay ? endingTime
        : <div>
          {formatDateWithWords(endingDate)}, {endingTime}
        </div>
      }
    </div>
  )
}

export default HoursFormatted

// DESCRIPTION: This is the main function that iterates through event dates
// in order to find the next one from the user's perspective
export function findNextEvent (startingDate, type, every, days, monthly) {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let daysOrdered = days
  if (days) daysOrdered = weekDays.filter((e) => days.indexOf(e) >= 0)

  let modifiedDate = new Date(startingDate)

  // NOTE: Begin Loop
  while (modifiedDate < new Date()) {
    if (type === 'day') {
      modifiedDate = new Date(modifiedDate.setDate(modifiedDate.getDate() + every))
    } else if (type === 'week') {
      let weekdayIndex = modifiedDate.getDay() // 0-6
      let weekdayName = weekDays[weekdayIndex] // Sun-Sat

      if (!daysOrdered.includes(weekdayName)) {
        if (modifiedDate.getTime() === startingDate.getTime()) {
          modifiedDate = resetEventWeekday(modifiedDate, daysOrdered, weekDays)
        } else {
          throw new Error('Event Iterator Malfunction')
        }
      } else if (daysOrdered.indexOf(weekdayName) < days.length - 1) {
        modifiedDate = jumpToNextWeekdayInPeriod(modifiedDate, daysOrdered, weekDays)
      } else if (daysOrdered.indexOf(weekdayName) === daysOrdered.length - 1) {
        modifiedDate = jumpToNextWeek(modifiedDate, every, daysOrdered, weekDays)
      } else {
        throw new Error('Unknown weekly iteration error')
      }
    } else if (type === 'month') {
      modifiedDate = jumpToNextMonth(modifiedDate, every, monthly.type, monthly.value, startingDate)
    }
  }
  return modifiedDate
}

// DESCRIPTION: This function is needed to identify the weekday of the last eveny of the weekly period
// In order to correctly identify the last recurrence date
// (Example: event start date on a Monday, but repeats on Mondays and Fridays)
// (Example cont.: so the last day will be a Friday, different from the original starting weekday)
export function calibrateEndWeekday (startingDate, endingDate, days, recurrenceEndDate) {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let daysOrdered = days
  if (days) daysOrdered = weekDays.filter((e) => days.indexOf(e) >= 0)

  const startingWeekday = startingDate.getDay()
  let endingWeekday = endingDate.getDay()
  if (daysOrdered) endingWeekday = weekDays.indexOf(daysOrdered[daysOrdered.length - 1])
  const weekdayShift = endingWeekday - startingWeekday
  const modifiedDate = new Date(recurrenceEndDate) || null
  if (recurrenceEndDate) modifiedDate.setDate(recurrenceEndDate.getDate() + weekdayShift)

  return modifiedDate
}

// DESCRIPTION: Takes event date object and resets to first preceeding weekday included in repeating 'days' array
// PURPOSE: User may have specified a set of weekdays different from the event's start date
//          This means we need to recalibrate the date before we can iterate to find the next event
function resetEventWeekday (eventInstance, selectedDaysArray, allWeekdays) {
  let weekday = eventInstance.getDay()
  let modifiedDate = new Date(eventInstance)
  modifiedDate.setDate(modifiedDate.getDate() - weekday)
  while (!selectedDaysArray.includes(allWeekdays[modifiedDate.getDay()])) {
    modifiedDate = new Date(modifiedDate.setDate(modifiedDate.getDate() + 1))
  }
  return modifiedDate
}

function jumpToNextWeekdayInPeriod (eventInstance, selectedDaysArray, allWeekdays) {
  const weekday = eventInstance.getDay()
  const weekdayName = allWeekdays[weekday]
  const positionInPeriod = selectedDaysArray.indexOf(weekdayName)
  const nextWeekday = allWeekdays.indexOf(selectedDaysArray[positionInPeriod + 1])
  const jumpDays = nextWeekday - weekday
  let modifiedDate = new Date(eventInstance.setDate(eventInstance.getDate() + jumpDays))
  return modifiedDate
}

function jumpToNextWeek (eventInstance, periodSkip, selectedDaysArray, allWeekdays) {
  const weekday = eventInstance.getDay()
  const firstWeekdayName = selectedDaysArray[0]
  const firstWeekday = allWeekdays.indexOf(firstWeekdayName)
  const jumpDays = 7 * periodSkip + firstWeekday - weekday
  let modifiedDate = new Date(eventInstance.setDate(eventInstance.getDate() + jumpDays))
  return modifiedDate
}

function jumpToNextMonth (eventInstance, periodSkip, selectionType, selectionValue, firstDate) {
  let modifiedDate = new Date(eventInstance)
  const currentMonth = modifiedDate.getMonth() // 0-11
  modifiedDate.setMonth(currentMonth + periodSkip)
  if (selectionType === 'byDayInMonth') {
    modifiedDate.setDate(selectionValue)
  } else if (selectionType === 'byPosition') {
    modifiedDate.setDate(1)
    const actualWeekdayIndex = modifiedDate.getDay()
    const desiredWeekdayIndex = firstDate.getDay()
    const weekdayShift = desiredWeekdayIndex - actualWeekdayIndex >= 0 ?
      desiredWeekdayIndex - actualWeekdayIndex
      : 7 + desiredWeekdayIndex - actualWeekdayIndex
    modifiedDate = new Date(modifiedDate.setDate(modifiedDate.getDate() + weekdayShift + (7 * (selectionValue - 1))))
  } else {
    throw new Error('Error parsing monthly recurrence type')
  }
  return modifiedDate
}

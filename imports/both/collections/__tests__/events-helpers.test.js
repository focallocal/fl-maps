import * as helpers from '../events/helpers'
import possibleEventHours from '../events/helpers/possibleEventHours'

describe('Events collection helpers', () => {
  //

  test('determinePosition function', () => {
    const f = helpers.determinePosition

    expect(f(1)).toEqual('1st')
    expect(f(7)).toEqual('1st')
    expect(f(8)).toEqual('2nd')
    expect(f(14)).toEqual('2nd')
    expect(f(15)).toEqual('3rd')
    expect(f(21)).toEqual('3rd')
    expect(f(22)).toEqual('4th')
    expect(f(31)).toEqual('4th')
  })

  test('getHour function', () => {
    // Note that the date variable is mutated directly.

    const f = helpers.getHour
    const date = new Date('02/03/2004')

    date.setHours(3)
    expect(f(null, date)).toEqual('3:00')
    expect(f(1, date)).toEqual('4:00')
    date.setMinutes(31)
    expect(f(null, date)).toEqual('4:30')
  })

  test('startingTime', () => {
    expect(helpers.startingTime.allowedValues).toEqual(possibleEventHours)
  })
})

import { validateSSO, findMail } from '../general/validateSSO'

describe('validateSSO', () => {
  // We are testing only what we can right now due to meteor's limits

  test('constructor should have those arguments', () => {
    const {
      name,
      mixins,
      validate,
      run
    } = validateSSO

    expect(name).toEqual('General.validateSSO')
    expect(mixins).toEqual([])
    expect(validate).toEqual(null)
    expect(typeof run).toEqual('function')
  })

  test('findMail should return the right email', () => {
    const passwordMail = findMail({ emails: [{ address: 'mail1', verified: true }] })
    const googleMail = findMail({ services: { google: { email: 'mail2' } } })
    const facebookMail = findMail({ services: { facebook: { email: 'mail3' } } })

    expect(passwordMail).toEqual({ address: 'mail1', verified: true })
    expect(googleMail).toEqual({ address: 'mail2', verified: true })
    expect(facebookMail).toEqual({ address: 'mail3', verified: true })
  })
})

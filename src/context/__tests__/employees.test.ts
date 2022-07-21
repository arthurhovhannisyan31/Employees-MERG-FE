import { AuthContextActions } from 'model/context/auth'

describe('auth context reducer', () => {
  it(AuthContextActions.LOGIN_REQUEST, () => {
    expect(1).toEqual(1)
  })
  it(AuthContextActions.LOGIN_SUCCESS, () => {
    expect(1).toEqual(1)
  })
  it(AuthContextActions.LOGOUT, () => {
    expect(1).toEqual(1)
  })
  it(AuthContextActions.ERRORS, () => {
    expect(1).toEqual(1)
  })
})

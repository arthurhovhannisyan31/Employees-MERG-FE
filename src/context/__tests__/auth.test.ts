import { authDefaultState, authContextReducer } from 'context/auth'
import { getAction } from 'context/helpers'

import {
  AuthContextActions,
  AuthReducerAction,
  AuthState,
} from 'model/context/auth'
import { FieldError, UserCredentials } from 'model/generated'

const setup = (action: AuthReducerAction): AuthState =>
  authContextReducer(authDefaultState, action)

describe('auth context reducer', () => {
  it(AuthContextActions.LOGIN_REQUEST, () => {
    const payloadValue = true
    const action: AuthReducerAction = getAction(
      AuthContextActions.LOGIN_REQUEST,
      { isFetching: payloadValue },
    )
    const state = setup(action)

    expect(state.isFetching).toEqual(payloadValue)
  })
  it(AuthContextActions.LOGIN_SUCCESS, () => {
    const payloadValue: UserCredentials = {
      _id: 'id',
      email: 'email',
    }
    const action: AuthReducerAction = getAction(
      AuthContextActions.LOGIN_SUCCESS,
      { userCredentials: payloadValue },
    )
    const state = setup(action)

    expect(state.userCredentials).toEqual(payloadValue)
    expect(state.isFetching).toEqual(false)
  })
  it(AuthContextActions.LOGOUT, () => {
    const value: UserCredentials = {
      _id: '',
      email: '',
    }
    const action: AuthReducerAction = getAction(AuthContextActions.LOGOUT)
    const state = setup(action)

    expect(state.userCredentials).toEqual(value)
    expect(state.isFetching).toEqual(false)
  })
  it(AuthContextActions.ERRORS, () => {
    const payloadValue: FieldError[] = [
      {
        message: 'message',
        field: 'field',
      },
    ]
    const action: AuthReducerAction = getAction(AuthContextActions.ERRORS, {
      errors: payloadValue,
    })
    const state = setup(action)

    expect(state.errors).toEqual(payloadValue)
    expect(state.isFetching).toEqual(false)
  })
})

import { produce } from 'immer'
import React, { createContext, useReducer, FC } from 'react'

import { API_URL } from 'constants/config'

import {
  AuthContextActions,
  AuthContextProps,
  AuthReducerAction,
  AuthState,
  AuthReducerProps,
} from 'model/context/auth'

const authContextInitValue: AuthContextProps = {
  userCredentials: {
    email: '',
    _id: '',
  },
  apiUrl: '',
  headers: {},
  errors: [],
  dispatch: () => null,
  isFetching: false,
}

const AuthContext = createContext<AuthContextProps>(authContextInitValue)

const authContextReducer = produce(
  (state: AuthState, action: AuthReducerAction) => {
    const { type, payload } = action
    switch (type) {
      case AuthContextActions.LOGIN_REQUEST: {
        state.isFetching = action.payload?.isFetching || false
        break
      }
      case AuthContextActions.LOGIN_SUCCESS: {
        state.errors = []
        state.userCredentials = {
          _id: payload?.userCredentials?._id ?? '',
          email: payload?.userCredentials?.email ?? '',
        }
        state.isFetching = false
        break
      }
      case AuthContextActions.LOGOUT: {
        state.userCredentials = {
          _id: '',
          email: '',
        }
        break
      }
      case AuthContextActions.ERRORS: {
        state.errors = payload?.errors
        state.isFetching = false
        break
      }
    }
  },
)

const AuthContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<AuthReducerProps>(
    authContextReducer,
    authContextInitValue,
  )

  const { errors, userCredentials, isFetching } = state

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  return (
    <AuthContext.Provider
      value={{
        headers,
        dispatch,
        errors,
        userCredentials,
        apiUrl: API_URL,
        isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextContainer as default, AuthContext }

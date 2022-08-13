import { produce } from 'immer'
import React, { createContext, useReducer, FC } from 'react'

import { API_URL } from 'constants/config'

import {
  AuthContextActions,
  AuthContextProps,
  AuthReducerAction,
  AuthState,
  AuthReducerProps,
  AuthContextContainerProps,
} from 'model/context/auth'

export const authDefaultState: AuthState = {
  userCredentials: {
    email: '',
    _id: '',
  },
  errors: [],
  isFetching: false,
}

export const authInitState: AuthContextProps = {
  ...authDefaultState,
  apiUrl: '',
  headers: {},
  dispatch: () => null,
}

export const AuthContext = createContext<AuthContextProps>(authInitState)

export const authContextReducer = produce(
  (state: AuthState, action: AuthReducerAction) => {
    const { type, payload } = action
    switch (type) {
      case AuthContextActions.LOGIN_REQUEST: {
        state.isFetching = payload?.isFetching || false
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

export const AuthContextContainer: FC<AuthContextContainerProps> = ({
  children,
  initState = authInitState,
}) => {
  const [state, dispatch] = useReducer<AuthReducerProps>(
    authContextReducer,
    initState,
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

AuthContextContainer.displayName = 'AuthContextContainer'

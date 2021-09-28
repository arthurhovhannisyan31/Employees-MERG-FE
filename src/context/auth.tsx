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
}

const AuthContext = createContext<AuthContextProps>(authContextInitValue)

const authContextReducer = (
  state: AuthState,
  action: AuthReducerAction,
): AuthState => {
  const { type, payload } = action
  switch (type) {
    case AuthContextActions.LOGIN: {
      return {
        ...state,
        userCredentials: {
          _id: payload?.userCredentials?._id ?? '',
          email: payload?.userCredentials?.email ?? '',
        },
      }
    }
    case AuthContextActions.LOGOUT: {
      return {
        ...state,
        userCredentials: {
          _id: '',
          email: '',
        },
      }
    }
    case AuthContextActions.ERRORS: {
      return {
        ...state,
        errors: payload?.errors,
      }
    }
    default: {
      return state
    }
  }
}

const AuthContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<AuthReducerProps>(
    authContextReducer,
    authContextInitValue,
  )

  const { errors, userCredentials } = state

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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextContainer as default, AuthContext }

// deps
import React, { createContext, useReducer } from 'react'
// model
import {
  AuthContextActions,
  AuthContextProps,
  AuthReducerAction,
  AuthState,
  AuthReducerProps,
} from '_/model/context/auth'
// helpers
import { API_URL } from '_/utils/constants/config'

const authContextInitValue: AuthContextProps = {
  userCredentials: {
    email: '',
    _id: '',
  },
  apiUrl: '',
  headers: {},
  errors: [],
  dispatch: () => {},
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

const AuthContextContainer: React.FC = ({ children }) => {
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

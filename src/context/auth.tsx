import React, { createContext, useReducer, FC } from 'react'

import { API_URL } from 'utils/constants/config'

import {
  EAuthContextActions,
  IAuthContext,
  IAuthReducerAction,
  IAuthState,
  TAuthReducer,
} from 'model/context/auth'

const authContextInitValue: IAuthContext = {
  userCredentials: {
    email: '',
    _id: '',
  },
  apiUrl: '',
  headers: {},
  errors: [],
  dispatch: () => null,
}

const AuthContext = createContext<IAuthContext>(authContextInitValue)

const authContextReducer = (
  state: IAuthState,
  action: IAuthReducerAction,
): IAuthState => {
  const { type, payload } = action
  switch (type) {
    case EAuthContextActions.LOGIN: {
      return {
        ...state,
        userCredentials: {
          _id: payload?.userCredentials?._id ?? '',
          email: payload?.userCredentials?.email ?? '',
        },
      }
    }
    case EAuthContextActions.LOGOUT: {
      return {
        ...state,
        userCredentials: {
          _id: '',
          email: '',
        },
      }
    }
    case EAuthContextActions.ERRORS: {
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
  const [state, dispatch] = useReducer<TAuthReducer>(
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

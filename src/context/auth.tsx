// deps
import React from 'react'
// model
import {
  EAuthContextActions,
  IAuthContext,
  IAuthReducerAction,
  IAuthState,
  TAuthReducer,
} from '_/model/context/auth'
// helpers
import { API_URL } from '_/constants/config'

const authContextInitValue: IAuthContext = {
  token: '',
  userCredentials: {
    email: '',
    id: '',
  },
  apiUrl: '',
  headers: {},
  errors: [],
  dispatch: () => {},
}

const AuthContext = React.createContext<IAuthContext>(authContextInitValue)

const authContextReducer = (state: IAuthState, action: IAuthReducerAction) => {
  const { type, payload } = action
  switch (type) {
    case EAuthContextActions.LOGIN: {
      return {
        ...state,
        token: payload?.token ?? '',
        userCredentials: {
          id: payload?.userCredentials?.id ?? '',
          email: payload?.userCredentials?.email ?? '',
        },
      }
    }
    case EAuthContextActions.LOGOUT: {
      return {
        ...state,
        token: '',
        userCredentials: {
          id: '',
          email: '',
        },
        tokenExpiration: 0,
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

const AuthContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<TAuthReducer>(
    authContextReducer,
    authContextInitValue,
  )

  const { token, errors, userCredentials } = state

  const headers = React.useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token],
  )

  return (
    <AuthContext.Provider
      value={{
        headers,
        dispatch,
        errors,
        userCredentials,
        token,
        apiUrl: API_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextContainer as default, AuthContext }

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
import { API_URL } from '_/utils/constants/config'

const authContextInitValue: IAuthContext = {
  userCredentials: {
    email: '',
    _id: '',
  },
  apiUrl: '',
  headers: {},
  errors: [],
  dispatch: () => {},
}

const AuthContext = React.createContext<IAuthContext>(authContextInitValue)

const authContextReducer = (state: IAuthState, action: IAuthReducerAction) => {
  const { type, payload } = action
  console.log(type, payload)
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

const AuthContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<TAuthReducer>(
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

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

const authContextInitValue: IAuthContext = {
  token: '',
  userCredentials: {
    email: '',
    id: '',
  },
  tokenExpiration: 0,
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
        tokenExpiration: payload?.tokenExpiration ?? 0,
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

  const { token, errors, tokenExpiration, userCredentials } = state

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
        tokenExpiration,
        userCredentials,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextContainer as default, AuthContext }

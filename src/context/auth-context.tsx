// deps
import React from 'react'
// model
import {
  EAuthContextActions,
  IAuthContext,
  IAuthReducerAction, IAuthState, TAuthReducer,
} from '_/model/context/auth';

const authContextInitValue:IAuthContext = {
  token: '',
  userId: '',
  tokenExpiration: 0,
  headers: {},
  errors: [],
  dispatch: () => {},
}

const AuthContext = React.createContext<IAuthContext>(authContextInitValue)

const authContextReducer = (
  state: IAuthState,
  action: IAuthReducerAction,
) => {
  const { type, payload } = action
  switch (type) {
    case EAuthContextActions.LOGIN: {
      return {
        ...state,
        token: payload?.token ?? '',
        userId: payload?.userId ?? '',
        tokenExpiration: payload?.tokenExpiration ?? 0,
      }
    }
    case EAuthContextActions.LOGOUT: {
      return {
        ...state,
        token: '',
        userId: '',
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

  const {
    token, errors, tokenExpiration, userId,
  } = state

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
        headers, dispatch, errors, tokenExpiration, userId, token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextContainer as default, AuthContext }

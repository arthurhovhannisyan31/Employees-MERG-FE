// deps
import React from 'react'
// model
import {
  IAuthContext,
  IAuthReducerAction,
  IAuthState,
} from '_/model/context/auth'

const authContextInitValue = {
  token: '',
  userId: '',
  tokenExpiration: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_: IAuthState) => {},
  logout: () => {},
  headers: {
  },
}

const AuthContext = React.createContext<IAuthContext>(authContextInitValue)

const authContextReducer = (
  state: IAuthContext,
  action: IAuthReducerAction,
) => {
  const {
    type, payload,
  } = action
  switch (type) {
    case 'login': {
      return {
        ...state,
        token: payload?.token ?? '',
        userId: payload?.userId ?? '',
        tokenExpiration: payload?.tokenExpiration ?? 0,
      }
    }
    case 'logout': {
      return {
        ...state,
        token: '',
        userId: '',
        tokenExpiration: 0,
      }
    }
    default: {
      return state
    }
  }
}

const AuthContextContainer: React.FC = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(
    authContextReducer,
    authContextInitValue,
  )

  const login = (payload: IAuthState) => dispatch({
    type: 'login', payload,
  })
  const logout = () => dispatch({
    type: 'logout',
  })

  const {
    token, userId, tokenExpiration,
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
        login, logout, token, userId, tokenExpiration, headers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContextContainer as default, AuthContext,
}

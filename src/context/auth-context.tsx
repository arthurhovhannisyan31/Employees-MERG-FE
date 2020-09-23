// deps
import React from 'react'
// local

interface IAuthState {
  token: string
  userId: string
  tokenExpiration: number
}

interface IAuthContext extends IAuthState {
  login: (_: IAuthState) => void
  logout: () => void
}

interface IAuthReducerAction {
  type: string
  payload?: IAuthState
}

const authContextInitValue = {
  token: '',
  userId: '',
  tokenExpiration: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_: IAuthState) => {},
  logout: () => {},
}

const AuthContext = React.createContext<IAuthContext>(authContextInitValue)

const authContextReducer = (
  state: IAuthContext,
  action: IAuthReducerAction
) => {
  const { type, payload } = action
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

const AuthContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    authContextReducer,
    authContextInitValue
  )

  const login = (payload: IAuthState) => dispatch({ type: 'login', payload })
  const logout = () => dispatch({ type: 'logout' })

  const { token, userId, tokenExpiration } = state

  const authContextValue = { login, logout, token, userId, tokenExpiration }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextContainer as default, AuthContext }

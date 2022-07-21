import { Action } from 'model/common'
import { AuthData, FieldError } from 'model/generated'

export enum AuthContextActions {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT',
  ERRORS = 'ERRORS',
}

export interface AuthState extends Pick<AuthData, 'userCredentials'> {
  errors?: FieldError[]
  isFetching: boolean
}

export interface AuthContextProps extends AuthState {
  headers: Record<string, string>
  apiUrl: string
  dispatch: (val: AuthReducerAction) => void
}

export type AuthReducerProps = (
  prevState: AuthState,
  action: AuthReducerAction,
) => AuthState

export type AuthReducerAction = Action<AuthContextActions, Partial<AuthState>>

export interface DecodedToken {
  email: string
  exp: number
  iat: number
  userId: string
}

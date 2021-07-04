// deps
import React from 'react'
// model
import { AuthData, FieldError } from 'model/generated'

export enum AuthContextActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ERRORS = 'ERRORS',
}

export interface AuthState extends Pick<AuthData, 'userCredentials'> {
  errors?: FieldError[]
}

export interface AuthContextProps extends AuthState {
  headers: Record<string, string>
  apiUrl: string
  dispatch: React.Dispatch<AuthReducerAction>
}

export type AuthReducerProps = (
  prevState: AuthState,
  action: AuthReducerAction,
) => AuthState

export interface AuthReducerAction {
  type: AuthContextActions
  payload?: Partial<AuthState>
}

export interface DecodedToken {
  email: string
  exp: number
  iat: number
  userId: string
}

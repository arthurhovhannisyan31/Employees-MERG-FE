// deps
import React from 'react'
// model
import { AuthData } from '_/model/generated'

export enum EAuthContextActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ERRORS = 'ERRORS',
}

export interface IAuthState extends Pick<AuthData, 'userCredentials'> {
  errors?: Error[]
}

export interface IAuthContext extends IAuthState {
  headers: Record<string, string>
  apiUrl: string
  dispatch: React.Dispatch<IAuthReducerAction>
}

export type TAuthReducer = (
  prevState: IAuthState,
  action: IAuthReducerAction,
) => IAuthState

export interface IAuthReducerAction {
  type: EAuthContextActions
  payload?: Partial<IAuthState>
}

export interface IDecodedToken {
  email: string
  exp: number
  iat: number
  userId: string
}

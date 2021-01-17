import React from 'react';

export enum EAuthContextActions {
  LOGIN= 'LOGIN',
  LOGOUT = 'LOGOUT',
  ERRORS = 'ERRORS',
}

export interface IAuthState {
  token: string
  userId: string
  tokenExpiration: number
  errors?: Error[]
}

export interface IAuthContext extends IAuthState {
  headers: Record<string, string>
  dispatch: React.Dispatch<IAuthReducerAction>
}

export type TAuthReducer = (prevState: IAuthState, action: IAuthReducerAction) => IAuthState

export interface IAuthReducerAction {
  type: EAuthContextActions
  payload?: Partial<IAuthState>
}

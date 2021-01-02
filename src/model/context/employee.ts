// deps
import React from 'react'
// model
import {
  Employee,
} from '_/model/generated/graphql';
import {
  IAction,
} from '_/model/store';

export interface IEmployeeByIdState {
  loading: boolean
  error: boolean
  data: Record<string, Employee>
}

export type TEmployeeByIdAction = IAction<Partial<IEmployeeByIdState>>

export type TEmployeeByIdReducer =
  (prevState: IEmployeeByIdState, action: TEmployeeByIdAction) => IEmployeeByIdState

export interface IEmployeesByIdContext {
  state: IEmployeeByIdState
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

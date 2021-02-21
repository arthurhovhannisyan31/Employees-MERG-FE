// deps
import React from 'react'
// model
import { Employee } from '_/model/generated/graphql'
import { IAction } from '_/model/common'

export interface IEmployeeByIdState {
  loading: boolean
  error: boolean
  data: Record<string, Employee>
}
export type TEmployeeByIdAction = IAction<
  Partial<Omit<IEmployeeByIdState, 'data'> & { data: Employee; key: string }>
>

export type TEmployeeByIdReducer = (
  prevState: IEmployeeByIdState,
  action: TEmployeeByIdAction,
) => IEmployeeByIdState

export enum EActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  DATA = 'data',
  UPDATE_ITEM = 'updateItem',
}

export interface IEmployeeByIdContext {
  state: IEmployeeByIdState
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

export type TEmployeeFetchResponse = {
  data: {
    employee: Omit<Employee, '__typename'>
  }
}

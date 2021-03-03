// deps
import React from 'react'
// model
import { Employee, UpdateEmployeeInput } from '_/model/generated'
import { IAction } from '_/model/common'

export interface IEmployeeByIdState {
  loading: boolean
  error: boolean
  data: Record<string, Employee>
}
export type TEmployeeByIdAction = IAction<
  Partial<
    Omit<IEmployeeByIdState, 'data'> & {
      data: Employee | Omit<UpdateEmployeeInput, 'id'>
      key?: string
    }
  >
>

export type TEmployeeByIdReducer = (
  prevState: IEmployeeByIdState,
  action: TEmployeeByIdAction,
) => IEmployeeByIdState

export enum EActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  DATA = 'data',
  ADD_ITEM = 'addItem',
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

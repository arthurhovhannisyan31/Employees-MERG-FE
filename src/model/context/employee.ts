// deps
import React from 'react'
// model
import { Employee, UpdateEmployeeInput } from 'model/generated'
import { Action } from 'model/common'

export interface EmployeeByIdState {
  loading: boolean
  error: boolean
  data: Record<string, Employee>
}
export type EmployeeByIdAction = Action<
  Partial<
    Omit<EmployeeByIdState, 'data'> & {
      data: Employee | Omit<UpdateEmployeeInput, 'id'>
      key?: string
    }
  >
>

export type EmployeeByIdReducerProps = (
  prevState: EmployeeByIdState,
  action: EmployeeByIdAction,
) => EmployeeByIdState

export enum ActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  DATA = 'data',
  ADD_ITEM = 'addItem',
  UPDATE_ITEM = 'updateItem',
}

export interface EmployeeByIdContextProps {
  state: EmployeeByIdState
  dispatch: React.Dispatch<EmployeeByIdAction>
}

export type EmployeeFetchResponse = {
  data: {
    employee: Omit<Employee, '__typename'>
  }
}

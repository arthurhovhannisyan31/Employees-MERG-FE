// deps
import React from 'react'
// model
import { Employee, Employees } from '_/model/generated'
import { IAction, IFetchError } from '_/model/common'

export interface IEmployeesState {
  loading: boolean
  error: Record<string, string> | null
  data: Record<string, Employee[]>
  count: number
}
export type TEmployeesAction = IAction<
  Partial<Omit<IEmployeesState, 'data'> & { data: Employee[]; key: string }>
>
export type TEmployeesReducer = (
  prevState: IEmployeesState,
  action: TEmployeesAction,
) => IEmployeesState
export enum EActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  COUNT = 'count',
  DATA = 'data',
}
export interface IEmployeesContext {
  state: IEmployeesState
  initState: IEmployeesState
  dispatch: React.Dispatch<TEmployeesAction>
}
export interface IEmployeesFetchResponse {
  data: {
    employees: Omit<Employees, '__typename'>
  }
  errors?: IFetchError[]
}

// deps
import React from 'react'
// model
import { Employee } from '_/model/generated/graphql'
import { IAction } from '_/model/store'

export interface IEmployeesState {
  loading: boolean
  error: Record<string, string> | null
  data: Record<string, Employee[]>
  count: number
}
// todo refactor types
export type TEmployeesAction = IAction<
  Partial<Omit<IEmployeesState, 'data'> & { data: Employee[]; key: string }>
>

export type TEmployeesReducer = (
  prevState: IEmployeesState,
  action: TEmployeesAction,
) => IEmployeesState

export interface IEmployeesContext {
  state: IEmployeesState
  initState: IEmployeesState
  dispatch: React.Dispatch<TEmployeesAction>
}

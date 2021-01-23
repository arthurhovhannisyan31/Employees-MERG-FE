// deps
import React from 'react'
// model
import { Employee } from '_/model/generated/graphql'
import { IAction } from '_/model/store'

export interface IEmployeeByIdState {
  loading: boolean
  error: boolean
  data: Record<string, Employee>
}
// todo refactor types
export type TEmployeeByIdAction = IAction<
  Partial<Omit<IEmployeeByIdState, 'data'> & { data: Employee; key: string }>
>

export type TEmployeeByIdReducer = (
  prevState: IEmployeeByIdState,
  action: TEmployeeByIdAction,
) => IEmployeeByIdState

export interface IEmployeeByIdContext {
  state: IEmployeeByIdState
  dispatch: React.Dispatch<TEmployeeByIdAction>
}

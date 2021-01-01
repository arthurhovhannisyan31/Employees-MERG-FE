// deps
import React from 'react'
// model
import { Employee } from '_/model/generated/graphql'
import { IEventFormAction } from '_/containers/Events/types'

export interface IEmployeesState {
  loading: boolean
  error: boolean
  data: Employee[]
  count: number
  table: {
    rows: Record<string, unknown>[]
  }
}

export interface IEmployeesContext {
  state: IEmployeesState
  initState: IEmployeesState
  dispatch: React.Dispatch<IEventFormAction>
}

export interface IEmployeesRecucerAction {
  type: string
  prop?: string
  // todo fix types
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  payload?: any
}

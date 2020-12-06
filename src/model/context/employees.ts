// deps
import React from 'react'
// model
import { IEmployee } from '_/model/employee'
import { IEventFormAction } from '_/containers/Events/types'

export interface IEmployeesState {
  loading: boolean
  error: boolean
  data: IEmployee[]
  count: number
  table: {
    rows: Record<string, any>[]
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
  // eslint-disable-next-line
  payload?: any
}

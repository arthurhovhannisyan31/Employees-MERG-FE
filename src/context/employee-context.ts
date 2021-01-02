// deps
import React from 'react'
// model
import { Employee } from '_/model/generated/graphql'

export interface IEmployeeState {
  loading: boolean
  error: boolean
  data: Record<string, Employee>
}

export interface IEmployeesContext {
  state: IEmployeeState
  dispatch: React.Dispatch<any>
}

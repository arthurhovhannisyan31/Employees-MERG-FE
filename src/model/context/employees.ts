import { Action, FetchError } from 'model/common'
import { Employee, Employees } from 'model/generated'

export interface EmployeesState {
  loading: boolean
  ready: boolean
  error: Error | null
  data: Record<string, Employee[]>
  count: number
}

export interface EmployeesPayload extends Omit<EmployeesState, 'data'> {
  data: Employee[]
  key: string
}

export type EmployeesAction = Action<ActionTypes, Partial<EmployeesPayload>>

export type EmployeesReducer = (
  prevState: EmployeesState,
  action: EmployeesAction,
) => EmployeesState

export enum ActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  COUNT = 'count',
  DATA = 'data',
  READY = 'ready',
}
export interface EmployeesContextProps {
  state: EmployeesState
  initState: EmployeesState
  dispatch: (val: EmployeesAction) => void
}
export interface EmployeesFetchResponse {
  data: {
    employees: Omit<Employees, '__typename'>
  }
  errors?: FetchError[]
}

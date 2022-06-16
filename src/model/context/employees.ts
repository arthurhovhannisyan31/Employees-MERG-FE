import { Action, FetchError, RequestState } from 'model/common'
import { Employee, Employees } from 'model/generated'

export interface IEmployeesState {
  state: RequestState
  error: Error | null
  data: Record<string, Employee[]>
  count: number
}

export interface TEmployeesPayload {
  state: RequestState
  error: Error | null
  count: number
  data: Employee[]
  key: string
}

export type TEmployeesAction = Action<Partial<TEmployeesPayload>, ActionTypes>

export type TEmployeesReducer = (
  prevState: IEmployeesState,
  action: TEmployeesAction,
) => IEmployeesState

export enum ActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  COUNT = 'count',
  DATA = 'data',
}
export interface IEmployeesContext {
  state: IEmployeesState
  initState: IEmployeesState
  dispatch: (val: TEmployeesAction) => void
}
export interface IEmployeesFetchResponse {
  data: {
    employees: Omit<Employees, '__typename'>
  }
  errors?: FetchError[]
}

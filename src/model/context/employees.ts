import { Action, FetchError } from 'model/common'
import { Employee, Employees } from 'model/generated'

export interface IEmployeesState {
  loading: boolean
  error: Error
  data: Record<string, Employee[]>
  count: number
}
export type TEmployeesAction = Action<
  Partial<Omit<IEmployeesState, 'data'> & { data: Employee[]; key: string }>
>
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

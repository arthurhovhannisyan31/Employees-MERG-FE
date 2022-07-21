import { Action } from 'model/common'
import { Employee, UpdateEmployeeInput } from 'model/generated'

export interface EmployeeByIdState {
  loading: boolean
  error: Error | null
  data: Record<string, Employee>
}
export type EmployeeByIdAction = Action<
  ActionTypes,
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
  dispatch: (val: EmployeeByIdAction) => void
}

export type EmployeeFetchResponse = {
  data: {
    employee: Omit<Employee, '__typename'>
  }
}

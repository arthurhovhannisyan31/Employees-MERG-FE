import { IAction } from 'model/common'
import { Employee, UpdateEmployeeInput } from 'model/generated'

export interface IEmployeeByIdState {
  loading: boolean
  error: Record<string, string>
  data: Record<string, Employee>
}
export type TEmployeeByIdAction = IAction<
  Partial<
    Omit<IEmployeeByIdState, 'data'> & {
      data: Employee | Omit<UpdateEmployeeInput, 'id'>
      key?: string
    }
  >
>

export type TEmployeeByIdReducer = (
  prevState: IEmployeeByIdState,
  action: TEmployeeByIdAction,
) => IEmployeeByIdState

export enum EActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  DATA = 'data',
  ADD_ITEM = 'addItem',
  UPDATE_ITEM = 'updateItem',
}

export interface IEmployeeByIdContext {
  state: IEmployeeByIdState
  dispatch: (val: TEmployeeByIdAction) => void
}

export type TEmployeeFetchResponse = {
  data: {
    employee: Omit<Employee, '__typename'>
  }
}

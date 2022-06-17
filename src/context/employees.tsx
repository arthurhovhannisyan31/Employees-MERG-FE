import React, { createContext, FC, useReducer } from 'react'

import {
  ActionTypes,
  IEmployeesContext,
  IEmployeesState,
  TEmployeesReducer,
} from 'model/context/employees'
import { Employee } from 'model/generated'

const employeesInitState: IEmployeesState = {
  loading: false,
  ready: false,
  error: null,
  data: { '': [] },
  count: 0,
}

const employeesContextInitState: IEmployeesContext = {
  state: employeesInitState,
  initState: employeesInitState,
  dispatch: () => null,
}

const EmployeesContext = createContext<IEmployeesContext>(
  employeesContextInitState,
)

const employeesReducer: TEmployeesReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        [type]: !!payload[type],
      }
    case ActionTypes.ERROR:
      return {
        ...state,
        error: payload.error as Error,
      }
    case ActionTypes.COUNT:
      return {
        ...state,
        count: payload.count ?? 0,
      }
    case ActionTypes.DATA:
      return {
        ...state,
        ready: true,
        data: {
          ...state.data,
          [payload.key as string]: payload.data as Employee[],
        },
      }
    default:
      return state
  }
}

const EmployeesContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<TEmployeesReducer>(
    employeesReducer,
    employeesInitState,
  )
  return (
    <EmployeesContext.Provider
      value={{
        state,
        dispatch,
        initState: employeesInitState,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  )
}

export { EmployeesContextContainer as default, EmployeesContext }

import { produce } from 'immer'
import React, { createContext, FC, useReducer } from 'react'

import {
  ActionTypes,
  EmployeesContextProps,
  EmployeesState,
  EmployeesReducer,
  EmployeesAction,
} from 'model/context/employees'
import { Employee } from 'model/generated'

export const employeesInitState: EmployeesState = {
  loading: false,
  ready: false,
  error: null,
  data: { '': [] },
  count: 0,
}

export const employeesContextInitState: EmployeesContextProps = {
  state: employeesInitState,
  initState: employeesInitState,
  dispatch: () => null,
}

export const EmployeesContext = createContext<EmployeesContextProps>(
  employeesContextInitState,
)

export const employeesReducer = produce(
  (state: EmployeesState, action: EmployeesAction) => {
    const { type, payload } = action
    switch (type) {
      case ActionTypes.LOADING:
        state[type] = !!payload?.[type]
        break
      case ActionTypes.ERROR:
        state.error = payload?.error as Error
        break
      case ActionTypes.COUNT:
        state.count = payload?.count ?? 0
        break
      case ActionTypes.DATA:
        state.ready = true
        state.data[payload?.key as string] = payload?.data as Employee[]
        break
    }
  },
)

export const EmployeesContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<EmployeesReducer>(
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

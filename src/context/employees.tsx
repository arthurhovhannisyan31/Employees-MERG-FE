import { produce } from 'immer'
import React, { createContext, FC, useReducer } from 'react'

import {
  ActionTypes,
  IEmployeesContext,
  IEmployeesState,
  TEmployeesReducer,
  TEmployeesAction,
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

const employeesReducer = produce(
  (state: IEmployeesState, action: TEmployeesAction) => {
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

import React, { createContext, useReducer, FC } from 'react'

import {
  IEmployeesContext,
  IEmployeesState,
  TEmployeesReducer,
  ActionTypes,
} from 'model/context/employees'
import { Employee } from 'model/generated'

const employeesInitState: IEmployeesState = {
  loading: false,
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
    case ActionTypes.ERROR:
    case ActionTypes.COUNT:
      return {
        ...state,
        [type]: payload[type],
      }
    case ActionTypes.DATA:
      return {
        ...state,
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

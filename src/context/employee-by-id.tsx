import { produce } from 'immer'
import React, { createContext, useReducer, FC } from 'react'

import {
  EmployeeByIdState,
  EmployeeByIdContextProps,
  EmployeeByIdReducerProps,
  ActionTypes,
  EmployeeByIdAction,
} from 'model/context/employee'
import { Employee } from 'model/generated'

const employeeByIdInitState: EmployeeByIdState = {
  loading: false,
  error: null,
  data: {},
}

const EmployeeByIdContextInitState: EmployeeByIdContextProps = {
  state: employeeByIdInitState,
  dispatch: () => null,
}

const EmployeeByIdContext = createContext<EmployeeByIdContextProps>(
  EmployeeByIdContextInitState,
)

const employeeByIdReducer = produce(
  (state: EmployeeByIdState, action: EmployeeByIdAction) => {
    const { type, payload } = action
    switch (type) {
      case ActionTypes.LOADING:
        state.loading = !!payload?.loading
        break
      case ActionTypes.ERROR:
        state.error = payload?.error as Error
        break
      case ActionTypes.ADD_ITEM:
        state.data[payload?.key as string] = {
          ...state.data[payload?.key as string],
          ...(payload?.data as Employee),
        }
        break
      case ActionTypes.UPDATE_ITEM:
        state.data[payload?.key as string] = {
          ...state.data[payload?.key as string],
          ...(payload?.data as Employee),
        }
        break
    }
  },
)

const EmployeeContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<EmployeeByIdReducerProps>(
    employeeByIdReducer,
    employeeByIdInitState,
  )
  return (
    <EmployeeByIdContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EmployeeByIdContext.Provider>
  )
}

export { EmployeeContextContainer as default, EmployeeByIdContext }

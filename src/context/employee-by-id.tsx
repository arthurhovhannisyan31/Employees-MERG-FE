import { produce } from 'immer'
import React, { createContext, useReducer, FC } from 'react'

import {
  EmployeeByIdState,
  EmployeeByIdContextProps,
  EmployeeByIdReducerProps,
  ActionTypes,
  EmployeeByIdAction,
  EmployeeContextContainerProps,
} from 'model/context/employee'
import { Employee } from 'model/generated'

export const employeeByIdInitState: EmployeeByIdState = {
  loading: false,
  error: null,
  data: {},
}

export const EmployeeByIdContextInitState: EmployeeByIdContextProps = {
  state: employeeByIdInitState,
  dispatch: () => null,
}

export const EmployeeByIdContext = createContext<EmployeeByIdContextProps>(
  EmployeeByIdContextInitState,
)

export const employeeByIdReducer = produce(
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
        // TODO replace key with _id
        // TODO split cases and make it verbose
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

export const EmployeeContextContainer: FC<EmployeeContextContainerProps> = ({
  children,
  initState = employeeByIdInitState,
}) => {
  const [state, dispatch] = useReducer<EmployeeByIdReducerProps>(
    employeeByIdReducer,
    initState,
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

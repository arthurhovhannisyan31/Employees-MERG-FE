import React, { createContext, useReducer, FC } from 'react'

import {
  EmployeeByIdState,
  EmployeeByIdContextProps,
  EmployeeByIdReducerProps,
  ActionTypes,
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

const employeeByIdReducer: EmployeeByIdReducerProps = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.LOADING:
    case ActionTypes.ERROR:
      return {
        ...state,
        [type]: payload[type],
      }
    case ActionTypes.ADD_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key as string]: payload.data as Employee,
        },
      }
    case ActionTypes.UPDATE_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key as string]: {
            ...state.data[payload.key as string],
            ...(payload.data as Employee),
          },
        },
      }
    default:
      return state
  }
}

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

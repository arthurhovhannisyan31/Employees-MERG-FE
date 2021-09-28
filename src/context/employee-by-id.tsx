import React, { createContext, useReducer, FC } from 'react'

import {
  IEmployeeByIdState,
  IEmployeeByIdContext,
  TEmployeeByIdReducer,
  EActionTypes,
} from 'model/context/employee'
import { Employee } from 'model/generated'

const employeeByIdInitState: IEmployeeByIdState = {
  loading: false,
  error: false,
  data: {},
}

const EmployeeByIdContextInitState: IEmployeeByIdContext = {
  state: employeeByIdInitState,
  dispatch: () => null,
}

const EmployeeByIdContext = createContext<IEmployeeByIdContext>(
  EmployeeByIdContextInitState,
)

const employeeByIdReducer: TEmployeeByIdReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case EActionTypes.LOADING:
    case EActionTypes.ERROR:
      return {
        ...state,
        [type]: payload[type],
      }
    case EActionTypes.ADD_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key as string]: payload.data as Employee,
        },
      }
    case EActionTypes.UPDATE_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key as string]: {
            ...state.data[payload.key as string],
            ...payload.data,
          },
        },
      }
    default:
      return state
  }
}

const EmployeeContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<TEmployeeByIdReducer>(
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

// deps
import React from 'react'
// model
import {
  IEmployeeByIdState,
  IEmployeeByIdContext,
  TEmployeeByIdReducer,
  EActionTypes,
} from '_/model/context/employee'
import { Employee } from '_/model/generated'

const employeeByIdInitState: IEmployeeByIdState = {
  loading: false,
  error: false,
  data: {},
}

const EmployeeByIdContextInitState: IEmployeeByIdContext = {
  state: employeeByIdInitState,
  dispatch: () => {},
}

const EmployeeByIdContext = React.createContext<IEmployeeByIdContext>(
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
      console.log(payload)
      console.log(state.data)
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

const EmployeeContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<TEmployeeByIdReducer>(
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

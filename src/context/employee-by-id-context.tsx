// deps
import React from 'react'
// model
import { IEmployeeByIdState, IEmployeeByIdContext, TEmployeeByIdReducer, } from '_/model/context/employee'
import { Employee } from "_/model/generated/graphql";

const employeeByIdInitState: IEmployeeByIdState = {
  loading: false,
  error: false,
  data: {},
}

const EmployeeByIdContextInitState: IEmployeeByIdContext = {
  state: employeeByIdInitState,
  dispatch: () => {},
}

const EmployeeByIdContext = React.createContext<IEmployeeByIdContext>(EmployeeByIdContextInitState)
// todo refactor types
const employeeByIdReducer: TEmployeeByIdReducer = (
  state, action,
) => {
  const { type, payload } = action
  switch (type) {
    case 'loading':
    case 'error':
      return {
        ...state,
        [type]: payload[type],
      }
    case 'data':
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key as string]: payload.data as Employee,
        }
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

export { EmployeeContextContainer as default, EmployeeByIdContext, }

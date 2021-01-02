// deps
import React from 'react'
// model
import {
  IEmployeeByIdState, IEmployeesByIdContext, TEmployeeByIdReducer,
} from '_/model/context/employee'

const employeeByIdInitState: IEmployeeByIdState = {
  loading: false,
  error: false,
  data: {
  },
}

const EmployeeByIdContextInitState: IEmployeesByIdContext = {
  state: employeeByIdInitState,
  dispatch: () => {},
}

const EmployeeByIdContext = React.createContext<IEmployeesByIdContext>(EmployeeByIdContextInitState)

const employeeByIdReducer: TEmployeeByIdReducer = (
  state, action,
) => {
  const { type, payload } = action
  switch (type) {
    case 'loading':
    case 'error':
    case 'data':
      return {
        ...state,
        [type]: payload[type] as IEmployeeByIdState[typeof type],
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

export {
  EmployeeContextContainer as default, EmployeeByIdContext,
}

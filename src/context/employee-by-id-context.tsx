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
  const {
    type, payload,
  } = action
  switch (type) {
    case 'loading':
      return {
        ...state,
        loading: payload.loading as IEmployeeByIdState['loading'],
      }
    case 'error':
      return {
        ...state,
        error: payload.error as IEmployeeByIdState['error'],
      }
    case 'data':
      return {
        ...state,
        data: payload.data as IEmployeeByIdState['data'],
      }
    default:
      return state
  }
}

const EmployeeContextContainer: React.FC = ({
  children,
}) => {
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

// deps
import React from 'react'
// model
import {
  IEmployeesContext,
  IEmployeesRecucerAction,
  IEmployeesState,
} from '_/model/context/employees'

const employeesInitState = {
  loading: false,
  error: false,
  data: [],
  count: 0,
  table: {
    rows: [],
  },
}

const employeesContextInitState = {
  state: employeesInitState,
  initState: employeesInitState,
  dispatch: () => {},
}

const EmployeesContext = React.createContext<IEmployeesContext>(
  employeesContextInitState
)

const employeesReducer = (
  state: IEmployeesState,
  action: IEmployeesRecucerAction
) => {
  const { type, payload } = action
  switch (type) {
    case 'employees.loading':
      return {
        ...state,
        loading: payload,
      }
    case 'employees.error':
      return {
        ...state,
        error: payload,
      }
    case 'employees.data':
      return {
        ...state,
        data: payload,
      }
    case 'employees.count':
      return {
        ...state,
        count: payload,
      }
    case 'table.rows':
      return {
        ...state,
        table: {
          ...state.table,
          rows: payload,
        },
      }
    default:
      return state
  }
}

const EmployeesContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    employeesReducer,
    employeesInitState
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

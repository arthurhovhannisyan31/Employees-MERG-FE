// deps
import React from 'react'
// model
import { IEmployee } from '_/model/employee'
import { IEventFormAction } from '_/containers/Events/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IEmployeesState {
  loading: boolean
  error: boolean
  data: IEmployee[]
  count: number
  table: {
    rows: any[]
  }
}

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

interface IEmployeesContext {
  state: IEmployeesState
  initState: IEmployeesState
  dispatch: React.Dispatch<IEventFormAction>
}

const EmployeesContext = React.createContext<IEmployeesContext>(
  employeesContextInitState
)

interface IEmployeesRecucerAction {
  type: string
  prop?: string
  // eslint-disable-next-line
  payload?: any
}

const employeesReducer = (
  state: IEmployeesState,
  action: IEmployeesRecucerAction
) => {
  // eslint-disable-next-line
  // @ts-ignore
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

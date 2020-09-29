// deps
import React from 'react'
import { IEventFormAction } from '_/containers/Events/types'
// helpers

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IEmployeesState {}

const employeesInitState = {
  state: {},
  initState: {},
  dispatch: () => {},
}

interface IEmployeesContext {
  state: IEmployeesState
  initState: IEmployeesState
  dispatch: React.Dispatch<IEventFormAction>
}

const EmployeesContext = React.createContext<IEmployeesContext>(
  employeesInitState
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
  const { type, prop, payload } = action
  switch (type) {
    case 'one':
      return {
        ...state,
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

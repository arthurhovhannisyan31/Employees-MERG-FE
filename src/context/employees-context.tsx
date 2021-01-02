// deps
import React from 'react'
// model
import {
  IEmployeesContext, IEmployeesState, TEmployeesReducer,
} from '_/model/context/employees';

const employeesInitState: IEmployeesState = {
  loading: false,
  error: null,
  data: [],
  count: 0,
}

const employeesContextInitState: IEmployeesContext = {
  state: employeesInitState,
  initState: employeesInitState,
  dispatch: () => {},
}

const EmployeesContext = React.createContext<IEmployeesContext>(
  employeesContextInitState,
)

const employeesReducer:TEmployeesReducer = (
  state,
  action,
) => {
  const { type, payload } = action
  switch (type) {
    case 'loading':
    case 'error':
    case 'data':
    case 'count':
      return {
        ...state,
        [type]: payload[type] as IEmployeesState[typeof type],
      }
    default:
      return state
  }
}

const EmployeesContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<TEmployeesReducer>(
    employeesReducer,
    employeesInitState,
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

export {
  EmployeesContextContainer as default, EmployeesContext,
}

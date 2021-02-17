// deps
import React from 'react'
// model
import {
  IEmployeesContext,
  IEmployeesState,
  TEmployeesReducer,
  EActionTypes,
} from '_/model/context/employees'
import { Employee } from '_/model/generated/graphql'

const employeesInitState: IEmployeesState = {
  loading: false,
  error: null,
  data: { '': [] },
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

const employeesReducer: TEmployeesReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case EActionTypes.LOADING:
    case EActionTypes.ERROR:
    case EActionTypes.COUNT:
      return {
        ...state,
        [type]: payload[type],
      }
    case EActionTypes.DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key as string]: payload.data as Employee[],
        },
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

export { EmployeesContextContainer as default, EmployeesContext }

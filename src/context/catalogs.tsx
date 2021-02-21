// deps
import React from 'react'
// model
import {
  ICatalogsContext,
  ICatalogsState,
  TCatalogsReducer,
  EActionTypes,
} from '_/model/context/catalogs'

const catalogsInitState: ICatalogsState = {
  loading: false,
  error: null,
  data: {
    departments: [],
    genders: [],
    titles: [],
  },
}
const catalogsContextInitState: ICatalogsContext = {
  state: catalogsInitState,
  dispatch: () => {},
}
const CatalogsContext = React.createContext<ICatalogsContext>(
  catalogsContextInitState,
)
const catalogsReducer: TCatalogsReducer = (state, action) => {
  const { type, payload, prop } = action
  switch (type) {
    case EActionTypes.LOADING:
    case EActionTypes.ERROR:
      return {
        ...state,
        [type]: payload[type],
      }
    case EActionTypes.DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [prop as string]: payload,
        },
      }
    default:
      return state
  }
}

const CatalogsContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<TCatalogsReducer>(
    catalogsReducer,
    catalogsInitState,
  )

  return (
    <CatalogsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CatalogsContext.Provider>
  )
}

export { CatalogsContextContainer as default, CatalogsContext }

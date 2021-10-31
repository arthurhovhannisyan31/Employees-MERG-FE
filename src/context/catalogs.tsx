import React, { createContext, useReducer, FC } from 'react'

import {
  CatalogsContextProps,
  CatalogsState,
  CatalogsReducer,
  ActionTypes,
  CatalogEntries,
} from 'model/context/catalogs'

const catalogsInitState: CatalogsState = {
  loading: false,
  error: null,
  data: {
    departments: [],
    genders: [],
    titles: [],
  },
}
const catalogsContextInitState: CatalogsContextProps = {
  state: catalogsInitState,
  dispatch: () => null,
}
const CatalogsContext = createContext<CatalogsContextProps>(
  catalogsContextInitState,
)
const catalogsReducer: CatalogsReducer = (state, action) => {
  const { type, payload, prop } = action
  switch (type) {
    case ActionTypes.LOADING:
    case ActionTypes.ERROR:
      return {
        ...state,
        [type]: payload[type],
      }
    case ActionTypes.DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [prop as string]: payload.data?.[prop as keyof CatalogEntries],
        },
      }
    default:
      return state
  }
}

const CatalogsContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<CatalogsReducer>(
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

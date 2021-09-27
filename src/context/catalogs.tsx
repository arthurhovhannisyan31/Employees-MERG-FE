import React, { createContext, useReducer, FC } from 'react'

import {
  ICatalogsContext,
  ICatalogsState,
  TCatalogsReducer,
  EActionTypes,
  ICatalogEntries,
} from 'model/context/catalogs'

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
  dispatch: () => null,
}
const CatalogsContext = createContext<ICatalogsContext>(
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
          [prop as string]: payload.data?.[prop as keyof ICatalogEntries],
        },
      }
    default:
      return state
  }
}

const CatalogsContextContainer: FC = ({ children }) => {
  const [state, dispatch] = useReducer<TCatalogsReducer>(
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

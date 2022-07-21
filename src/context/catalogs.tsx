import { produce } from 'immer'
import React, { createContext, useReducer, FC } from 'react'

import {
  CatalogsContextProps,
  CatalogsState,
  CatalogsReducer,
  ActionTypes,
  CatalogsAction,
} from 'model/context/catalogs'
import { Department, Gender, Title } from 'model/generated'

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
const catalogsReducer = produce(
  (state: CatalogsState, action: CatalogsAction) => {
    const { type, payload, prop } = action
    switch (type) {
      case ActionTypes.LOADING:
        state.loading = !!payload?.loading
        break
      case ActionTypes.ERROR:
        state.error = payload?.error as Error
        break
      case ActionTypes.DATA: {
        switch (prop) {
          case 'departments': {
            state.data.departments = payload?.data?.departments as Department[]
            break
          }
          case 'genders': {
            state.data.genders = payload?.data?.genders as Gender[]
            break
          }
          case 'titles': {
            state.data.titles = payload?.data?.titles as Title[]
            break
          }
        }
        break
      }
    }
  },
)

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

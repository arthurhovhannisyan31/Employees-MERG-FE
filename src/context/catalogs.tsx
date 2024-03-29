import { produce } from 'immer'
import React, { createContext, useReducer, FC } from 'react'

import {
  CatalogsContextProps,
  CatalogsState,
  CatalogsReducer,
  ActionTypes,
  CatalogsAction,
  CatalogsContextContainerProps,
} from 'model/context/catalogs'
import { Department, Gender, Title } from 'model/generated'

export const catalogsInitState: CatalogsState = {
  loading: false,
  error: null,
  data: {
    departments: [],
    genders: [],
    titles: [],
  },
}

export const catalogsContextInitState: CatalogsContextProps = {
  state: catalogsInitState,
  dispatch: () => null,
}

export const CatalogsContext = createContext<CatalogsContextProps>(
  catalogsContextInitState,
)

export const catalogsReducer = produce(
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

export const CatalogsContextContainer: FC<CatalogsContextContainerProps> = ({
  children,
  initState = catalogsInitState,
}) => {
  const [state, dispatch] = useReducer<CatalogsReducer>(
    catalogsReducer,
    initState,
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

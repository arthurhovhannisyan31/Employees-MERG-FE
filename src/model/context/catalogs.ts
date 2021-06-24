import React from 'react'
// model
import { Department, Gender, Title } from 'model/generated'
import { Action } from 'model/common'

export interface CatalogEntries {
  departments: Department[]
  genders: Gender[]
  titles: Title[]
}

export interface CatalogsState {
  loading: boolean
  error: Record<string, string> | null
  data: Partial<CatalogEntries>
}

export type CatalogsAction = Action<
  Partial<
    Omit<CatalogsState, 'data'> & {
      data: Partial<CatalogEntries>
    }
  >
>

export type CatalogsReducer = (
  prevState: CatalogsState,
  action: CatalogsAction,
) => CatalogsState

export enum ActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  DATA = 'data',
}

export interface CatalogsContextProps {
  state: CatalogsState
  dispatch: React.Dispatch<CatalogsAction>
}

export type DepartmentsFetchResponse = {
  data: {
    departments: Omit<Department, '__typename'>[]
  }
}

export type GendersFetchResponse = {
  data: {
    genders: Omit<Gender, '__typename'>[]
  }
}

export type TitleFetchResponse = {
  data: {
    titles: Omit<Title, '__typename'>[]
  }
}

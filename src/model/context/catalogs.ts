// deps
import React from 'react'
// model
import { Department, Gender, Title } from '_/model/generated/graphql'
import { IAction } from '_/model/store'

export interface ICatalogEntries {
  departments: Department[]
  genders: Gender[]
  titles: Title[]
}

export interface ICatalogsState {
  loading: boolean
  error: Record<string, string> | null
  data: ICatalogEntries
}

export type TCatalogsAction = IAction<Partial<ICatalogsState>>

export type TCatalogsReducer = (
  prevState: ICatalogsState,
  action: TCatalogsAction,
) => ICatalogsState

export enum EActionTypes {
  LOADING = 'loading',
  ERROR = 'error',
  DATA = 'data',
}

export interface ICatalogsContext {
  state: ICatalogsState
  dispatch: React.Dispatch<TCatalogsAction>
}

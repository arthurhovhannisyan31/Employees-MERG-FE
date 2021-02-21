// deps
import React from 'react'
// model
import { Department, Gender, Title } from '_/model/generated/graphql'
import { IAction } from '_/model/common'

export interface ICatalogEntries {
  departments: Department[]
  genders: Gender[]
  titles: Title[]
}

export interface ICatalogsState {
  loading: boolean
  error: Record<string, string> | null
  data: Partial<ICatalogEntries>
}

export type TCatalogsAction = IAction<
  Partial<
    Omit<ICatalogsState, 'data'> & {
      data: Partial<ICatalogEntries>
    }
  >
>

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

export type TDepartmentsFetchResponse = {
  data: {
    departments: Omit<Department, '__typename'>[]
  }
}

export type TGendersFetchResponse = {
  data: {
    genders: Omit<Gender, '__typename'>[]
  }
}

export type TTitleFetchResponse = {
  data: {
    titles: Omit<Title, '__typename'>[]
  }
}

import { AbstractContextContainerProps, CustomAction } from 'model/common'
import { Department, Gender, Title } from 'model/generated'

export interface CatalogEntries {
  departments: Department[]
  genders: Gender[]
  titles: Title[]
}

export interface CatalogsState {
  loading: boolean
  error: Error | null
  data: Partial<CatalogEntries>
}

export type CatalogsAction = CustomAction<
  ActionTypes,
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
  dispatch: (val: CatalogsAction) => void
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

export type CatalogsContextContainerProps =
  AbstractContextContainerProps<CatalogsState>

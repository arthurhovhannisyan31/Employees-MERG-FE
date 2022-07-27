import { getError } from 'context/__tests__/error.mock'
import { catalogsInitState, catalogsReducer } from 'context/catalogs'
import { getAction, getCustomAction } from 'context/helpers'

import {
  ActionTypes,
  CatalogsAction,
  CatalogsState,
} from 'model/context/catalogs'
import { Department, Gender, Title } from 'model/generated'

const setup = (action: CatalogsAction): CatalogsState =>
  catalogsReducer(catalogsInitState, action)

describe('catalogs context reducer', () => {
  it(ActionTypes.LOADING, () => {
    const payload = true
    const action: CatalogsAction = getAction(ActionTypes.LOADING, {
      loading: payload,
    })
    const state = setup(action)

    expect(state.loading).toEqual(true)
  })
  it(`${ActionTypes.DATA} departments`, () => {
    const departments: Department[] = [
      {
        _id: 'id',
        name: 'Department',
      },
    ]

    const action: CatalogsAction = getCustomAction(
      ActionTypes.DATA,
      {
        data: { departments },
      },
      'departments',
    )
    const state = setup(action)

    expect(state.data.departments).toEqual(departments)
  })
  it(`${ActionTypes.DATA} titles`, () => {
    const titles: Title[] = [
      {
        _id: 'id',
        name: 'Title',
      },
    ]
    const action: CatalogsAction = getCustomAction(
      ActionTypes.DATA,
      {
        data: { titles },
      },
      'titles',
    )
    const state = setup(action)

    expect(state.data.titles).toEqual(titles)
  })
  it(`${ActionTypes.DATA} genders`, () => {
    const genders: Gender[] = [
      {
        _id: 'id',
        name: 'Gender',
      },
    ]
    const action: CatalogsAction = getCustomAction(
      ActionTypes.DATA,
      {
        data: { genders },
      },
      'genders',
    )
    const state = setup(action)

    expect(state.data.genders).toEqual(genders)
  })
  it(ActionTypes.ERROR, () => {
    const payload = getError('Error', 'nestedError')
    const action: CatalogsAction = getAction(ActionTypes.ERROR, {
      error: payload,
    })
    const state = setup(action)

    expect(state.error).toEqual(payload)
  })
})

import { getError } from 'context/__tests__/error.mock'
import { employeesReducer, employeesInitState } from 'context/employees'
import { getAction } from 'context/helpers'

import {
  ActionTypes,
  EmployeesAction,
  EmployeesState,
} from 'model/context/employees'

const setup = (
  action: EmployeesAction,
  state = employeesInitState,
): EmployeesState => employeesReducer(state, action)

describe('employees context reducer', () => {
  it(ActionTypes.LOADING, () => {
    const payload = true
    const action: EmployeesAction = getAction(ActionTypes.LOADING, {
      loading: payload,
    })
    const state = setup(action)
    expect(state.loading).toEqual(payload)
  })
  it(ActionTypes.ERROR, () => {
    const payload = getError('Error', 'nestedError')
    const action: EmployeesAction = getAction(ActionTypes.ERROR, {
      error: payload,
    })
    const state = setup(action)
    expect(state.error).toEqual(payload)
  })
  it(ActionTypes.DATA, () => {
    // TODO continue here
    expect(1).toEqual(1)
  })
  it(ActionTypes.DATA, () => {
    expect(1).toEqual(1)
  })
  it(ActionTypes.COUNT, () => {
    expect(1).toEqual(1)
  })
})

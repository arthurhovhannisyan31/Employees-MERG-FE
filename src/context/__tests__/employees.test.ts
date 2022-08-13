import { getEmployeeStub } from 'context/__tests__/employee-by-id.mock'
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
  it(ActionTypes.COUNT, () => {
    const payload = 5
    const action: EmployeesAction = getAction(ActionTypes.COUNT, {
      count: payload,
    })
    const state = setup(action)

    expect(state.count).toEqual(payload)
  })
  it(ActionTypes.DATA, () => {
    const key = '123'
    const payload = [getEmployeeStub()]
    const action: EmployeesAction = getAction(ActionTypes.DATA, {
      data: payload,
      key,
    })
    const state = setup(action)

    expect(state.data[key]).toEqual(payload)
  })
})

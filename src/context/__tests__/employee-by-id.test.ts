import { getEmployeeStub } from 'context/__tests__/employee-by-id.mock'
import { getError } from 'context/__tests__/error.mock'
import {
  employeeByIdInitState,
  employeeByIdReducer,
} from 'context/employee-by-id'
import { getAction } from 'context/helpers'

import {
  ActionTypes,
  EmployeeByIdAction,
  EmployeeByIdState,
} from 'model/context/employee'

const setup = (
  action: EmployeeByIdAction,
  state = employeeByIdInitState,
): EmployeeByIdState => employeeByIdReducer(state, action)

describe('employee-by-id context reducer', () => {
  it(ActionTypes.LOADING, () => {
    const payload = true
    const action: EmployeeByIdAction = getAction(ActionTypes.LOADING, {
      loading: payload,
    })
    const state = setup(action)

    expect(state.loading).toEqual(payload)
  })
  it(ActionTypes.ERROR, () => {
    const payload = getError('Error', 'nestedError')
    const action: EmployeeByIdAction = getAction(ActionTypes.ERROR, {
      error: payload,
    })
    const state = setup(action)

    expect(state.error).toEqual(payload)
  })
  it(ActionTypes.ADD_ITEM, () => {
    const key = '123'
    const payload = getEmployeeStub()
    const action: EmployeeByIdAction = getAction(ActionTypes.ADD_ITEM, {
      data: payload,
      key,
    })
    const state = setup(action)
    expect(state.data[key]).toEqual(payload)
  })
  it(ActionTypes.UPDATE_ITEM, () => {
    const key = '123'
    const initState = setup(
      getAction(ActionTypes.ADD_ITEM, {
        data: getEmployeeStub(),
        key,
      }),
    )

    const payload = getEmployeeStub({ title: 'test' })
    const action: EmployeeByIdAction = getAction(ActionTypes.UPDATE_ITEM, {
      data: payload,
      key,
    })
    const state = setup(action, initState)
    expect(state.data[key].title).toEqual(payload.title)
  })
})

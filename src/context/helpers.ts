import { Action, CustomAction } from 'model/common'

export const getAction = <T, P>(type: T, payload?: P): Action<T, P> => ({
  type,
  payload,
})

// TODO remove and refactor
export const getCustomAction = <T, P, S = string>(
  type: T,
  payload: P,
  prop?: S,
): CustomAction<T, P, S> => ({
  type,
  payload,
  prop,
})

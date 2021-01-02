export interface IAction<T> {
  type: string
  prop?: string
  payload: T
}

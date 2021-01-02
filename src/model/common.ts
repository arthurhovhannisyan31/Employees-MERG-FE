export interface IModule extends NodeModule {
  hot: {
    accept: (str: string, node: () => void) => void
  }
}

export interface IAction<T> {
  type: string
  prop?: string
  payload?: T
}

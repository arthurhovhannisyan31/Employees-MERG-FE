export interface IModule extends NodeModule {
  hot: {
    accept: (str: string, node: () => void) => void
  }
}

export interface IFetchError {
  message: string
  statusCode: number
}

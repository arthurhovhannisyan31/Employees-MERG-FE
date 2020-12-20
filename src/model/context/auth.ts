export interface IAuthState {
  token: string
  userId: string
  tokenExpiration: number
}

export interface IAuthContext extends IAuthState {
  login: (_: IAuthState) => void
  logout: () => void
  headers: Record<string, string>
}

export interface IAuthReducerAction {
  type: string
  payload?: IAuthState
}

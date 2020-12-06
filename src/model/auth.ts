export interface ILogin {
  email: string
  password: string
}

export interface IAuthData {
  userId: string
  token: string
  tokenExpiration: number
}

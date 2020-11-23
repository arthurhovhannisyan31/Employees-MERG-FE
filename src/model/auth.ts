import { IEvent } from '_/types'

export interface IUser {
  _id: string
  email: string
  password: string | null
  createdEvents: IEvent[]
}

export interface ILogin {
  email: string
  password: string
}

export interface IAuthData {
  userId: string
  token: string
  tokenExpiration: number
}

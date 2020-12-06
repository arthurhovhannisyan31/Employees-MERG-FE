// model
import { IEvent } from '_/model/event'

export interface IUserInput {
  userInput: {
    email: string
    password: string
  }
}

export interface IUser {
  _id: string
  email: string
  password: string | null
  createdEvents: IEvent[]
}

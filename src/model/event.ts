export interface IEvent {
  _id: string
  title: string
  description: string
  price: number
  date: string
  creator: IUser
}

export interface IEventID {
  eventId: string
}

export interface IEventInput {
  eventInput: {
    title: string
    description: string
    price: number
    date: string
  }
}

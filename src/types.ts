// global imports
// local imports

// instances
export interface IEvent {
  _id: string
  title: string
  description: string
  price: number
  date: string
  creator: IUser
}

export interface IUser {
  _id: string
  email: string
  password: string | null
  createdEvents: IEvent[]
}

export interface IBooking {
  _id: string
  createdAt: string
  updatedAt: string
  event: IEvent
  user: IUser
}

export interface IEventID {
  eventId: string
}

export interface IBookingID {
  bookingId: string
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

// inputs
export interface IEventInput {
  eventInput: {
    title: string
    description: string
    price: number
    date: string
  }
}

export interface IUserInput {
  userInput: {
    email: string
    password: string
  }
}

export interface IBookEventInput {
  eventId: string
}

export interface ICancelBookingInput {
  bookingId: string
}

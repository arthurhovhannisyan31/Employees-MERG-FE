// model
import { IEventInput } from '_/model/event'
import { IBookEventInput, ICancelBookingInput } from '_/model/booking'
import { ILogin } from '_/model/auth'

export const createUser = () => ({})

export const signUp = ({ email, password }: ILogin) => ({
  query: `
    mutation signUpMutation($email: String!, $password: String!) {
      createUser(userInput: {
        email: $email,
        password: $password
      }){
        _id
        email
      }
    }
  `,
  variables: {
    email,
    password,
  },
})

export const createEvent = ({
  eventInput: {
    date, description, price, title,
  },
}: IEventInput) => ({
  query: `
    mutation createEventMutation($title: String!, $description: String!, $price: Float!, $date: String!) {
      createEvent(eventInput: {
        title: $title,
        description: $description,
        price: $price,
        date: $date,
      }) {
        _id
        title
        description
        price
        date
      }
    }
  `,
  variables: {
    date,
    description,
    price,
    title,
  },
})

export const createBooking = ({ eventId }: IBookEventInput) => ({
  query: `
    mutation bookEventMutation($eventId: ID!) {
      bookEvent(eventId: $eventId) {
        _id
        event {
          _id
          title
          description
          price
          date
        }
        user {
          _id
          email
          password
        }
        createdAt
        updatedAt
    }
    } 
  `,
  variables: {
    eventId,
  },
})

export const cancelBooking = ({ bookingId }: ICancelBookingInput) => ({
  query: `
    mutation cancelBookingMutation ($bookingId: ID!) {
      cancelBooking(bookingId: $bookingId) {
        _id
        title
      }
    }
  `,
  variables: {
    bookingId,
  },
})

// model
import { ILogin } from '_/model/auth'
import { IGetEmployeesInput } from '_/model/employee'

export const loginQuery = ({ email, password }: ILogin) => ({
  query: `
        query loginQuery($email: String!, $password: String!) {
          login(
            email: $email, 
            password: $password){
              userId
              token
              tokenExpiration
            } 
        }
      `,
  variables: {
    email,
    password,
  },
})

export const getEvents = () => ({
  query: `
    query {
      events{
        _id
        title
        description
        price
        date
        creator {
          _id
          email
        }
      }
    }
  `,
})

export const getBookings = () => ({
  query: `
    query {
      bookings {
        _id
        createdAt
        event {
          _id
          title
          date
          description
          price
        }
      }
    }
  `,
})

export const getEmployees = ({ limit, offset }: IGetEmployeesInput) => ({
  query: `
    query employees($limit: Int!, $offset: Int!) {
      employees(input:{
        limit: $limit, 
        offset: $offset
      }) {
        nodes {
          _id
          birth_date
          first_name
          last_name
          hire_date
          gender {
            name
          }
        }
        count
      }
    }
  `,
  variables: {
    limit,
    offset,
  },
})

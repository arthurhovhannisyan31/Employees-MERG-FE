// model
import { ILogin } from '_/model/auth'
import { GetEmployeeInput, GetEmployeesInput } from '_/model/generated/graphql'
// helpers
import {
  employeeFragment,
  genderFragment,
  employeeDetailsFragment,
} from '_/gql/fragments'

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

export const getEmployees = ({ limit, offset }: GetEmployeesInput) => ({
  query: `
    query employees($limit: Int!, $offset: Int!) {
      employees(input:{
        limit: $limit, 
        offset: $offset
      }) {
        nodes {
          ${employeeFragment}
          ${genderFragment}
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

export const getEmployee = ({ id }: GetEmployeeInput) => ({
  query: `
    query employee($id: ID!){
      employee(input:{id: $id}){
        ${employeeDetailsFragment}
      }
    }
  `,
  variables: {
    id,
  },
})

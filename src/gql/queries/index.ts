// model
import { GetEmployeeInput, GetEmployeesInput, UserInput, } from '_/model/generated/graphql'
// helpers
import {
  employeeFragment,
  genderFragment,
  employeeDetailsFragment,
} from '_/gql/fragments'

export const loginQuery = ({ email, password }: UserInput) => ({
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
  variables: { id, },
})

// model
import {
  GetEmployeeInput,
  GetEmployeesInput,
  UserInput,
} from '_/model/generated/graphql'
// model
import { IQueryProps } from '_/model/common'
// helpers
import {
  employeeFragment,
  genderFragment,
  employeeDetailsFragment,
  userCredentials,
  departmentFragment,
  titleFragment,
} from '_/gql/fragments'

export const loginQuery = ({ email, password }: UserInput): IQueryProps => ({
  query: `
        query loginQuery($email: String!, $password: String!) {
          login(
            email: $email, 
            password: $password){
            userCredentials{
              id
              email
            }
            token
          } 
        }
      `,
  variables: {
    email,
    password,
  },
})

export const getEmployees = ({
  limit,
  offset,
}: GetEmployeesInput): IQueryProps => ({
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

export const getEmployee = ({ id }: GetEmployeeInput): IQueryProps => ({
  query: `
    query employee($id: ID!){
      employee(input:{id: $id}){
        ${employeeDetailsFragment}
      }
    }
  `,
  variables: { id },
})

export const getMe = (): IQueryProps => ({
  query: `
    query me {
      ${userCredentials}
    }
  `,
})

export const getDepartments = (): IQueryProps => ({
  query: `
    ${departmentFragment}
  `,
})

export const getTitles = (): IQueryProps => ({
  query: `
    ${titleFragment}
  `,
})

export const getGenders = (): IQueryProps => ({
  query: `
    ${titleFragment}
  `,
})

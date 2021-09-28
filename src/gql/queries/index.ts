import {
  employeeFragment,
  genderFragment,
  employeeDetailsFragment,
  userCredentials,
  departmentFragment,
  titleFragment,
} from 'gql/fragments'

import { IQueryProps } from 'model/common'
import { GetEmployeeInput, GetEmployeesInput, UserInput } from 'model/generated'

export const queryLogin = ({ email, password }: UserInput): IQueryProps => ({
  query: `
        query login($email: String!, $password: String!) {
          login(
            email: $email, 
            password: $password){
            userCredentials{
              _id
              email
            }
          } 
        }
      `,
  variables: {
    email,
    password,
  },
})

export const queryLogout = (): IQueryProps => ({
  query: `
        query logout {
          logout
        }
  `,
})

export const queryEmployees = ({
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
          gender
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

export const queryEmployee = ({ id }: GetEmployeeInput): IQueryProps => ({
  query: `
    query employee($id: ID!){
      employee(input:{id: $id}){
        ${employeeDetailsFragment}
      }
    }
  `,
  variables: { id },
})

export const queryMe = (): IQueryProps => ({
  query: `
    query me {
      ${userCredentials}
    }
  `,
})

export const queryDepartments = (): IQueryProps => ({
  query: `
    query departments{
      departments{
        ${departmentFragment}
      }
    }
  `,
})

export const queryTitles = (): IQueryProps => ({
  query: `
    query titles {
      titles{
        ${titleFragment}
      }
    }
  `,
})

export const queryGenders = (): IQueryProps => ({
  query: `
    query genders {
      genders{
        ${genderFragment}
      }
    }
  `,
})

// model
import {
  GetEmployeeInput,
  GetEmployeesInput,
  UserInput,
} from '_/model/generated'
// model
import { QueryProps } from 'model/common'
// helpers
import {
  employeeFragment,
  genderFragment,
  employeeDetailsFragment,
  userCredentials,
  departmentFragment,
  titleFragment,
} from 'gql/fragments'

export const queryLogin = ({ email, password }: UserInput): QueryProps => ({
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

export const queryLogout = (): QueryProps => ({
  query: `
        query logout {
          logout
        }
  `,
})

export const queryEmployees = ({
  limit,
  offset,
}: GetEmployeesInput): QueryProps => ({
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

export const queryEmployee = ({ id }: GetEmployeeInput): QueryProps => ({
  query: `
    query employee($id: ID!){
      employee(input:{id: $id}){
        ${employeeDetailsFragment}
      }
    }
  `,
  variables: { id },
})

export const queryMe = (): QueryProps => ({
  query: `
    query me {
      ${userCredentials}
    }
  `,
})

export const queryDepartments = (): QueryProps => ({
  query: `
    query departments{
      departments{
        ${departmentFragment}
      }
    }
  `,
})

export const queryTitles = (): QueryProps => ({
  query: `
    query titles {
      titles{
        ${titleFragment}
      }
    }
  `,
})

export const queryGenders = (): QueryProps => ({
  query: `
    query genders {
      genders{
        ${genderFragment}
      }
    }
  `,
})

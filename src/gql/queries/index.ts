// model
import {
  RootQueryEmployeeArgs,
  RootQueryEmployeesArgs,
  RootQueryForgotPasswordArgs,
  RootQueryLoginArgs,
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
  userResponseFragment,
} from 'gql/fragments'

export const queryLogin = ({
  input: { email, password },
}: RootQueryLoginArgs): QueryProps => ({
  query: `
        query login($email: String!, $password: String!) {
          login(
            email: $email, 
            password: $password){
              ${userResponseFragment}
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
  input: { limit, offset },
}: RootQueryEmployeesArgs): QueryProps => ({
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

export const queryEmployee = ({
  input: { id },
}: RootQueryEmployeeArgs): QueryProps => ({
  query: `
    query employee($id: ID!) {
      employee(input:{ id: $id }){
        ${employeeDetailsFragment}
      }
    }
  `,
  variables: { id },
})

export const queryMe = (): QueryProps => ({
  query: `
    query me {
      me {
        errors{
          field
          message
        }
        data{
          ${userCredentials}
        }
      }
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

export const queryForgetPassword = ({
  input: { email },
}: RootQueryForgotPasswordArgs): QueryProps => ({
  query: `
    query forgotPassword($email: String!) {
      forgotPassword(input:{ email: $email }){
        ${userResponseFragment}
      }
    }
  `,
  variables: {
    email,
  },
})

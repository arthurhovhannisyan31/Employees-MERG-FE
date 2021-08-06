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

export const queryLogin = ({ input }: RootQueryLoginArgs): QueryProps => ({
  query: `
    query login($input: LoginInput!) {
      login(input: $input){
          ${userResponseFragment}
        } 
    }
  `,
  variables: {
    input,
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
  input,
}: RootQueryEmployeesArgs): QueryProps => ({
  query: `
    query employees($input: GetEmployeesInput) {
      employees(input: $input) {
        nodes {
          ${employeeFragment}
          gender
        }
        count
      }
    }
  `,
  variables: { input: input || {} },
})

export const queryEmployee = ({
  input,
}: RootQueryEmployeeArgs): QueryProps => ({
  query: `
    query employee($input: GetEmployeeInput!) {
      employee(input: $input){
        ${employeeDetailsFragment}
      }
    }
  `,
  variables: { input },
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
  input,
}: RootQueryForgotPasswordArgs): QueryProps => ({
  query: `
    query forgotPassword($input: ForgotPasswordInput!) {
      forgotPassword(input: $input){
        ${userResponseFragment}
      }
    }
  `,
  variables: {
    input,
  },
})

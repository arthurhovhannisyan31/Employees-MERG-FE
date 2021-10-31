import { fieldErrorFragment, userCredentials } from 'gql/fragments'

import { QueryProps } from 'model/common'
import {
  RootMutationCreateUserArgs,
  UpdateEmployeeInput,
  UpdatePasswordInput,
} from 'model/generated'

// export const createUser = (): void => ({})

export const mutationSignUp = ({
  input,
}: RootMutationCreateUserArgs): QueryProps => ({
  query: `
    mutation signUpMutation($input: UserInput!) {
      createUser(input: $input){
        ${userCredentials}
      }
    }
  `,
  variables: {
    input,
  },
})

export const mutationUpdateEmployee = (
  input: UpdateEmployeeInput,
): QueryProps => ({
  query: `
    mutation updateEmployeeMutation($input: UpdateEmployeeInput!) {
      updateEmployee(input: $input){
        _id
      }
    }
  `,
  variables: {
    input,
  },
})

export const mutationUpdatePassword = (
  input: UpdatePasswordInput,
): QueryProps => ({
  query: `
    mutation updatePassword($input: UpdatePasswordInput!) {
      updatePassword(input: $input){
        data{
          ${userCredentials}
        }
        errors
      }
    }
  `,
  variables: {
    input,
  },
})

export const mutationCreateUser = ({
  input,
}: RootMutationCreateUserArgs): QueryProps => ({
  query: `
    mutation createUser($input: CreateUserInput!) {
      createUser(input: $input) {
        data {
          ${userCredentials}
        }
        errors{
          ${fieldErrorFragment}
        }
      }
    }
  `,
  variables: {
    input,
  },
})

// model
import {
  RootMutationCreateUserArgs,
  UpdateEmployeeInput,
} from 'model/generated'
import { QueryProps } from 'model/common'
// helpers
import { userCredentials } from 'gql/fragments'

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

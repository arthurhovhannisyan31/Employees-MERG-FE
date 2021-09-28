import { UpdateEmployeeInput, UserInput } from 'model/generated'

import { IQueryProps } from '../../model/common'

// export const createUser = () => {}

export const signUp = ({ email, password }: UserInput): IQueryProps => ({
  query: `
    mutation signUpMutation($email: String!, $password: String!) {
      createUser(userInput: {
        email: $email,
        password: $password
      }){
        _id
        email
      }
    }
  `,
  variables: {
    email,
    password,
  },
})

export const updateEmployee = (input: UpdateEmployeeInput): IQueryProps => ({
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

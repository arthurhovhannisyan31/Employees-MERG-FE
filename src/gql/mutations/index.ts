// model
import { UpdateEmployeeInput, UserInput } from 'model/generated'
import { QueryProps } from 'model/common'

// export const createUser = (): void => ({})

// TODO replace with type for singup
export const mutationSignUp = ({ email, password }: UserInput): QueryProps => ({
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

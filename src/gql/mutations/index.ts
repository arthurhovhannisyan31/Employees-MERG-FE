// model
import { UpdateEmployeeInput, UserInput } from '_/model/generated'

export const createUser = () => ({})

export const signUp = ({ email, password }: UserInput) => ({
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

export const updateEmployee = (input: UpdateEmployeeInput) => ({
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

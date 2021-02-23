// model
import { UserInput } from '_/model/generated/graphql'

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

export const updateEmployee = () => ({
  query: '',
  variables: {},
})

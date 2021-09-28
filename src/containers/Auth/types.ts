import { QueryProps } from 'model/common'
import { UserInput } from 'model/generated'

export type AuthQuery = 'signUp' | 'signIn'

export type AuthQueryMap = Record<AuthQuery, (props: UserInput) => QueryProps>

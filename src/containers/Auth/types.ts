import { QueryProps } from '_/model/common'
import { UserInput } from '_/model/generated'

export type AuthQuery = 'signUp' | 'signIn'

export type AuthQueryMap = Record<AuthQuery, (props: UserInput) => QueryProps>

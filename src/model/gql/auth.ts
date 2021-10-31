import { QueryResponse, OmitTypeName } from 'model/common'
import {
  AuthResponse,
  CreateUserResponse,
  MeResponse,
  UpdatePasswordResponse,
} from 'model/generated'

export interface QueryMeData {
  me: OmitTypeName<MeResponse>
}

export type QueryMeResponse = QueryResponse<QueryMeData>

export interface QueryLoginData {
  login: OmitTypeName<AuthResponse>
}
export type QueryLoginResponse = QueryResponse<QueryLoginData>

export interface QueryLogoutData {
  logout: boolean
}
export type QueryLogoutResponse = QueryResponse<QueryLogoutData>

export interface MutationUpdatePasswordData {
  updatePassword: OmitTypeName<UpdatePasswordResponse>
}
export type MutationUpdatePasswordResponse =
  QueryResponse<MutationUpdatePasswordData>

export interface MutationCreateUserData {
  createUser: OmitTypeName<CreateUserResponse>
}
export type MutationCreateUserResponse = QueryResponse<MutationCreateUserData>

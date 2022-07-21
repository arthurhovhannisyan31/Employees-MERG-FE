import { RouteName, RoutePath } from 'model/routes/configs'

export interface RouteConfig {
  key: RouteName
  label: string
  exact?: boolean
  isPrivate?: boolean
  path: string
  basePath: RoutePath
}
export type RouteMap = Record<RouteName, RouteConfig>

import { ReactNode } from 'react'

import { RouteName } from 'model/routes/configs'
import { RouteConfig } from 'model/routes/types'

export type TRouteIconMap = Partial<Record<RouteName, ReactNode>>

export interface IMenuDrawerItem extends RouteConfig {
  icon: ReactNode
}

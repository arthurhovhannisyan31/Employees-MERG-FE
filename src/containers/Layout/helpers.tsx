import { Home, People, Info } from '@material-ui/icons'
import React from 'react'

import { IMenuDrawerItem, TRouteIconMap } from 'containers/Layout/types'

import { RouteName } from 'model/routes/configs'
import { RouteMap } from 'model/routes/types'

export const routesIconMap: TRouteIconMap = {
  [RouteName.HOME]: <Home />,
  [RouteName.EMPLOYEES]: <People />,
  [RouteName.ABOUT]: <Info />,
}

export const getMenuDrawerItems = (
  routes: RouteMap,
  iconMap: TRouteIconMap,
): IMenuDrawerItem[] =>
  Object.entries(iconMap).reduce((acc: IMenuDrawerItem[], [key, icon]) => {
    if (key in routes) {
      acc.push({
        ...routes[key as RouteName],
        icon,
      })
    }
    return acc
  }, [])

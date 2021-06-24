// deps
import React from 'react'
import { Home, People, Info } from '@material-ui/icons'
// model
import { RouteName, RouteMap } from '_/model/common'
import { IMenuDrawerItem, TRouteIconMap } from '_/containers/Layout/types'

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

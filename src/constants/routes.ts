import { RouteName, RoutePath, RouteMap, routeNameLabelMap } from 'model/common'

export const ROUTES: RouteMap = {
  [RouteName.HOME]: {
    label: routeNameLabelMap[RouteName.HOME],
    url: RoutePath.HOME,
  },
  [RouteName.AUTH]: {
    label: routeNameLabelMap[RouteName.AUTH],
    url: RoutePath.AUTH,
  },
  [RouteName.CHANGE_PASSWORD]: {
    label: routeNameLabelMap[RouteName.CHANGE_PASSWORD],
    url: RoutePath.CHANGE_PASSWORD,
  },
  [RouteName.ABOUT]: {
    label: routeNameLabelMap[RouteName.ABOUT],
    url: RoutePath.ABOUT,
  },
  [RouteName.EMPLOYEES]: {
    label: routeNameLabelMap[RouteName.EMPLOYEES],
    url: RoutePath.EMPLOYEES,
  },
  [RouteName.EMPLOYEE]: {
    label: routeNameLabelMap[RouteName.EMPLOYEE],
    url: RoutePath.EMPLOYEES,
  },
  [RouteName.NOT_FOUND]: {
    label: routeNameLabelMap[RouteName.NOT_FOUND],
    url: RoutePath.NOT_FOUND,
  },
}

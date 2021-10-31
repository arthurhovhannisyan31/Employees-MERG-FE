import { useMemo } from 'react'

import { routes } from 'routes/app-routes'
import { getAuthFreeRoutes } from 'routes/helpers'

export const useIsAuthFreeRoute = (route: string): boolean => {
  const nonPrivateRoutes = useMemo(() => getAuthFreeRoutes(routes), [])
  return nonPrivateRoutes.some((routeBase) => route.includes(routeBase))
}

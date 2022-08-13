import React, { ReactNode } from 'react'

import { ContextComposeMock } from 'context/__tests__/context-compose.mock'

export const contextWrap = (component: ReactNode): JSX.Element => {
  return <ContextComposeMock>{component}</ContextComposeMock>
}

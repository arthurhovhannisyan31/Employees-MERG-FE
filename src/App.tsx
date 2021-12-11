import 'date-fns'
import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Root from 'containers/Root'
import ContextCompose from 'context'

const App: FC = () => (
  <ContextCompose>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </ContextCompose>
)
export default App

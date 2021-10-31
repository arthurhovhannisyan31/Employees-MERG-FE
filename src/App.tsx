import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'date-fns'
import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Root from 'containers/Root'
import ContextCompose from 'context'

const App: FC = () => (
  <ContextCompose>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Root />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </ContextCompose>
)
export default App

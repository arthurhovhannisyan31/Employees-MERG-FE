// deps
import 'date-fns'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
// components
import Root from '_/containers/Root'
// helpers
import ContextCompose from '_/context'

const App: React.FC = () => (
  <ContextCompose>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Root />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </ContextCompose>
)

export default App

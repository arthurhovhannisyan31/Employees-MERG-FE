// deps
import 'date-fns'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
// local
import Root from '_/containers/Root'
import ContextCompose from '_/context'

const App: React.FC = () => {
  return (
    <ContextCompose>
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Root />
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </ContextCompose>
  )
}

export default App

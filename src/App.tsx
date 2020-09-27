// deps
import 'date-fns'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
// local
import Root from '_/pages/Root'
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

// find layout for employees

// todo add layout component
// todo add token expiration
// todo add employees model

// todo hire employee
// todo fire employee
// todo promote employee
// todo downgrade employee
// todo change salary salary
// todo make payoff
// todo analytics

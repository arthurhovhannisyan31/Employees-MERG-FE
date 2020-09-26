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

// todo add style loader to webpack
// todo add layout component
// todo add token expiration
// todo https://webpack.js.org/guides/hot-module-replacement/
// todo add employees model
// hire employee
// fire employee
// promote employee
// downgrade employee
// change salary salary
// make payoff
// analytics

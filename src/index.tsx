// deps
import React from 'react'
import { render } from 'react-dom'
// local
import App from './App'

const renderApp = () =>
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )

renderApp()
// eslint-disable-next-line
// @ts-ignore
if (module.hot) {
  // eslint-disable-next-line
  // @ts-ignore
  module.hot.accept('./App', renderApp)
}

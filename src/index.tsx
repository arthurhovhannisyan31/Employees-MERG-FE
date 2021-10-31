import React from 'react'
import { render } from 'react-dom'

import App from './App'

const renderApp = (): void =>
  // TODO add create root
  render(
    // TODO 12.03.2021 Return after update material-ui to v5
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>
    document.getElementById('root'),
  )

renderApp()

if (module.hot) {
  module.hot.accept()
}

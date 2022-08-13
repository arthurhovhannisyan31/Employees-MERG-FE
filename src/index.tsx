import React from 'react'
import { render } from 'react-dom'

import 'utils/metrics'

import App from './App'

const renderApp = (): void => render(<App />, document.getElementById('root'))

renderApp()

if (module.hot) {
  renderApp()
}

import React from 'react'
// eslint-disable-next-line
// @ts-ignore
import { createRoot } from 'react-dom'

import 'utils/metrics'

import App from './App'

const root = createRoot(document.getElementById('root'))
const renderApp = (): void => root.render(<App />)

renderApp()

if (module.hot) {
  module.hot.accept()
}

import React from 'react'
// eslint-disable-next-line
// @ts-ignore
import { createRoot } from 'react-dom'

import 'utils/metrics'

import App from './App'

const root = createRoot(document.getElementById('root'))
const renderApp = (): void =>
  root.render(
    // TODO 12.03.2021 Return after update material-ui to v5
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>
  )

renderApp()

if (module.hot) {
  module.hot.accept()
}

// deps
import React from 'react'
import { render } from 'react-dom'
// local
import App from '_/App'
import { IModule } from '_/model/common'

const renderApp = () =>
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )

renderApp()

const hmodule: IModule = module as IModule
if (hmodule.hot) {
  hmodule.hot.accept('./App', renderApp)
}

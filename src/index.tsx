// deps
import React from 'react'
import { render } from 'react-dom'
// components
import App from '_/App'
// model
import { IModule } from '_/model/common'

const renderApp = () =>
  render(
    // TODO 12.03.2021 Return after update material-ui to v5
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>
    document.getElementById('root'),
  )

renderApp()

const hm: IModule = module as unknown as IModule
if (hm.hot) {
  hm.hot.accept('./App', renderApp)
}

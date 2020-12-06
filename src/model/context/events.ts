// deps
import React from 'react'
// model
import { IEventFormAction, IEventsState } from '../../containers/Events/types'

export interface IEventsContext {
  state: IEventsState
  initState: IEventsState
  dispatch: React.Dispatch<IEventFormAction>
}

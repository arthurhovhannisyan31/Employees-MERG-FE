// deps
import React from 'react'
// local
import AuthContainer from '_/context/auth-context'
import CommonContainer from '_/context/common-context'
import ThemeContainer from '_/context/theme-context'
import EventsContainer from '_/context/events-context'

// eslint-disable-next-line
// @ts-ignore
const ContextCompose: React.FC = ({ children }) => {
  return [
    AuthContainer,
    CommonContainer,
    ThemeContainer,
    EventsContainer,
  ].reduceRight((child: React.ReactNode, Container: React.FC) => {
    return <Container>{child}</Container>
  }, children)
}

export default ContextCompose

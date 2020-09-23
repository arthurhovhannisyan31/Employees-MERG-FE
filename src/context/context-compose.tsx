// deps
import React from 'react'
// local
import AuthContextContainer from './auth-context'
import CommonContextContainer from './common-context'
import ThemeContextContainer from './theme-context'

// eslint-disable-next-line
// @ts-ignore
const ContextCompose: React.FC = ({ children }) => {
  return [
    AuthContextContainer,
    CommonContextContainer,
    ThemeContextContainer,
  ].reduceRight((child: React.ReactNode, Container: React.FC) => {
    return <Container>{child}</Container>
  }, children)
}

export default ContextCompose

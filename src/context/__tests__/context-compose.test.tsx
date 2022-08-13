import { render } from '@testing-library/react'
import React from 'react'

import { ContextComposeMock } from 'context/__tests__/context-compose.mock'
import ContextCompose from 'context/context-compose'

describe('<ContextCompose />', () => {
  it('renders without errors', () => {
    render(<ContextCompose />)
    expect(1).toEqual(1)
  })
  it('renders mock composer without errors', () => {
    render(<ContextComposeMock />)
    expect(1).toEqual(1)
  })
})

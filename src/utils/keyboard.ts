// deps
import React from 'react'

export const handleEnterKeyDown =
  (cb: () => void) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      cb()
    }
  }

// deps
import React from 'react'
// components
// model
// helpers
import useStyles from './styles'

const ChangePassword: React.FC = () => {
  const classes = useStyles({ hasError: false })

  return (
    <div className={classes.container}>
      <span>Change password</span>
    </div>
  )
}

export default ChangePassword

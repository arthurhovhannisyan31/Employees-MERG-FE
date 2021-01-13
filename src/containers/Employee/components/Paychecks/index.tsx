// deps
import React from 'react'
// components
// model
// helpers
import useStyles from './style'

const Paychecks: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <span>Paychecks</span>
    </div>
  )
}

export default Paychecks

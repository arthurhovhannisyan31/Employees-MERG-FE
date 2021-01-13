// deps
import React from 'react'
// components
// model
// helpers
import useStyles from './style'

const Employments: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <span>Employments</span>
    </div>
  )
}

export default Employments

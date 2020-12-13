// deps
import React from 'react'
// components
// model
// helpers
import useStyles from './style'

const Titles: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <span>Titles</span>
    </div>
  )
}

export default Titles

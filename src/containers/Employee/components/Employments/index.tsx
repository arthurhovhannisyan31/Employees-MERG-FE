import React, { FC } from 'react'

import useStyles from './style'

const Employments: FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <span>Employments</span>
    </div>
  )
}

export default Employments

import React, { FC } from 'react'

import useStyles from './style'

const Paychecks: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <span>Paychecks</span>
    </div>
  )
}

export default Paychecks

import React, { FC } from 'react'

import useStyles from './style'

const Titles: FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <span>Titles</span>
    </div>
  )
}

export default Titles

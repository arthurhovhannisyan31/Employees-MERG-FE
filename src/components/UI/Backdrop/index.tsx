import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { FC } from 'react'

const useStyles = makeStyles<Theme, IBackdropProps>(() => ({
  container: {
    position: ({ isAbsolute }) => (isAbsolute ? 'absolute' : 'fixed'),
    top: 0,
    left: 0,
    height: ({ isAbsolute }) => (isAbsolute ? '100%' : '100vh'),
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
}))

interface IBackdropProps {
  isAbsolute?: boolean
}

const Backdrop: FC<IBackdropProps> = ({ isAbsolute }) => {
  const classes = useStyles({ isAbsolute })
  return <div className={classes.container} />
}

export default Backdrop

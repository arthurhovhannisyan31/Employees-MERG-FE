// deps
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// local

const useStyles = makeStyles(() => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
}))

const Backdrop: React.FC = () => {
  const classes = useStyles()
  return <div className={classes.container} />
}

export default Backdrop

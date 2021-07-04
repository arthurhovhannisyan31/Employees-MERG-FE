// deps
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
// components
import SignIn from 'containers/Auth/components/SingIn'
import SignUp from 'containers/Auth/components/SignUp'
// helpers
import { AuthContext } from 'context'
import { a11yProps } from 'utils/a11y'
import TabPanel from 'components/UI/TabPanel'
import useStyles from './style'

const Auth: FC = () => {
  const history = useHistory()
  const { next = '' } = useParams<Record<'next', string>>()
  const { userCredentials, errors: authErrors } = useContext(AuthContext)

  const [tab, setTab] = useState(0)

  const classes = useStyles({ hasError: !!authErrors?.length })

  const handleChange = useCallback(
    (_: React.ChangeEvent<{}>, newValue: number) => {
      setTab(newValue)
    },
    [],
  )

  useEffect(() => {
    if (userCredentials?._id) {
      history.push(`/${next}`)
    }
  }, [history, next, userCredentials])

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid>
        <AppBar position="static" color="transparent">
          <Tabs
            indicatorColor="primary"
            value={tab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Sign In" {...a11yProps('sign in')} />
            <Tab label="Sign Up" {...a11yProps('sign up')} />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}>
          <SignIn />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SignUp />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default Auth

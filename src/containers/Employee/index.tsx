// deps
import React from 'react'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
// components
import TabPanel from '_/components/TabPanel'
import Details from './components/Details'
import Employments from './components/Employments'
import Paychecks from './components/Paychecks'
import Titles from './components/Titles'
// helpers
import { a11yProps } from './helpers'
import useStyles from './style'

const Employee: React.FC = () => {
  // useStyles
  const classes = useStyles()

  // useState
  const [tab, setTab] = React.useState<number>(0)

  // useCallback
  const handleChangeTab = (
    _: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    setTab(newValue)
  }

  // todo employee fetch
  // todo employee reducer mb with employees
  // todo update fields and delete profile

  const loading = false
  return (
    <Grid container item className={classes.container} direction="column">
      <Grid>
        {loading ? (
          <Grid container justify="center" className={classes.loadingIndicator}>
            <CircularProgress size={20} />
          </Grid>
        ) : (
          <>
            <AppBar position="static">
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                aria-label="simple tabs employee"
              >
                <Tab label="Details" {...a11yProps(0)} />
                <Tab label="Paychecks" {...a11yProps(1)} />
                <Tab label="Titles" {...a11yProps(2)} />
                <Tab label="Employments" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
              <Details />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Paychecks />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Titles />
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Employments />
            </TabPanel>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Employee

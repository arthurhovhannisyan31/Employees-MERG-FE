// deps
import React from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
// components
import TabPanel from '_/components/UI/TabPanel'
import Details from '_/containers/Employee/components/Details'
import Employments from '_/containers/Employee/components/Employments'
import Paychecks from '_/containers/Employee/components/Paychecks'
import Titles from '_/containers/Employee/components/Titles'
// model
// helpers
import { EmployeeByIdContext } from '_/context'
import DetailsModal from '_/containers/Employee/components/DetailsModal'
import {
  useSubmitEmployeeModal,
  useGetEmployee,
} from '_/containers/Employee/hooks'
import { a11yProps } from './helpers'
import useStyles from './style'

const EmployeePage: React.FC = () => {
  // utils
  const classes = useStyles()
  const { id: idParam } = useParams<Record<'id', string>>()
  // context
  const { dispatch, state } = React.useContext(EmployeeByIdContext)
  const { data, loading, error } = state
  // state
  const [tab, setTab] = React.useState<number>(0)
  const employeeData = data?.[idParam]
  const [currentModal, setCurrentModal] = React.useState('')
  // memo
  const handleChangeTab = React.useCallback(
    (_: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
      setTab(newValue)
    },
    [],
  )
  const handleSetModal = React.useCallback(
    (val: string) => () => {
      setCurrentModal(val)
    },
    [],
  )

  const [handleGetEmployee] = useGetEmployee({ dispatch })
  const [handleEmployeeSubmit] = useSubmitEmployeeModal()

  // todo update fields and delete profile
  // todo error message

  React.useEffect(() => {
    if (!employeeData) {
      handleGetEmployee({ id: idParam })
    }
  }, [idParam, handleGetEmployee, employeeData])

  return (
    <Grid container item className={classes.container} direction="column">
      <Grid>
        {loading || !employeeData ? (
          <Grid container justify="center" className={classes.loadingIndicator}>
            <CircularProgress size={20} />
          </Grid>
        ) : (
          <>
            {error ? (
              <Typography>Error message</Typography>
            ) : (
              <>
                <DetailsModal
                  isOpen={currentModal === 'details'}
                  handleClose={handleSetModal('')}
                  data={employeeData}
                  onSubmit={handleEmployeeSubmit}
                />
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
                  <Details
                    handleOpenModal={handleSetModal('details')}
                    {...employeeData}
                  />
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
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default EmployeePage

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
import { EmployeeByIdContext, CatalogsContext } from '_/context'
import DetailsModal from '_/containers/Employee/components/DetailsModal'
import {
  useSubmitEmployeeModal,
  useGetEmployee,
} from '_/containers/Employee/hooks'
import { useGetDepartments } from '_/containers/Employee/hooks/useGetDepartments'
import { useGetTitles } from '_/containers/Employee/hooks/useGetTitles'
import { useGetGenders } from '_/containers/Employee/hooks/useGetGenders'
import { a11yProps } from './helpers'
import useStyles from './style'

const EmployeePage: React.FC = () => {
  // utils
  const classes = useStyles()
  const { id: idParam } = useParams<Record<'id', string>>()
  // context
  const {
    state: {
      data: employeeByIdData,
      loading: employeeByIdLoading,
      error: employeeByIdError,
    },
    dispatch: employeeByIdDispatch,
  } = React.useContext(EmployeeByIdContext)
  const {
    state: {
      data: { departments, titles, genders },
    },
    dispatch: catalogsDispatch,
  } = React.useContext(CatalogsContext)
  // state
  const [tab, setTab] = React.useState<number>(0)
  const employeeData = employeeByIdData?.[idParam]
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

  const [handleGetEmployee] = useGetEmployee({ dispatch: employeeByIdDispatch })
  const [handleEmployeeSubmit] = useSubmitEmployeeModal({
    dispatch: employeeByIdDispatch,
  })
  const [handleGetDepartments] = useGetDepartments({
    dispatch: catalogsDispatch,
  })
  const [handleGetTitles] = useGetTitles({ dispatch: catalogsDispatch })
  const [handleGetGenders] = useGetGenders({ dispatch: catalogsDispatch })

  // todo update fields
  // todo add delete profile
  // todo error message

  const fetchEmployeeInitData = React.useCallback(() => {
    if (!employeeData && !employeeByIdLoading) {
      handleGetEmployee({ id: idParam })
    }
  }, [idParam, handleGetEmployee, employeeData])
  const fetchDepartmentsInitData = React.useCallback(() => {
    if (!departments?.length) {
      handleGetDepartments()
    }
  }, [])
  const fetchTitlesInitData = React.useCallback(() => {
    if (!titles?.length) {
      handleGetTitles()
    }
  }, [])
  const fetchGendersInitData = React.useCallback(() => {
    if (!genders?.length) {
      handleGetGenders()
    }
  }, [])

  React.useEffect(fetchEmployeeInitData, [fetchEmployeeInitData])
  React.useEffect(fetchDepartmentsInitData, [fetchDepartmentsInitData])
  React.useEffect(fetchTitlesInitData, [fetchTitlesInitData])
  React.useEffect(fetchGendersInitData, [fetchGendersInitData])

  return (
    <Grid container item className={classes.container} direction="column">
      <Grid>
        {employeeByIdLoading && !employeeData ? (
          <Grid container justify="center" className={classes.loadingIndicator}>
            <CircularProgress size={20} />
          </Grid>
        ) : (
          <>
            {employeeByIdError ? (
              <Typography>Error message</Typography>
            ) : (
              <>
                {currentModal === 'details' && (
                  <DetailsModal
                    isOpen={currentModal === 'details'}
                    handleClose={handleSetModal('')}
                    data={employeeData}
                    onSubmit={handleEmployeeSubmit}
                    titles={titles}
                    departments={departments}
                    isLoading={employeeByIdLoading}
                  />
                )}
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

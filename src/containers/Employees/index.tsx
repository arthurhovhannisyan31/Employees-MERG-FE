// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
// components
// helpers
import { AuthContext } from '_/context'
import { getEmployees } from '_/gql/queries'
import { fetchResponseCheck } from '_/utils/helpers'
import useStyles from './style'

const Employees: React.FC = () => {
  // useStyle
  const classes = useStyles()

  // useContext
  const { token } = React.useContext(AuthContext)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const apiUrl = process?.env?.API_URL || ''

  const handleGetEmployees = React.useCallback(async () => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(getEmployees()),
        headers,
      })
      fetchResponseCheck(res?.status)
      const { data } = await res.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }, [apiUrl, headers])

  React.useEffect(() => {
    handleGetEmployees()
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container>
      <span>Employees</span>
    </Grid>
  )
}

export default Employees

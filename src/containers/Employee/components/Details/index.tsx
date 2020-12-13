// deps
import React from 'react'
// components
// model
// helpers
import useStyles from './style'

const Details: React.FC = () => {
  const classes = useStyles()

  // _id: ID!
  // birth_date: String!
  // first_name: String!
  // last_name: String!
  // hire_date: String!
  // gender: Gender!
  // department: Department!
  // title: Title!

  return (
    <div className={classes.container}>
      <span>Details</span>
    </div>
  )
}

export default Details

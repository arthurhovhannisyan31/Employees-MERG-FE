// deps
import React from 'react'
// components
// model
import { Employee } from '_/model/generated/graphql'
// helpers
import useStyles from './style'

type TDetailsProps = Omit<Employee, 'titles'|'paychecks'|'employments'>

const Details: React.FC<TDetailsProps> = (props) => {
  // utils
  const classes = useStyles()

  console.log(props)

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

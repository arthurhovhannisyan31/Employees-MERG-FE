export const employeeFragment = `
  _id
  birth_date
  hire_date
  first_name
  last_name
`

export const genderFragment = `
  gender{
    name
  }
`
export const departmentFragment = `
  department{
    name  
  }
`
export const titleFragment = `
  title{
    name
  }
`
export const titlesFragment = `
  titles{
    ${titleFragment}
    start_date
    end_date
  }
`
export const paycheckFragment = `
  salary
  start_date
  end_date
`
export const paychecksFragment = `
  paychecks{
    ${paycheckFragment}
  }
`
export const employmentFragment = `
  ${departmentFragment}
  start_date
  end_date
`
export const employmentsFragment = `
  employments{
    ${employmentFragment}
  }
`
export const userCredentials = `
  me {
    id
    email
  }
`
export const employeeDetailsFragment = `
  ${employeeFragment}
  ${genderFragment}
  ${departmentFragment}
  ${titleFragment}
  ${paychecksFragment}
  ${titlesFragment}
  ${employmentsFragment}
`

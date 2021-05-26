export const employeeFragment = `
  _id
  birth_date
  hire_date
  first_name
  last_name
`
export const genderFragment = `
  _id
  name
`
export const departmentFragment = `
  _id
  name  
`
export const titleFragment = `
  _id
  name
`
export const paycheckFragment = `
  salary
  start_date
  end_date
`
export const employmentFragment = `
  department{
    ${departmentFragment}
  }
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
    _id
    email
  }
`
export const employeeDetailsFragment = `
  ${employeeFragment}
  gender
  department
  title
  paychecks{
    ${paycheckFragment}
  }
  titles{
    title{
      ${titleFragment}
    }
    start_date
    end_date
  }
  ${employmentsFragment}
`

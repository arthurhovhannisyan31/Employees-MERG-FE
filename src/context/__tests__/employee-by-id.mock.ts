import { employeeStub } from 'context/__tests__/employee-by-id.stub'

import { Employee } from 'model/generated'

export const getEmployeeStub = (props?: Partial<Employee>): Employee => ({
  ...employeeStub,
  ...props,
})

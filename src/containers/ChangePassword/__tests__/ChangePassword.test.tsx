import { fireEvent, render, waitFor } from '@testing-library/react'
import React, { ChangeEvent } from 'react'

import { routes } from 'constants/routes'
import ChangePasswordContainer from 'containers/ChangePassword'
import { changePasswordProps } from 'containers/ChangePassword/__tests__/ChangePassword.stub'
import ChangePassword from 'containers/ChangePassword/ChangePassword'
import { contextWrap } from 'containers/helpers/__tests__/context-wrap'
import { routeWrap } from 'containers/helpers/route-wrap'

describe('<ChangePassword />', () => {
  it('renders without errors', () => {
    const context = contextWrap(<ChangePassword {...changePasswordProps} />)
    const route: JSX.Element = routeWrap({
      initialEntries: [`${routes.CHANGE_PASSWORD.path}/123`],
      children: context,
      path: routes.CHANGE_PASSWORD.path,
    })

    const screen = render(route)
    const targetElement = screen.getByTestId('change-password')

    expect(targetElement).toBeTruthy()
  })
  it('changes input value', async () => {
    const context = contextWrap(<ChangePasswordContainer />)
    const route: JSX.Element = routeWrap({
      initialEntries: [`${routes.CHANGE_PASSWORD.path}/123`],
      children: context,
      path: routes.CHANGE_PASSWORD.path,
    })

    const value = '123'
    const { getByTestId } = render(route)
    const targetElement = getByTestId('change-password-input')

    fireEvent.change(targetElement, {
      target: {
        value,
      },
    })

    await waitFor(() => {
      expect((targetElement as HTMLInputElement).value).toEqual(value)
    })
  })
  it('calls handleTextField with value', async () => {
    const handleTextField = jest.fn()
    const handleTextFieldCurried =
      () => (event: ChangeEvent<HTMLInputElement>) => {
        handleTextField(event.target.value)
      }

    const context = contextWrap(
      <ChangePassword
        {...changePasswordProps}
        handleTextField={handleTextFieldCurried}
      />,
    )
    const route: JSX.Element = routeWrap({
      initialEntries: [`${routes.CHANGE_PASSWORD.path}/123`],
      children: context,
      path: routes.CHANGE_PASSWORD.path,
    })

    const value = '123'
    const { getByTestId } = render(route)
    const targetElement = getByTestId('change-password-input')

    fireEvent.change(targetElement, {
      target: {
        value,
      },
    })

    await waitFor(() => {
      expect(handleTextField).toHaveBeenCalledWith(value)
    })
  })
  // TODO confirm field change
  // TODO submit with errors
  // TODO submit with success
})

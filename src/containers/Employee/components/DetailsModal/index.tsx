// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { useFormik } from 'formik'
// components
import NumberFormatCustom from '_/containers/Events/components/NumberFormatCustom'
import Modal from '_/components/UI/Modal'
// model
// helpers
import useStyles from './styles'

interface IDetailsModalProps {
  isOpen: boolean
  handleClose: () => void
}

const DetailsModal: React.FC<IDetailsModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const classes = useStyles()

  return (
    <>
      <span>modal</span>
    </>
  )
}

export default DetailsModal

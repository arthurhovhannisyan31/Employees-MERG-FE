// deps
import React from 'react'
import NumberFormat from 'react-number-format'
// local

interface INumberFormatCustomProps {
  prefix?: string
  format?: string
}

interface NumberFormatInputProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumberFormatCustom = (customProps: INumberFormatCustomProps) => (
  inputProps: NumberFormatInputProps
) => {
  const { inputRef, onChange, name, ...other } = inputProps

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      {...customProps}
    />
  )
}

export default NumberFormatCustom

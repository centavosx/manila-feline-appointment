import { CSSProperties } from 'react'
import SelectComponent, { StylesConfig } from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import { StyledProps } from 'styled-components'

export interface Option {
  readonly value: string
  readonly label: string
}

const colourStyles: StylesConfig<Option> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    border: '1px solid gray',
    boxShadow: '0 0 0 1px black',
    '& :focus': {
      border: '1px solid black',
    },
  }),
  input: (styles) => ({
    ...styles,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    color: 'black',
  }),
  placeholder: (styles) => ({
    ...styles,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  }),
  singleValue: (styles) => ({ ...styles }),
}

interface SelectStyles {
  controlStyle?: CSSProperties
  inputStyle?: CSSProperties
  placeholderStyle?: CSSProperties
  singleValueStyle?: CSSProperties
}

export const Select = ({
  controlStyle,
  inputStyle,
  placeholderStyle,
  singleValueStyle,
  ...other
}: StateManagerProps<Option> & SelectStyles) => {
  return (
    <SelectComponent
      {...other}
      styles={{
        ...colourStyles,
        control: (style) => ({ ...style, ...controlStyle }),
        input: (style) => ({ ...style, ...inputStyle }),
        placeholder: (style) => ({ ...style, ...placeholderStyle }),
        singleValue: (style) => ({ ...style, ...singleValueStyle }),
      }}
    />
  )
}
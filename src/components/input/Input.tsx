import { TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export type InputColor = {
  inputcolor?: {
    backgroundColor?: string
    labelColor?: string
    color?: string
    borderBottomColor?: string
    hover?: {
      backgroundColor?: string
      labelColor?: string
      color?: string
    }
  }
}

const TextInput = ({
  sx,
  children,
  padding,
  ...other
}: TextFieldProps & InputColor & { padding?: number }) => {
  return <TextField sx={{ width: '100%', ...sx }} {...other} />
}
export const Input = styled(TextInput)(({ inputcolor, padding }) => ({
  borderRadius: 4,
  backgroundColor: inputcolor?.backgroundColor,
  '& label.Mui-focused': {
    color: inputcolor?.labelColor,
  },

  '& .MuiOutlinedInput-root': {
    color: inputcolor?.color,
    padding: padding ?? 1,
    '& fieldset': {
      borderColor: inputcolor?.labelColor,
    },
    '&:hover': {
      color: inputcolor?.hover?.color,
    },
    '&:hover fieldset': {
      borderColor: inputcolor?.hover?.labelColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: inputcolor?.labelColor,
    },
  },
  '& .MuiInputBase-root:after': {
    borderBottomColor: inputcolor?.borderBottomColor,
  },
}))

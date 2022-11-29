import { TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export type InputColor = {
  inputColor?: {
    backgroundColor?: string
    labelColor?: string
    color?: string
    hover?: {
      backgroundColor?: string
      labelColor?: string
      color?: string
    }
  }
}

const TextInput = ({ sx, children, ...other }: TextFieldProps & InputColor) => {
  return <TextField sx={{ width: '100%', ...sx }} {...other} />
}
export const Input = styled(TextInput)(({ inputColor }) => ({
  borderRadius: 4,
  backgroundColor: inputColor?.backgroundColor,
  '& label.Mui-focused': {
    color: inputColor?.labelColor,
  },

  '& .MuiOutlinedInput-root': {
    color: inputColor?.color,
    padding: 1,
    '& fieldset': {
      borderColor: inputColor?.labelColor,
    },
    '&:hover': {
      color: inputColor?.hover?.color,
    },
    '&:hover fieldset': {
      borderColor: inputColor?.hover?.labelColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: inputColor?.labelColor,
    },
  },
}))

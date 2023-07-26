import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
  Theme,
} from '@mui/material'
import { SxProps, styled } from '@mui/material/styles'
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  ReactNode,
} from 'react'
import { theme } from 'utils/theme'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

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
}: TextFieldProps &
  InputColor & {
    padding?: number
    paddingTop?: number
    paddingBottom?: number
    paddingLeft?: number
    paddingRight?: number
  }) => {
  const [password, setPassword] = useState(false)
  return (
    <TextField
      sx={{ width: '100%', ...sx }}
      {...other}
      type={!password ? other.type : 'text'}
      InputProps={{
        endAdornment: other.type === 'password' && (
          <InputAdornment position="end">
            <Button
              style={{
                marginRight: 14,
                cursor: 'pointer',
                padding: 3,
                minWidth: 'auto',
              }}
              onClick={() => setPassword((v) => !v)}
            >
              {password ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </Button>
          </InputAdornment>
        ),
      }}
    />
  )
}

export const Input = styled(TextInput)(
  ({
    inputcolor,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  }) => ({
    borderRadius: 4,
    backgroundColor: inputcolor?.backgroundColor,
    '& label.Mui-focused': {
      color: inputcolor?.labelColor,
    },

    '& .MuiOutlinedInput-root': {
      color: inputcolor?.color,
      padding: padding ?? 1,
      paddingLeft: paddingLeft ?? padding ?? 1,
      paddingRight: paddingRight ?? padding ?? 1,
      paddingBottom: paddingBottom ?? padding ?? 1,
      paddingTop: paddingTop ?? padding ?? 1,
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
  })
)

export const SearchableInput = ({
  key,
  value,
  label,
  type,
  placeHolder,
  onSearch,
  onChange,
  disabled,
  sx,
  startAdornment,
}: {
  key?: any
  label?: string
  type?: string
  value?: string
  placeHolder?: string
  sx?: SxProps<Theme>
  onSearch?: (val: string) => Promise<void>
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  disabled?: boolean
  startAdornment?: ReactNode
}) => {
  const [val, setVal] = useState('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(() => {
    setIsSearching(true)
  }, [val, setIsSearching])

  useEffect(() => {
    if (isSearching) {
      const delay = setTimeout(() => {
        onSearch?.(val).finally(() => setIsSearching(false))
      }, 500)
      return () => clearTimeout(delay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching, val, setIsSearching])

  useEffect(() => {
    if (!!value) setVal(() => value)
  }, [value, setVal])

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setVal(e.target.value)
      onChange?.(e)
    },
    [setVal, onChange]
  )

  return (
    <TextField
      key={key}
      label={label}
      type={type}
      sx={{ color: 'black', width: '100%', ...sx }}
      style={{
        backgroundColor: 'white',
        borderBottomColor: theme.mainColors.first,
        color: 'black',
      }}
      placeholder={placeHolder}
      onChange={onChangeValue}
      value={value ?? val}
      InputProps={{
        endAdornment: isSearching && (
          <InputAdornment position="end">
            <CircularProgress size={24} />
          </InputAdornment>
        ),

        startAdornment: !!startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
      }}
      disabled={disabled}
    />
  )
}

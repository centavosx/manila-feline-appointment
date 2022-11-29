import { Text } from '../text'
import {
  Field,
  FieldProps as FormikFieldProps,
  FieldConfig,
  FormikValues,
} from 'formik'
import { SxStyleProp } from 'rebass'
import { Input, InputColor } from './Input'
import { FilledTextFieldProps, TextFieldProps } from '@mui/material'

type ErrorProp = { error?: string; sx?: SxStyleProp }

export const FormInput = ({
  errorProp,
  ...props
}: {
  errorProp?: ErrorProp
} & TextFieldProps &
  InputColor & {
    theme?: undefined
  } & Pick<FieldConfig, 'name'>) => {
  return (
    <Field name={props.name}>
      {({
        field: { name: fieldName, value, onChange },
        form: { touched },
        meta: { error = '' },
      }: FormikFieldProps<any, FormikValues>) => (
        <>
          <Input
            {...{
              ...props,
              name: fieldName,
              value,
              onChange: props.onChange ?? onChange,
            }}
          />
          <InputError error={error} {...errorProp} />
        </>
      )}
    </Field>
  )
}

const InputError = ({ error, sx }: ErrorProp) =>
  (error && (
    <Text color={'red'} fontSize={[10, 12]} sx={{ marginTop: '8px', ...sx }}>
      {error}
    </Text>
  )) ||
  null

import { Button as ButtonComponent, ButtonProps } from '@mui/material'
import styled from '@emotion/styled'

type ButtoncolorProps = {
  backgroundcolor?: string
  activecolor?: string
  hovercolor?: string
  textcolor?: string
}

const StyledButton = ({
  className,
  sx,
  ...props
}: ButtonProps & ButtoncolorProps) => {
  return (
    <ButtonComponent className={className} {...props}>
      {props?.children}
    </ButtonComponent>
  )
}
export const Button = styled(StyledButton)`
  && {
    background-color: ${({ backgroundcolor }) => backgroundcolor ?? '#f7efe3'};
    color: ${({ textcolor }) => textcolor ?? '#3f352c'};
    :hover {
      background-color: ${({ hovercolor }) => hovercolor ?? '#e1d3c2'};
    }
    :active {
      background-color: ${({ activecolor }) => activecolor ?? '#b4a79e'};
    }
  }
`

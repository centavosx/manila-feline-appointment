import { Button as ButtonComponent, ButtonProps as Props } from '@mui/material'
import styled from '@emotion/styled'

export type ButtonProps = {
  backgroundcolor?: string
  activecolor?: string
  hovercolor?: string
  textcolor?: string
  hovertextcolor?: string
  activetextcolor?: string
  custom?: any
} & Props

const StyledButton = ({ className, sx, ...props }: ButtonProps) => {
  return (
    <ButtonComponent className={className} {...props}>
      {props?.children}
    </ButtonComponent>
  )
}
export const Button = styled(StyledButton)`
  && {
    background-color: ${({ backgroundcolor }) => backgroundcolor ?? 'white'};
    color: ${({ textcolor }) => textcolor ?? 'black'};
    :disabled {
      background-color: gray;
      color: white;
    }
    :hover {
      background-color: ${({ hovercolor }) => hovercolor ?? '#e0e0e0'};
      color: ${({ hovertextcolor }) => hovertextcolor ?? 'black'};
    }
    :active {
      background-color: ${({ activecolor }) => activecolor ?? '#d6d6d6'};
      color: ${({ activetextcolor }) => activetextcolor ?? 'black'};
    }

    ${({ custom }) => custom}
  }
`

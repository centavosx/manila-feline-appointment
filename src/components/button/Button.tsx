import { Button as ButtonComponent, ButtonProps as Props } from '@mui/material'
import styled from '@emotion/styled'
import { theme } from 'utils/theme'

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
    font-weight: bold;
    background-color: ${({ backgroundcolor }) =>
      backgroundcolor ?? theme.colors.blackgray};
    color: ${({ textcolor }) => textcolor ?? theme.colors.pink};
    :disabled {
      background-color: gray;
      color: white;
    }
    :hover {
      background-color: ${({ hovercolor }) => hovercolor ?? '#7A7A7A'};
      color: ${({ hovertextcolor }) => hovertextcolor ?? 'pink'};
    }
    :active {
      background-color: ${({ activecolor }) => activecolor ?? '#707070'};
      color: ${({ activetextcolor }) => activetextcolor ?? 'pink'};
    }

    ${({ custom }) => custom}
  }
`

export const ShopButtonPrimary = ({
  isTransition = true,
  style,
  ...props
}: ButtonProps & { isTransition?: boolean }) => (
  <Button
    backgroundcolor={theme.colors.pink}
    textcolor={theme.colors.black}
    hovercolor={'rgba(188, 143, 143,0.4)'}
    hovertextcolor={theme.colors.black}
    activecolor={'rgba(188, 143, 143,0.4)'}
    activetextcolor={theme.colors.black}
    variant="outlined"
    style={{
      borderColor: 'black',
      fontFamily: 'Castego',
      fontWeight: 600,
      borderRadius: 50,
      alignSelf: 'center',
      transition: isTransition ? '0.3s ease-in-out' : undefined,
      ...style,
    }}
    size={'large'}
    custom={{
      padding: 10,
      paddingLeft: 24,
      paddingRight: 24,
      width: 'auto',
      '@media screen and (max-width: 640px)': {
        fontSize: 12,
        paddingLeft: 16,
        paddingRight: 16,
        width: 'auto',
      },
      '&:hover': {
        transform: isTransition ? 'scale(0.9)' : undefined,
      },
    }}
    {...props}
  />
)

export const ShopButtonSecondary = ({
  isTransition = true,
  style,
  ...props
}: ButtonProps & { isTransition?: boolean }) => {
  return (
    <Button
      backgroundcolor={theme.colors.white}
      textcolor={theme.colors.black}
      hovercolor={'rgba(255, 255, 255,0.4)'}
      hovertextcolor={theme.colors.black}
      activecolor={'rgba(255, 255, 255,0.4)'}
      activetextcolor={theme.colors.black}
      variant="outlined"
      style={{
        borderColor: 'black',
        fontFamily: 'Castego',
        fontWeight: 600,
        borderRadius: 50,
        alignSelf: 'center',
        transition: isTransition ? '0.3s ease-in-out' : undefined,
        ...style,
      }}
      size={'large'}
      custom={{
        padding: 10,
        paddingLeft: 24,
        paddingRight: 24,
        width: 'auto',
        '@media screen and (max-width: 640px)': {
          fontSize: 12,
          paddingLeft: 16,
          paddingRight: 16,
          width: 'auto',
        },
        '&:hover': {
          transform: isTransition ? 'scale(0.9)' : undefined,
        },
      }}
      {...props}
    />
  )
}

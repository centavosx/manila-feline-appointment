import { ReactNode } from 'react'
import { Loading } from 'components/loading'
import { Flex, FlexProps, TextProps, Text } from 'rebass'

export const Section = ({
  title,
  rightChild,
  children,
  textProps,
  contentProps,
  isFetching,
  ...other
}: {
  title?: string
  textProps?: TextProps
  contentProps?: FlexProps
  isFetching?: boolean
  rightChild?: ReactNode
} & FlexProps) => {
  return (
    <Flex
      padding={50}
      alignItems={'center'}
      flexDirection="column"
      width={'100%'}
      height={'100%'}
      sx={{ gap: 4 }}
      {...other}
    >
      <Flex flexDirection={'row'} width={'100%'} alignItems={'center'}>
        {!!title && (
          <Text
            as={'h1'}
            flex={1}
            textAlign="center"
            color={'black'}
            fontFamily="Castego"
            {...textProps}
          >
            {title}
          </Text>
        )}
        {rightChild}
      </Flex>
      {isFetching && <Loading />}
      <Flex
        alignItems={'center'}
        flexDirection="column"
        width={'100%'}
        color="black"
        fontFamily={'Castego'}
        sx={{ gap: 4 }}
        {...contentProps}
      >
        {children}
      </Flex>
    </Flex>
  )
}

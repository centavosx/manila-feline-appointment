import React from 'react'
import { Flex } from 'rebass'
import { AiOutlineRollback } from 'react-icons/ai'
import { theme } from 'utils/theme'

export const BackButton = ({
  children,
  onClick: goBack,
}: {
  children: string
  onClick: () => void
}) => {
  return (
    <Flex sx={{ gap: 10, alignItems: 'center' }} color={theme.colors.lightpink}>
      <AiOutlineRollback
        onClick={goBack}
        size={24}
        color={theme.colors.lightpink}
        style={{ cursor: 'pointer' }}
      />

      {children}
    </Flex>
  )
}

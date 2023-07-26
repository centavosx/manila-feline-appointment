import React from 'react'
import { Flex } from 'rebass'
import { AiOutlineRollback } from 'react-icons/ai'

export const BackButton = ({
  children,
  onClick: goBack,
}: {
  children: string
  onClick: () => void
}) => {
  return (
    <Flex sx={{ gap: 10, alignItems: 'center' }}>
      <AiOutlineRollback
        onClick={goBack}
        size={24}
        style={{ cursor: 'pointer' }}
      />

      {children}
    </Flex>
  )
}

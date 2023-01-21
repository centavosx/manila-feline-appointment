import { Flex, Image, Text } from 'rebass'
import { Box } from '../box'
import { format } from 'date-fns'
import { Button } from 'components/button'
import { useRouter } from 'next/router'
import { User } from 'entities/user.entity'
import { BoxProps } from '@mui/material'

type DoctorInfoProp = {
  user: string
  image?: string
  workPosition: string
  availability: Date[]
}

export const DisplayDoctor = ({
  data,
  onItemClick,
}: {
  data: User[]
  onItemClick: (v: string) => void
}) => {
  return (
    <Flex
      flexDirection={'column'}
      width="100%"
      sx={{
        gap: 2,
        maxHeight: 550,
        overflow: 'auto',
        padding: 2,

        scrollbarWidth: 'thin',
      }}
    >
      {data.map((d, i) => (
        <DoctorCard
          key={i}
          user={d.name}
          workPosition={d.position}
          availability={[]}
          onItemClick={() => onItemClick(d.id)}
        />
      ))}
    </Flex>
  )
}

export const DoctorCard = ({
  image,
  user,
  workPosition,
  availability,
  onItemClick,
  ...other
}: BoxProps & DoctorInfoProp & { onItemClick: () => void }) => {
  return (
    <Box
      sx={{
        borderColor: 'black',
        width: '100%',
        height: undefined,
        overflow: undefined,
      }}
      flexProps={{
        sx: {
          gap: 14,
          alignItems: 'center',
          flexDirection: 'row',
        },
      }}
      {...other}
    >
      {!!image && (
        <Image
          src={image}
          alt="img"
          sx={{ borderRadius: '100%', height: 80, width: 80 }}
        />
      )}
      <Flex flexDirection={'column'} flex={1} sx={{ gap: 1 }}>
        <Text as={'h3'} width="100%" color="black">
          Dr. {user}
        </Text>
        <Text as={'h5'} width="100%" color="black">
          {workPosition}
        </Text>
        {availability.length > 0 && (
          <Text as={'h6'} width="100%" color="black">
            Availability: {format(availability[0], 'hh a')} to{' '}
            {format(availability[availability.length - 1], 'hh a')}
          </Text>
        )}
        <Flex flex={1}>
          <Button onClick={onItemClick}>Set an appointment</Button>
        </Flex>
      </Flex>
    </Box>
  )
}

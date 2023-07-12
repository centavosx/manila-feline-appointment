import { useState } from 'react'
import { Main } from 'components/main'
import { useUser } from 'hooks'
import { Flex, Text } from 'rebass'
import { theme } from 'utils/theme'
import PurchaseHistory from './page-components/purchase_history'

export default function Profile() {
  const { user } = useUser()
  const [selected, setSelected] = useState<'profile' | 'purchase' | 'booking'>(
    'profile'
  )
  return (
    <Main isLink={true}>
      <Flex
        height="100%"
        flexDirection={['column', 'column', 'row']}
        p={4}
        sx={{ gap: 4 }}
      >
        <Flex
          flexDirection={'column'}
          sx={{
            border: '1px solid black',
            borderRadius: 8,
            p: [4, 4],
            gap: 2,
          }}
          backgroundColor={theme.colors.lightpink}
        >
          <Text as={'h2'}>Information Details</Text>
          <Text as={'h4'} fontWeight={600}>
            {user?.name ?? 'Vincent Lennuel Llanto'}
          </Text>
          <Flex
            sx={{ borderTop: '1px solid black', gap: 2, pt: 2 }}
            flexDirection={'column'}
          >
            <Text
              width={'auto'}
              fontWeight={'bold'}
              sx={{
                fontSize: [14, 16],
                borderRadius: 8,
                padding: 14,
                cursor: 'pointer',
                color:
                  selected === 'profile'
                    ? theme.backgroundColors.verylight
                    : undefined,
                backgroundColor:
                  selected === 'profile' ? theme.colors.blackgray : undefined,
                ':hover': {
                  backgroundColor: '#7A7A7A',
                  color: 'pink',
                },
                '&&:active': {
                  backgroundColor: '#707070',
                  color: 'pink',
                },
              }}
              onClick={() => setSelected('profile')}
            >
              MY PROFILE
            </Text>
            <Text
              width={'auto'}
              fontWeight={'bold'}
              sx={{
                fontSize: [14, 16],
                borderRadius: 8,
                padding: 14,
                cursor: 'pointer',
                color:
                  selected === 'purchase'
                    ? theme.backgroundColors.verylight
                    : undefined,
                backgroundColor:
                  selected === 'purchase' ? theme.colors.blackgray : undefined,
                ':hover': {
                  backgroundColor: '#7A7A7A',
                  color: 'pink',
                },
                '&&:active': {
                  backgroundColor: '#707070',
                  color: 'pink',
                },
              }}
              onClick={() => setSelected('purchase')}
            >
              PURCHASE HISTORY
            </Text>
            <Text
              width={'auto'}
              fontWeight={'bold'}
              sx={{
                fontSize: [14, 16],
                borderRadius: 8,
                padding: 14,
                cursor: 'pointer',
                color:
                  selected === 'booking'
                    ? theme.backgroundColors.verylight
                    : undefined,
                backgroundColor:
                  selected === 'booking' ? theme.colors.blackgray : undefined,
                ':hover': {
                  backgroundColor: '#7A7A7A',
                  color: 'pink',
                },
                '&&:active': {
                  backgroundColor: '#707070',
                  color: 'pink',
                },
              }}
              onClick={() => setSelected('booking')}
            >
              BOOKING HISTORY
            </Text>
          </Flex>
        </Flex>
        <Flex flex={1}>
          <PurchaseHistory />
        </Flex>
      </Flex>
    </Main>
  )
}

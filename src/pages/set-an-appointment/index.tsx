import { Flex, Image } from 'rebass'

import 'react-calendar/dist/Calendar.css'
import { Main } from '../../components/main'
import { Calendar } from '../../components/calendar'
import { useRouter } from 'next/router'
import { Section } from '../../components/sections'
import { theme } from '../../utils/theme'

export default function Home() {
  const { replace } = useRouter()
  return (
    <Main isLink={true}>
      <Flex flexDirection={'column'} flex={1} width={'100%'}>
        <Section
          title="Set Appointment"
          backgroundColor={theme.mainColors.fourth}
          height={'100wh'}
        >
          <Calendar minDate={new Date()} />
        </Section>
      </Flex>
    </Main>
  )
}

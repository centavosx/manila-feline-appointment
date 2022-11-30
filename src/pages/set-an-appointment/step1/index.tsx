import { Flex, Image } from 'rebass'

import 'react-calendar/dist/Calendar.css'
import { Main } from '../../../components/main'
import { Calendar } from '../../../components/calendar'
import { useRouter } from 'next/router'
import { Section } from '../../../components/sections'
import { theme } from '../../../utils/theme'
import { Text } from '../../../components/text'
import { Input } from '../../../components/input'
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Select } from 'components/select'

export default function Step1() {
  const { replace } = useRouter()
  return (
    <Main isLink={true}>
      <Flex flexDirection={'column'} flex={1} width={'100%'}>
        <Section
          title="Set Appointment"
          backgroundColor={theme.mainColors.fourth}
          height={'100wh'}
          contentProps={{ flexDirection: ['column', 'row'] }}
        >
          <Calendar minDate={new Date()} />
          <Flex
            width={'100%'}
            sx={{
              backgroundColor: 'white',
              height: '100%',
              padding: 10,
              borderRadius: 5,
              border: '0.5px solid gray',
              gap: 10,
            }}
            flexDirection={'column'}
          >
            <Input
              name="subject"
              label="Search"
              variant="outlined"
              inputcolor={{
                labelColor: 'gray',
                borderBottomColor: theme.mainColors.first,
                color: 'black',
              }}
              sx={{ color: 'black', width: '100%', mt: 0 }}
              placeholder="Search doctor"
            />
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              name="color"
            />

            <RadioGroup
              defaultValue={false}
              name="radio-buttons-group"
              sx={{ flexDirection: 'row' }}
            >
              <FormControlLabel value={true} control={<Radio />} label="AM" />
              <FormControlLabel value={false} control={<Radio />} label="PM" />
            </RadioGroup>

            <Text sx={{ color: 'black' }}>2</Text>
          </Flex>
        </Section>
      </Flex>
    </Main>
  )
}

// export async function getServerSideProps(context: any) {
//   let limitParams: number = context.query.limit
//   let pageParams: number = context.query.page || 0
//   let searchParams: string = context.query.search || ''

//   return {
//     props: { limitParams, pageParams, searchParams },
//   }
// }

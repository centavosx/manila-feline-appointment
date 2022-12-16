import { Flex, Image } from 'rebass'

import 'react-calendar/dist/Calendar.css'
import { Main } from '../../../components/main'
import { Calendar } from '../../../components/calendar'
import { useRouter } from 'next/router'
import { Section } from '../../../components/sections'
import { theme } from '../../../utils/theme'
import { Text } from '../../../components/text'
import { Input } from '../../../components/input'
import { format } from 'date-fns'
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Select } from '../../../components/select'
import { useState } from 'react'
import { DisplayDoctor } from '../../../components/doctor'

export default function Step1() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Main isLink={true}>
      <Flex flexDirection={'column'} flex={1} width={'100%'}>
        <Section
          title="Set Appointment"
          backgroundColor={theme.mainColors.fifth}
          height={'100wh'}
          contentProps={{
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'start',
          }}
        >
          <Calendar minDate={new Date()} onChange={setDate} />
          <Flex
            width={'100%'}
            sx={{
              backgroundColor: 'white',
              height: '100%',
              padding: 12,
              borderRadius: 5,
              border: '0.5px solid gray',
              gap: 10,
            }}
            flexDirection={'column'}
          >
            {!!date && (
              <Text sx={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                {format(date, 'cccc LLLL d, yyyy')}
              </Text>
            )}
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
              options={[
                { label: '2', value: 'd' },
                { label: '2', value: 'd2' },

                { label: '2', value: 'd2' },
              ]}
              onChange={(v) => console.log(v)}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,

                  primary25: '#f7efe3',
                  primary: '#3f352c',
                },
              })}
            />

            <RadioGroup
              defaultValue={false}
              name="radio-buttons-group"
              sx={{ flexDirection: 'row' }}
            >
              <FormControlLabel
                value={true}
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#3f352c',
                      },
                    }}
                  />
                }
                key={1}
                label="AM"
                sx={{ color: 'black' }}
              />
              <FormControlLabel
                value={false}
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#3f352c',
                      },
                    }}
                  />
                }
                key={2}
                label="PM"
                sx={{ color: 'black' }}
              />
            </RadioGroup>
            <Text sx={{ color: 'black', fontSize: 15 }}>Available Doctors</Text>
            <DisplayDoctor />
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

import { Flex, Image } from 'rebass'

import { ReactNode, useEffect, useCallback } from 'react'
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
import { Option, Select } from '../../../components/select'
import { useState } from 'react'
import { DisplayDoctor } from '../../../components/doctor'
import { useApi } from 'hooks'
import { AmOrPm, Days, getAllService, getDoctors, SearchDoctorDto } from 'api'
import { Services as Service } from 'entities'
import { User } from 'entities/user.entity'
import { CircularProgress, InputAdornment } from '@mui/material'
import { SearchableInput } from '../../../components/input/Input'

const Services = ({ onChange }: { onChange: (v: string) => void }) => {
  const { data } = useApi(async () => await getAllService())

  const services: Service[] = data?.data ?? []

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isSearchable={true}
      name="color"
      options={[
        { label: 'All', value: '' },
        ...services.map((d) => ({ label: d.name, value: d.id })),
      ]}
      onChange={(v) => onChange((v as Option).value)}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,

          primary25: '#f7efe3',
          primary: '#3f352c',
        },
      })}
    />
  )
}

const SearchInput = ({
  props,
  children,
}: {
  props: SearchDoctorDto
  children: (data: User[]) => ReactNode
}) => {
  const [search, setSearch] = useState('')

  const [users, setUsers] = useState<User[]>([])

  const refresh = useCallback(
    async (v: string) => {
      const resp = await getDoctors({ ...props, name: v })
      setUsers(resp.data.data)
    },
    [setUsers, props]
  )
  useEffect(() => {
    refresh(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, refresh])

  return (
    <>
      <SearchableInput
        value={search}
        onChange={(e) => setSearch(() => e.target.value)}
        label="Search"
        placeHolder="Search doctor"
        onSearch={async (v) => await refresh(v)}
      />
      {children(users)}
    </>
  )
}

export default function Step1(props: SearchDoctorDto) {
  const today = new Date()
  const { pathname, replace, query, push } = useRouter()
  const [date, setDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  )

  return (
    <Main isLink={true}>
      <Flex flexDirection={'column'} flex={1} width={'100%'}>
        <Section
          title="Set Appointment"
          backgroundColor={theme.mainColors.fifth}
          contentProps={{
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'start',
          }}
        >
          <Calendar
            minDate={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1
              )
            }
            value={date}
            onChange={setDate}
          />
          <Flex
            width={'100%'}
            sx={{
              backgroundColor: 'white',
              padding: 12,
              borderRadius: 5,
              border: '0.5px solid gray',
              gap: 10,
              maxHeight: '100vh',
            }}
            flexDirection={'column'}
          >
            {!!date && (
              <Text sx={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                {format(date, 'cccc LLLL d, yyyy')}
              </Text>
            )}

            <SearchInput
              props={{
                ...props,
                day: date
                  ? (format(date, 'cccc LLLL d, yyyy')
                      .split(' ')[0]
                      .toLowerCase() as Days)
                  : undefined,
              }}
            >
              {(data) => (
                <>
                  <Services
                    onChange={(v) =>
                      replace({ pathname, query: { ...query, serviceId: v } })
                    }
                  />
                  <RadioGroup
                    defaultValue={true}
                    name="radio-buttons-group"
                    sx={{ flexDirection: 'row' }}
                    onChange={(e) =>
                      replace({
                        pathname,
                        query: {
                          ...query,
                          time:
                            e.target.value === 'true' ? AmOrPm.AM : AmOrPm.PM,
                        },
                      })
                    }
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
                  <Text sx={{ color: 'black', fontSize: 15 }}>
                    Available Doctors
                  </Text>
                  <DisplayDoctor
                    data={data}
                    onItemClick={(v) =>
                      push({
                        pathname: 'step2',
                        query: {
                          id: v,
                          date: date?.toISOString(),
                        },
                      })
                    }
                  />
                </>
              )}
            </SearchInput>
          </Flex>
        </Section>
      </Flex>
    </Main>
  )
}

export async function getServerSideProps(
  context: any
): Promise<{ props: SearchDoctorDto }> {
  const serviceId = context.query.serviceId ?? ''
  const time = context.query.time ?? AmOrPm.AM
  const page = context.query.page ?? 0
  const limit = context.query.limit ?? 100

  return {
    props: { serviceId, time, page: Number(page), limit: Number(limit) },
  }
}

import { Flex, Image } from 'rebass'

import { ReactNode, useEffect, useCallback } from 'react'
import 'react-calendar/dist/Calendar.css'
import { Main } from '../../../components/main'
import { Calendar } from '../../../components/calendar'
import { useRouter } from 'next/router'
import { Section } from '../../../components/sections'
import { theme as colorTheme } from '../../../utils/theme'
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
          primary25: colorTheme.colors.lightpink,
          primary: colorTheme.colors.darkpink,
        },
      })}
    />
  )
}

const SearchInput = ({
  props,
  children,
  setIsSearching,
  isSearching,
}: {
  props: SearchDoctorDto
  children: (data: User[]) => ReactNode
  setIsSearching: (v: boolean) => void
  isSearching: boolean
}) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<User[] | null>([])
  const [fetchHandler, setFetchHandler] = useState(0)

  const refresh = useCallback(
    async (v: string, handler: number) => {
      if (handler === 1) {
        const resp = await getDoctors({ ...props, name: v })
        setUsers(resp.data.data)
        setIsSearching(false)
        setFetchHandler(0)
      }
    },
    [setUsers, props, setIsSearching, setFetchHandler]
  )

  useEffect(() => {
    if (fetchHandler === 1 && isSearching) {
      setUsers(null)
    }
  }, [fetchHandler, setUsers, isSearching])

  useEffect(() => {
    if (fetchHandler === 1 && users === null && isSearching) {
      refresh(search, fetchHandler)
    }
  }, [users, fetchHandler, refresh, search, isSearching])

  useEffect(() => {
    if (fetchHandler === 0 && isSearching) {
      setFetchHandler(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, isSearching, setFetchHandler])

  return (
    <>
      <SearchableInput
        value={search}
        onChange={(e) => setSearch(() => e.target.value)}
        label="Search"
        placeHolder="Search doctor"
        onSearch={async (v) => await refresh(v, 1)}
      />
      {children(users ?? [])}
    </>
  )
}

export default function Step1(props: SearchDoctorDto) {
  const today = new Date()
  const { pathname, replace, query, push } = useRouter()
  const [date, setDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  )
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setIsSearching(true)
  }, [date, setIsSearching, props.serviceId, props.time])

  return (
    <Main isLink={true}>
      <Flex flexDirection={'column'} flex={1} width={'100%'}>
        <Section
          title="Set An Appointment"
          contentProps={{
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'start',
          }}
          textProps={{
            backgroundColor: colorTheme.colors.blackgray,
            width: '100%',
            padding: 3,
            textAlign: 'center',
            color: 'white',
          }}
          isFetching={isSearching}
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
              backgroundColor: colorTheme.colors.black,
              borderRadius: 5,
              border: '0.5px solid gray',
            }}
            flexDirection={'column'}
          >
            {!!date && (
              <Text
                sx={{
                  color: colorTheme.colors.white,
                  fontSize: 18,
                  fontWeight: 'bold',
                  width: '100%',
                  position: 'relative',
                  padding: 2,
                }}
              >
                {format(date, 'cccc LLLL d, yyyy')}
              </Text>
            )}
            <Flex
              width={'100%'}
              sx={{
                backgroundColor: 'white',
                padding: 12,
                gap: 10,
                maxHeight: '100vh',
              }}
              flexDirection={'column'}
            >
              <SearchInput
                isSearching={isSearching}
                props={{
                  ...props,
                  day: date
                    ? (format(date, 'cccc LLLL d, yyyy')
                        .split(' ')[0]
                        .toLowerCase() as Days)
                    : undefined,
                }}
                setIsSearching={setIsSearching}
              >
                {(data) => (
                  <>
                    <Flex
                      flexDirection={['column', 'row']}
                      sx={{ gap: 2, width: '100%' }}
                    >
                      <Flex flexDirection={'column'} flex={1}>
                        <Services
                          onChange={(v) =>
                            replace({
                              pathname,
                              query: { ...query, serviceId: v },
                            })
                          }
                        />
                      </Flex>
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
                                e.target.value === 'true'
                                  ? AmOrPm.AM
                                  : AmOrPm.PM,
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
                    </Flex>
                    <Text sx={{ color: 'black', fontSize: 15 }}>
                      Available Doctors
                    </Text>
                    <DisplayDoctor
                      data={isSearching ? [] : data}
                      onItemClick={(v) =>
                        push({
                          pathname: 'step2',
                          query: {
                            id: v,
                            date: date?.toISOString(),
                            ...query,
                          },
                        })
                      }
                    />
                  </>
                )}
              </SearchInput>
            </Flex>
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

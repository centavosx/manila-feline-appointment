import { Flex, Image } from 'rebass'

import { useEffect, useState, useCallback } from 'react'
import 'react-calendar/dist/Calendar.css'
import { Text } from '../../../components/text'
import { Main } from '../../../components/main'
import { Calendar } from '../../../components/calendar'
import Router, { useRouter } from 'next/router'
import { Section } from '../../../components/sections'
import { theme } from '../../../utils/theme'
import { FormContainer } from '../../../components/forms'
import { Formik } from 'formik'
import { FormInput, InputError } from '../../../components/input'
import { Option, Select } from '../../../components/select'
import { Label } from '../../../components/label'
import { Button } from '../../../components/button'
import { Loading } from '../../../components/loading'
import { useApi } from 'hooks'
import {
  AmOrPm,
  CreateAppointmentDto,
  getDoctorInfo,
  refreshAppointment,
  saveAppoinment,
  verifyAppointment,
  VerifyAppointmentDto,
} from 'api'
import { Availability, User } from 'entities/user.entity'
import { FormikValidation } from 'helpers'
import { verify } from 'crypto'

type Step2Props = {
  isAllowed: boolean
  id: string
  date: string
}

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

type TimeSetterProps = [
  string[],
  string[],
  string[],
  string[],
  string[],
  string[],
  string[]
]

const ValidateEmail = ({ appointmentId }: { appointmentId: string }) => {
  const [error, setError] = useState('')
  const { back, replace } = useRouter()
  const [time, setTime] = useState(180)
  const [isSubmitRefresh, setIsSubmitRefresh] = useState(false)
  const goBack = useCallback(() => {
    if (window.history.length > 2) return back()
    return replace('/')
  }, [back, replace])

  useEffect(() => {
    let interval = setInterval(() => {
      setTime((i) => (i > 0 ? i - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [setTime, time])

  const refreshCode = useCallback(() => {
    setIsSubmitRefresh(true)
    refreshAppointment(appointmentId)
      .then(() => setTime(180))
      .finally(() => setIsSubmitRefresh(false))
  }, [setTime, appointmentId, setIsSubmitRefresh])

  return (
    <Formik<VerifyAppointmentDto>
      initialValues={{
        verification: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true)
        if (time > 0)
          return verifyAppointment(appointmentId, values)
            .then(() => {
              goBack()
            })
            .catch((d) => {
              setError(
                d?.request?.status === 400
                  ? 'Invalid Code'
                  : 'An error has occured'
              )
            })
            .finally(() => setSubmitting(false))
        return setError(
          'Your verification code is now expired, please resend new verification code.'
        )
      }}
      validationSchema={FormikValidation.verify}
    >
      {({ isSubmitting }) => (
        <FormContainer
          flexProps={{
            sx: { gap: 18 },
            justifyContent: 'center',
          }}
          label="Please verify"
          labelProps={{
            width: '100%',
            fontSize: 20,
            fontWeight: 600,
            mb: 10,
          }}
        >
          {(isSubmitting || isSubmitRefresh) && <Loading />}
          <Flex sx={{ flexDirection: 'column', gap: 2, width: '100%' }}>
            <FormInput
              name="verification"
              label={'Verification Code'}
              variant="outlined"
              inputcolor={{
                labelColor: 'gray',
                backgroundColor: 'transparent',
                borderBottomColor: theme.mainColors.first,
                color: 'black',
              }}
              sx={{ color: 'black', width: '100%' }}
              placeholder="Please type verification code"
            />
            <Flex
              alignSelf={'end'}
              alignItems={'end'}
              sx={{ gap: 1, width: '100%' }}
            >
              {time > 0 && (
                <Text textAlign={'right'} flex={1} sx={{ color: 'black' }}>
                  {time}s
                </Text>
              )}
              <Text
                sx={{
                  color: 'blue',
                  flex: [],
                  width: time === 0 ? '100%' : 'auto',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  textAlign: 'right',
                }}
                onClick={refreshCode}
              >
                Resend
              </Text>
            </Flex>
          </Flex>
          <InputError error={error} />
          <Button
            type="submit"
            fullWidth={false}
            style={{ width: 120, alignSelf: 'flex-end' }}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </FormContainer>
      )}
    </Formik>
  )
}

export default function Step2({ id, date, isAllowed }: Step2Props) {
  const { data, isFetching } = useApi(
    async () => await getDoctorInfo(id, new Date(date))
  )
  const [appointmentId, setAppointmentId] = useState(null)

  const [availability, setAvailability] = useState<TimeSetterProps>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ])

  const user: User = data ?? {}

  useEffect(() => {
    if (!isAllowed) Router.replace('/set-an-appointment/step1/')
  }, [isAllowed])

  const setAvail = useCallback(() => {
    let newTime: TimeSetterProps = [[], [], [], [], [], [], []]
    data.availability?.forEach((d: Availability) => {
      const startDt = new Date(d.startDate)
      const endDt = new Date(d.endDate)
      const day = startDt.getDay()
      const startAndEnd = `${startDt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })} to ${endDt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}`
      newTime[day] = [...newTime[day], startAndEnd]
    })
    setAvailability(newTime)
  }, [data, setAvailability])

  useEffect(() => {
    if (!!data) setAvail()
  }, [data, setAvail])

  return (
    <Main isLink={true}>
      <Flex flexDirection={'column'} flex={1} width={'100%'}>
        <Section
          title="Set Appointment"
          backgroundColor={theme.mainColors.fifth}
          height={'100wh'}
          contentProps={{
            flexDirection: 'column',
            sx: {
              gap: 4,
              border: '0.5px solid gray',
              backgroundColor: 'white',
              padding: 24,
              borderRadius: 5,
            },
          }}
          isFetching={isFetching}
        >
          <Flex
            flex={1}
            sx={{
              width: '100%',
              gap: 2,
            }}
            flexDirection={['column', 'row']}
            alignItems={'center'}
          >
            {/* <Image
              src="https://my.alfred.edu/zoom/_images/foster-lake.jpg"
              width={140}
              height={140}
              sx={{ borderRadius: '100%' }}
              alt="profile"
            /> */}
            <Flex flex={1} sx={{ flexDirection: 'column', gap: 2 }}>
              <Text
                sx={{
                  color: 'black',
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: ['center', 'start'],
                }}
              >
                {user.name}
              </Text>
              <Text
                sx={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: ['center', 'start'],
                }}
              >
                {user.position}
              </Text>
              <Text
                sx={{
                  color: 'black',
                  fontSize: 14,
                  textAlign: ['center', 'start'],
                }}
              >
                {user.description}
              </Text>
              <Text
                sx={{
                  mt: 10,
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: ['center', 'start'],
                }}
              >
                Availability
              </Text>
              {availability.map(
                (d, i) =>
                  d.length > 0 && (
                    <Flex
                      key={i}
                      width={'100%'}
                      flexDirection={'column'}
                      sx={{ gap: 10 }}
                    >
                      <Text
                        sx={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: 600,

                          textAlign: ['center', 'start'],
                        }}
                      >
                        {days[i]}
                      </Text>
                      <Text
                        sx={{
                          color: 'black',
                          fontSize: 12,
                          fontWeight: 400,
                          fontStyle: 'italic',
                          textAlign: ['center', 'start'],
                        }}
                      >
                        {d?.join(', ')}
                      </Text>
                    </Flex>
                  )
              )}
            </Flex>
          </Flex>

          <Formik<CreateAppointmentDto>
            initialValues={{
              serviceId: '',
              date: new Date(date),
              email: '',
              name: '',
              time: undefined,
              message: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              saveAppoinment(user?.id, values)
                .then((d) => setAppointmentId(d.data.id))
                .finally(() => setSubmitting(false))
            }}
            validationSchema={FormikValidation.createAppointment}
          >
            {({ handleChange, values, errors, isSubmitting }) => (
              <FormContainer
                flexProps={{
                  sx: { gap: 18 },
                  justifyContent: 'center',
                }}
                label="Please fill up the form"
                labelProps={{
                  width: '100%',
                  fontSize: 20,
                  fontWeight: 600,
                  mb: 10,
                }}
              >
                {isSubmitting && <Loading />}
                <FormInput
                  name="name"
                  label={'Full name'}
                  variant="outlined"
                  inputcolor={{
                    labelColor: 'gray',
                    backgroundColor: 'transparent',
                    borderBottomColor: theme.mainColors.first,
                    color: 'black',
                  }}
                  sx={{ color: 'black', width: '100%' }}
                  placeholder="Please type your full name"
                />
                <FormInput
                  name="email"
                  type={'email'}
                  label={'Email'}
                  variant="outlined"
                  inputcolor={{
                    labelColor: 'gray',
                    backgroundColor: 'transparent',
                    borderBottomColor: theme.mainColors.first,
                    color: 'black',
                  }}
                  sx={{ color: 'black', width: '100%' }}
                  placeholder="Please type your email"
                />
                <Flex flexDirection={'column'} sx={{ gap: 2 }}>
                  <Label sx={{ fontWeight: 600 }}>Please select time</Label>
                  <InputError error={errors.time} />
                </Flex>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="time"
                  options={[
                    { label: 'Morning', value: AmOrPm.AM },
                    { label: 'Afternoon', value: AmOrPm.PM },
                  ].reduce((prev: Option[], curr: Option) => {
                    if (curr.label === 'Morning' && user?.hasAm)
                      return [...prev, { label: 'Morning', value: AmOrPm.AM }]
                    if (curr.label === 'Afternoon' && user?.hasPm)
                      return [...prev, { label: 'Afternoon', value: AmOrPm.PM }]
                    return prev
                  }, [])}
                  value={
                    values.time === AmOrPm.AM
                      ? { label: 'Morning', value: AmOrPm.AM }
                      : values.time === AmOrPm.PM
                      ? { label: 'Afternoon', value: AmOrPm.PM }
                      : undefined
                  }
                  controlStyle={{
                    padding: 8,
                    borderColor: 'black',
                    backgroundColor: 'white',
                  }}
                  onChange={(v) => handleChange('time')((v as any).value)}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#f7efe3',
                      primary: '#3f352c',
                    },
                  })}
                  placeholder="Select Time"
                />

                <Flex flexDirection={'column'} sx={{ gap: 2 }}>
                  <Label sx={{ fontWeight: 600 }}>Please select service</Label>
                  <InputError error={errors.serviceId} />
                </Flex>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="serviceId"
                  options={user?.services?.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                  controlStyle={{
                    padding: 8,
                    borderColor: 'black',
                    backgroundColor: 'white',
                  }}
                  value={
                    !!values.serviceId
                      ? {
                          label: user.services.find(
                            (d) => d.id === values.serviceId
                          )!?.name,
                          value: values.serviceId,
                        }
                      : undefined
                  }
                  onChange={(v) => handleChange('serviceId')((v as any).value)}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#f7efe3',
                      primary: '#3f352c',
                    },
                  })}
                  placeholder="Select Service"
                />
                <FormInput
                  name="message"
                  label={'Message'}
                  multiline={true}
                  variant="outlined"
                  inputcolor={{
                    labelColor: 'gray',
                    backgroundColor: 'transparent',
                    borderBottomColor: theme.mainColors.first,
                    color: 'black',
                  }}
                  minRows={12}
                  maxRows={12}
                  padding={20}
                  sx={{ color: 'black', width: '100%', mt: 2 }}
                />

                {!appointmentId && (
                  <Button
                    type="submit"
                    fullWidth={false}
                    style={{ width: 120, alignSelf: 'flex-end' }}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                )}
              </FormContainer>
            )}
          </Formik>

          {!!appointmentId && <ValidateEmail appointmentId={appointmentId} />}
        </Section>
      </Flex>
    </Main>
  )
}

export async function getServerSideProps(context: any) {
  const id = (context.query.id ?? '') as string
  const date = (context.query.date ?? '') as string

  return {
    props: { id, date, isAllowed: !!id && !!date },
  }
}

import { API, apiAuth } from '../utils'

export type CreateEmailDto = {
  from: string

  name: string

  subject: string

  message: string
}

export const sendMail = async (data: CreateEmailDto) => {
  const response = await API.post('/other/mail', data)
  return response
}

export enum AmOrPm {
  AM = 'AM',
  PM = 'PM',
}

export enum Days {
  sun = 'sunday',
  mon = 'monday',
  tue = 'tuesday',
  wed = 'wednesday',
  thur = 'thursday',
  fri = 'friday',
  sat = 'saturday',
}

export type SearchDoctorDto = {
  name?: string

  serviceId?: string

  time?: AmOrPm

  page?: number

  limit?: number

  day?: Days
}

export const getDoctors = async (data: SearchDoctorDto) => {
  const response = await API.get('/other/doctor', {
    params: {
      ...data,
    },
  })
  return response
}

export const getDoctorInfo = async (id: string, date: Date) => {
  const response = await API.get('/other/doctor/' + id + '/information', {
    params: {
      date,
    },
  })
  return response
}

export enum Gender {
  male = 'MALE',
  female = 'FEMALE',
}

export type CreateAppointmentDto<T extends any = number> = {
  serviceId: string

  email: string

  date: Date

  name: string

  time?: T

  message: string

  petName?: string

  birthDate?: string

  gender?: Gender
}

export type VerifyAppointmentDto = {
  verification: string
}

export const saveAppoinment = async (data: CreateAppointmentDto<string>) => {
  return await apiAuth.post('/other/set-an-appoinment', { ...data, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
}

export const verifyAppointment = async (
  id: string,
  data: VerifyAppointmentDto
) => {
  return await apiAuth.patch('/other/verify/' + id, {
    ...data,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
}

export const refreshAppointment = async (id: string) => {
  return await apiAuth.patch('/other/refresh/' + id)
}

export const getUnavailableAppointment = async (options?: {
  month: number
  year: number
}) => {
  return await apiAuth.get('/other/unavailable', {
    params: {
      ...options,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  })
}

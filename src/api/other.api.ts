import { API } from '../utils'

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

export type CreateAppointmentDto = {
  serviceId: string

  email: string

  date: Date

  name: string

  time?: AmOrPm

  message: string

  petName?: string

  birthDate?: string

  age?: number

  gender?: Gender
}

export type VerifyAppointmentDto = {
  verification: string
}

export const saveAppoinment = async (
  id: string,
  data: CreateAppointmentDto
) => {
  return await API.post('/other/doctor/' + id + '/set-an-appoinment', data)
}

export const verifyAppointment = async (
  id: string,
  data: VerifyAppointmentDto
) => {
  return await API.patch('/other/verify/' + id, data)
}

export const refreshAppointment = async (id: string) => {
  return await API.patch('/other/refresh/' + id)
}

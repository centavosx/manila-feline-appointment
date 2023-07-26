import * as Yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(Yup)

export const FormikValidation = {
  createMail: Yup.object().shape({
    from: Yup.string().email('Please enter a valid email').required('Required'),
    subject: Yup.string()
      .min(1, 'Too Short!')
      .max(5000, 'Too Long!')
      .required('Required'),
    name: Yup.string()
      .min(1, 'Too Short!')
      .max(5000, 'Too Long!')
      .required('Required'),
    message: Yup.string()
      .min(1, 'Too Short!')
      .max(5000, 'Too Long!')
      .required('Required'),
  }),

  createAppointment: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Required'),
    time: Yup.string().required('Required'),
    serviceId: Yup.string().required('Required'),
    name: Yup.string()
      .min(1, 'Too Short!')
      .max(5000, 'Too Long!')
      .required('Required'),
    message: Yup.string().min(1, 'Too Short!').max(5000, 'Too Long!'),
    petName: Yup.string().required('Required'),

    birthDate: Yup.string().required('Required'),

    gender: Yup.string().required('Required'),
  }),

  verify: Yup.object().shape({
    verification: Yup.string()
      .min(2, 'Too Short!')
      .required('Please enter a valid code'),
  }),

  login: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Required'),
    password: Yup.string().required('Required'),
  }),
  register: Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Required'),
    password: Yup.string().trim().password().required('Required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  }),
  updateInfo: Yup.object().shape({
    name: Yup.string().required('Required'),
    password: Yup.string().trim().password(),
    newP: Yup.string()
      .trim()
      .ensure()
      .when('password', {
        is: (value: any) => !!value,
        then: Yup.string().password().required('Type password'),
      }),
    confirm: Yup.string()
      .oneOf([Yup.ref('newP')], 'Passwords must match')
      .ensure()
      .when('password', {
        is: (value: any) => !!value,
        then: Yup.string().required('Type password'),
      }),
  }),
  code: Yup.object().shape({
    code: Yup.string().required('Required'),
  }),
  reset: Yup.object().shape({
    password: Yup.string().trim().password().required('Required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  }),
  forgot: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Required'),
  }),
  reviewProduct: Yup.object().shape({
    message: Yup.string().required('Required'),
    review: Yup.number()
      .min(1, 'Minimum is 1')
      .max(5, 'Max is 5')
      .required('Required'),
  }),
}

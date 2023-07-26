import { FormContainer } from 'components/forms'
import { FormInput } from 'components/input'
import { Formik } from 'formik'
import { Flex, Text } from 'rebass'
import { theme } from 'utils/theme'

import { useUser } from 'hooks'
import { Button } from 'components/button'
import { FormikValidation } from 'helpers'
import { Loading } from 'components/loading'

export default function PersonalInformation() {
  const { user } = useUser()

  return (
    <Flex flexDirection={'column'} width={'100%'} sx={{ gap: 2 }}>
      <Text as={'h1'}>Profile Information</Text>
      {!!user && (
        <Formik
          validationSchema={FormikValidation.updateInfo}
          initialValues={{
            id: user.id,
            name: user.name,
            email: user.email,
            created: user.created,
            password: '',
          }}
          onSubmit={(values: any, { setSubmitting }) => {
            const copy = structuredClone(values)
            setSubmitting(true)
            delete copy.id
            // updateProduct(id, copy).finally(() => {
            //   setSubmitting(false)
            // })
          }}
        >
          {({ values, errors, setFieldValue, isSubmitting }) => (
            <FormContainer>
              {!!isSubmitting && <Loading />}

              <FormInput
                name="id"
                disabled={true}
                label={'ID'}
                variant="filled"
                inputcolor={{
                  labelColor: 'gray',
                  backgroundColor: 'white',
                  borderBottomColor: theme.mainColors.first,
                  color: 'black',
                }}
                sx={{ color: 'black', width: '100%' }}
              />
              <FormInput
                name="name"
                label={'Name'}
                variant="filled"
                inputcolor={{
                  labelColor: 'gray',
                  backgroundColor: 'white',
                  borderBottomColor: theme.mainColors.first,
                  color: 'black',
                }}
                sx={{ color: 'black', width: '100%' }}
              />
              <FormInput
                name="email"
                label="Email"
                placeholder="Type email"
                variant="filled"
                inputcolor={{
                  labelColor: 'gray',
                  backgroundColor: 'white',
                  borderBottomColor: theme.mainColors.first,
                  color: 'black',
                }}
                disabled={true}
                sx={{ color: 'black', width: '100%' }}
              />
              <FormInput
                name="password"
                label="Old Password"
                placeholder="Type old password"
                variant="filled"
                inputcolor={{
                  labelColor: 'gray',
                  backgroundColor: 'white',
                  borderBottomColor: theme.mainColors.first,
                  color: 'black',
                }}
                sx={{ color: 'black', width: '100%' }}
              />
              {!!values.password && (
                <>
                  <FormInput
                    name="newP"
                    label="New password"
                    placeholder="Type new password"
                    variant="filled"
                    inputcolor={{
                      labelColor: 'gray',
                      backgroundColor: 'white',
                      borderBottomColor: theme.mainColors.first,
                      color: 'black',
                    }}
                    sx={{ color: 'black', width: '100%' }}
                  />
                  <FormInput
                    name="confirm"
                    label="Confirm password"
                    placeholder="Type new password"
                    variant="filled"
                    inputcolor={{
                      labelColor: 'gray',
                      backgroundColor: 'white',
                      borderBottomColor: theme.mainColors.first,
                      color: 'black',
                    }}
                    sx={{ color: 'black', width: '100%' }}
                  />
                </>
              )}

              <Button type="submit" style={{ width: 150 }}>
                Save
              </Button>
            </FormContainer>
          )}
        </Formik>
      )}
    </Flex>
  )
}

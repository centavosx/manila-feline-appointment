import { Flex, Image } from 'rebass'

import 'react-calendar/dist/Calendar.css'
import { Text } from '../../../components/text'
import { Main } from '../../../components/main'
import { Calendar } from '../../../components/calendar'
import { useRouter } from 'next/router'
import { Section } from '../../../components/sections'
import { theme } from '../../../utils/theme'
import { FormContainer } from '../../../components/forms'
import { Formik } from 'formik'
import { FormInput } from '../../../components/input'

export default function Step2() {
  const { replace } = useRouter()
  return (
    <Main isLink={true}>
      <Flex flexDirection={'column'} flex={1} width={'100%'}>
        <Section
          title="Set Appointment"
          backgroundColor={theme.mainColors.fourth}
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
                Dr. Vincent Lennuel B. Llanto
              </Text>
              <Text
                sx={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: ['center', 'start'],
                }}
              >
                Dr. Vincent Lennuel B. Llanto
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
                Availability
              </Text>
            </Flex>
          </Flex>

          <Formik<{ test: string }>
            initialValues={{ test: '' }}
            onSubmit={() => {}}
          >
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
            </FormContainer>
          </Formik>
        </Section>
      </Flex>
    </Main>
  )
}

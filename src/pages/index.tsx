import { Flex, Image } from 'rebass'
import { theme } from '../utils/theme'
import { Text } from '../components/text'

import { Main } from '../components/main'
import { Box, BoxContainer } from '../components/box'
import { Section } from '../components/sections'
import { FormInput } from '../components/input'
import { Formik } from 'formik'
import { Button } from '../components/button'
import { FormContainer } from '../components/forms'
import { useRouter } from 'next/router'

const team: { name: string; position: string }[] = [
  {
    name: 'Ma. Josefina R. De Guzman',
    position: 'General Manager/ Co Owner',
  },
  {
    name: 'Jaymie Rose M. Hayo, DVM',
    position: 'Practice owner/ lead veterinarian',
  },
  {
    name: 'Danica D. Matias, DVM',
    position: 'Associate Veterinarian',
  },
  {
    name: 'Reymond Macawiwili',
    position: 'Senior Assistant',
  },
  {
    name: 'Ricvie Mateo',
    position: 'Assistant',
  },
  {
    name: 'Din Raguindin',
    position: 'Assistant',
  },
]

export default function Home() {
  const { replace } = useRouter()
  return (
    <Main id="home">
      <Flex flexDirection={'column'} alignItems="center">
        <Image src="/assets/mingming.png" alt="ming" width={'100%'} />
        <Section id="home" backgroundColor={theme.mainColors.second}>
          <Flex
            sx={{
              flexDirection: ['column-reverse', 'column-reverse', 'row'],
              gap: 2,
            }}
          >
            <Flex
              flex={1}
              alignSelf="center"
              flexDirection={'column'}
              sx={{ gap: [24] }}
            >
              <Text sx={{ fontSize: 40 }}>Manila Feline Center</Text>
              <Text
                sx={{
                  fontSize: 16,
                  flex: 1,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {`We offer intensive veterinary care, with qualified personnel on-hand to ensure that your pets are properly taken care of. Some of the services we offer are preventive care, wellness, consultation, nutritional counseling, laboratory, surgery, telemedicine, dental care, hospitalization, after-hour emergency, and we also have pet supplies.`}
              </Text>
              <Button
                type="submit"
                backgroundcolor={theme.colors.verylight}
                activecolor={theme.mainColors.sixth}
                hovercolor={theme.mainColors.seventh}
                textcolor={theme.mainColors.first}
                style={{ width: '200px' }}
                onClick={() => replace('/set-an-appointment')}
              >
                BOOK AN APPOINTMENT
              </Button>
            </Flex>
            <Flex
              flex={1}
              height={'100%'}
              justifyContent="center"
              alignSelf={'center'}
            >
              <Image src="/assets/mingmore.png" alt="ming" />
            </Flex>
          </Flex>
        </Section>
        <Section
          id="mission"
          title="Our mission"
          backgroundColor={theme.mainColors.third}
        >
          We provide quality medical, surgical, and dental care to every feline
          or cat in need. We are dedicated to treating every cat as if they were
          our own and exceeding our client’s expectations.
        </Section>
        <Section
          id="vision"
          title="Our vision"
          backgroundColor={theme.mainColors.fourth}
        >
          We envision creating a culture of lifelong healthier cats in the
          community.
        </Section>
        <Section
          id="commitment"
          title="Our commitment"
          backgroundColor={theme.mainColors.fifth}
        >
          <Text
            sx={{
              fontSize: 16,
              flex: 1,
              whiteSpace: 'pre-wrap',
              color: 'black',
              textAlign: 'center',
            }}
          >
            {`We share your love of cats and are committed to providing expert-level feline medicine, dental, and surgery without sacrificing accessibility and compassion. 
We adopt a progressive, holistic and comprehensive veterinary approach to patient ailments. 
We maintain the highest standards and place an emphasis on constantly improving our medical, surgical, and diagnostic capabilities, to improve all outcomes.
We are committed to honesty, transparency, and building up a relationship based on trust and respect. 
`}
          </Text>
        </Section>
        <Section
          id="doctors"
          title="Our Team"
          backgroundColor={theme.mainColors.fourth}
          contentProps={{ pl: [null, 80, 150], pr: [null, 80, 150] }}
        >
          <Text
            sx={{
              fontSize: 16,
              flex: 1,
              whiteSpace: 'pre-wrap',
              color: 'black',
              textAlign: 'center',
            }}
          >
            {`Our team understands the unique bond that you have with your pet cat and our role in that relationship.  We feel honored to be entrusted with your cat's well-being, and work hard to provide services that will support that endeavor.
Here at Manila Feline Center, an expert staff of veterinarian doctors and a skilled team of technicians are here to do just that.  We are committed to providing quality medical and health care for your pets.
Under the leadership of our highly skilled veterinary doctors, your pet is always in good hands. We're ready when your pet needs us.
`}
          </Text>
          <BoxContainer>
            {team.map((d, i) => (
              <Box
                sx={{
                  borderColor: theme.mainColors.first,
                  padding: 1,
                  borderWidth: 1,
                  textAlign: 'center',
                }}
                flexProps={{
                  sx: { gap: 2 },
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
                key={i}
              >
                <Flex flexDirection={'column'} sx={{ gap: 1 }}>
                  <Text
                    sx={{
                      color: theme.mainColors.first,
                      fontWeight: 'bold',
                    }}
                  >
                    {d.name}
                  </Text>
                  <Text
                    sx={{
                      color: theme.mainColors.first,
                      fontWeight: 'bold',
                    }}
                  >
                    {d.position}
                  </Text>
                </Flex>
              </Box>
            ))}
          </BoxContainer>
        </Section>

        <Section
          id="aboutus"
          title="About Us"
          backgroundColor={theme.mainColors.fifth}
          contentProps={{ pl: [null, 80, 150], pr: [null, 80, 150] }}
        >
          <Text
            sx={{
              fontSize: 16,
              flex: 1,
              whiteSpace: 'pre-wrap',
              color: 'black',
            }}
          >
            {`Manila Feline Center is a cat-only veterinary clinic, the very FIRST ISFM Accredited Cat-Friendly Clinic here in the country, offering a unique, special place where you and your cats are listened to and treated with respect.   We strive to help keep your cat happy and healthy.   Established on __Feb 1st 2022 (date)  by  Ma. Josefina Rada De Guzman and Dr Jaymie Rose Hayo  aiming to provide the best possible medical, surgical and dental care for your cherished cats.

Our veterinary services and facilities are designed to offer preventive care for healthy pets, early detection and treatment of disease as your pet ages, and complete medical, surgical, and dental care.  No matter whether your furry friend is your first pet or you’ve been a lifelong pet owner, we are here to give you exactly the assistance and information you need.  We are committed to providing the best possible veterinary care for all pets and pet owners, irrespective of their medical or material circumstances. Our experience and love for cats ensure that cats receive the best care possible. 

We provide comprehensive and compassionate medical care.  

Currently serving the cats and cat owners in Quezon City, and we look forward to serving you for years to come.  We are currently operating at 0238 Sanly Building P. Tuazon, Cubao, Quezon City.

No matter which veterinarian your pet sees you can be assured you are getting the highest quality care here at Manila Feline Center.
`}
          </Text>
        </Section>
        <Section
          id="contactus"
          padding={0}
          backgroundColor={theme.mainColors.sixth}
          contentProps={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            sx: {
              position: 'relative',
            },
          }}
        >
          <Image
            src="/assets/meow.png"
            width="100%"
            height={'100%'}
            alt="background"
            sx={{ position: 'absolute' }}
          />
          <Flex
            alignSelf={'flex-end'}
            sx={{
              width: ['100%', '50%'],
              zIndex: 1,
              margin: 10,
              height: '100%',
            }}
            flexDirection="column"
            backgroundColor={theme.mainColors.sixth}
          >
            <Formik<{ test: string }>
              initialValues={{ test: '' }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))

                  setSubmitting(false)
                }, 400)
              }}
            >
              <FormContainer
                flexProps={{
                  sx: { gap: 10 },
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                  width: '100%',
                }}
                label="Contact Us"
                labelProps={{
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Flex
                  sx={{
                    gap: [10],
                    flexDirection: ['column', 'row'],
                    width: '100%',
                  }}
                >
                  <FormInput
                    name="name"
                    label={'Name'}
                    variant="filled"
                    inputcolor={{
                      labelColor: 'gray',
                      backgroundColor: theme.mainColors.fourth,
                      borderBottomColor: theme.mainColors.first,
                      color: 'black',
                    }}
                    sx={{ color: 'black', width: '100%' }}
                    placeholder="Please type your password"
                  />
                  <FormInput
                    name="email"
                    label={'Email'}
                    variant="filled"
                    inputcolor={{
                      labelColor: 'gray',
                      backgroundColor: theme.mainColors.fourth,
                      borderBottomColor: theme.mainColors.first,
                      color: 'black',
                    }}
                    sx={{ color: 'black', width: '100%' }}
                    placeholder="Please type your password"
                  />
                </Flex>
                <FormInput
                  name="subject"
                  label={'Subject'}
                  variant="filled"
                  inputcolor={{
                    labelColor: 'gray',
                    backgroundColor: theme.mainColors.fourth,
                    borderBottomColor: theme.mainColors.first,
                    color: 'black',
                  }}
                  sx={{ color: 'black', width: '100%' }}
                  placeholder="Please type your password"
                />
                <FormInput
                  name="message"
                  label={'Message'}
                  variant="filled"
                  multiline={true}
                  inputcolor={{
                    labelColor: 'gray',
                    backgroundColor: theme.mainColors.fourth,
                    borderBottomColor: theme.mainColors.first,
                    color: 'black',
                  }}
                  minRows={12}
                  maxRows={12}
                  sx={{ color: 'black', width: '100%' }}
                  placeholder="Please type your password"
                />
                <Flex width={'100%'} justifyContent={'end'}>
                  <Button
                    type="submit"
                    backgroundcolor={theme.mainColors.eight}
                    activecolor={theme.mainColors.first}
                    hovercolor={theme.mainColors.second}
                    textcolor={theme.colors.verylight}
                    style={{ width: '100px' }}
                  >
                    Submit
                  </Button>
                </Flex>
              </FormContainer>
            </Formik>
            <Flex
              backgroundColor={theme.mainColors.fourth}
              padding={20}
              flexDirection="row"
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  textAlign: 'center',
                  gap: 1,
                  flex: 1,
                }}
              >
                <Text sx={{ color: 'black' }}>Call us now</Text>
                <Text sx={{ color: 'black' }}>(+639123456789)</Text>
              </Flex>
              <Flex
                sx={{
                  flexDirection: 'column',
                  textAlign: 'center',
                  gap: 1,
                  flex: 1,
                }}
              >
                <Text sx={{ color: 'black' }}>Do you have any inquiries?</Text>
                <Text sx={{ color: 'black' }}>sample@sample.com</Text>
              </Flex>
              <Flex
                sx={{
                  flexDirection: 'column',
                  textAlign: 'center',
                  gap: 1,
                  flex: 1,
                }}
              >
                <Text sx={{ color: 'black' }}>Open hours</Text>
                <Text sx={{ color: 'black' }}>8am to 8pm</Text>
              </Flex>
            </Flex>
          </Flex>
        </Section>
      </Flex>
    </Main>
  )
}

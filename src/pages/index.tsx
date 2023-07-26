import { Flex, Image } from 'rebass'
import { theme } from '../utils/theme'
import { Text } from '../components/text'

import { Main } from '../components/main'
import { Carousel } from '../components/carousel'
import { Section } from '../components/sections'

import { Button } from '../components/button'

import { useRouter } from 'next/router'

import { ButtonModal } from 'components/modal'
import { ServiceIcon } from 'components/icon'

type Services = {
  name: string
  src: string
  description: string
}

const services: Services[] = [
  {
    name: 'Preventive Care',
    src: '/assets/services/Preventive Care.png',
    description: `Early detection is the key to prevention and management of serious medical problems. A thorough physical exam performed by one of our veterinarians is the first diagnostic step used in assessing your pet's health. In addition to an evaluation of all major organ systems, our physical exam also assesses your pet's dental health and weight. Diet, supplements, and medications are recommended as appropriate to ensure a long, healthy life. During the annual visit we recommend blood testing to identify hidden problem areas (such as diabetes, kidney disease, and liver disease). If the physical exam reveals the potential of a specific problem such as thyroid disease, the testing is adjusted to include evaluation for the suspected problem. Finding hidden problems early, before the pet shows signs of disease, allows us more options for treatment or management of that disease and improves quality of life.`,
  },
  {
    name: 'Wellness',
    src: '/assets/services/wellness.png',
    description:
      'Our wellness and vaccination services will allow us to assess the general well-being of your pet. We will be able to see how their overall health is and can determine if they need any treatments or medication, think of this as a checkup to ensure everything is well.',
  },
  {
    name: 'Consultation',
    src: '/assets/services/Consultation.png',
    description:
      'We strongly believe that an ounce of prevention is worth of a pound of cure especially with pets that age much faster than humans. As such, you will  find our veterinarians focusing on preventive care options. Every patient is evaluated and an individual treatment plan is discussed.',
  },
  {
    name: 'Nutritional Counseling',
    src: '/assets/services/nutritional counseling.png',
    description:
      'A process by which a health professional with special training in nutrition helps people make healthy food choices and form healthy eating habits. In cancer treatment, the goal of nutritional counseling is to help patients stay healthy during and after treatment and to stay strong enough to fight infections and the recurrence of disease. Also called dietary counseling.',
  },
  {
    name: 'Laboratory',
    src: '/assets/services/laboratory.png',
    description:
      'Our clinic is fully equipped with analyzers allowing us to get rapid results on critical patients as well as on routine check. Some tests we do includes Digital Radiography, Ultrasonography, Echocardiography, Ophthalmology, Hematology, Chemistry, Tumor Markers, Antibiotic Sensitivity, Specific Diseases Antigen/Antibody testing.',
  },
  {
    name: 'Surgery',
    src: '/assets/services/surgery.png',
    description:
      'Our clinic is equipped to perform most surgical procedures from spays and neuters to soft tissue surgeries. We offer the latest in anesthesia drug protocols in order to provide your pet with a safer and more pain free surgical experience. Out top priority is their safety and comfort during any procedure.',
  },
  {
    name: 'Telemedicine',
    src: '/assets/services/telemedicine.png',
    description:
      'For our clients that cannot bring their pets to our hospital, we now offer a Telemedicine consultation with our dedicated Telemedicine veterinarian. Telemedicine can be applied to pets as well as wildlife.',
  },
  {
    name: 'Dental Care',
    src: '/assets/services/dental care.png',
    description:
      'Cracked and fractured teeth and dental disease can be silent torture for your pet. Regular checkups and teeth cleaning can help prevent the progression of dental problems, and our in-depth assessments will identify any existing issues. Our clinic provides cleanings under anesthesia to ensure your pet’s teeth are cleaned above and below the gum line, which is crucial for their oral health.',
  },
  {
    name: 'Hospitalization',
    src: '/assets/services/hospitalization.png',
    description:
      'Treatment of your pet’s diagnosed medical condition can either be done at home or, in more serious cases, while confined in our hospital',
  },
  {
    name: 'After-hour emergency',
    src: '/assets/services/afrer hour emergency.png',
    description:
      'Our branch accepts after-hours emergency cases from 9:00AM to 8:00PM',
  },
  {
    name: 'Pet supplies',
    src: '/assets/services/pet-supplies.png',
    description:
      'We stock an extensive range of pet products, prescription and specialty diets. Our on-site pharmacy offers prescription and non-prescription medicines, preventives, nutritional supplements, oral and ear care, grooming items and prescription food.',
  },
]

const team: { name: string; position: string; img?: string }[] = [
  {
    name: 'Ma. Josefina R. De Guzman',
    position: 'General Manager/ Co Owner',
    img: '/assets/team/owner.png',
  },
  {
    name: 'Jaymie Rose M. Hayo, DVM',
    position: 'Practice owner/ lead veterinarian',
    img: '/assets/team/vet.png',
  },
  {
    name: 'Danica D. Matias, DVM',
    position: 'Associate Veterinarian',
    img: '/assets/team/vet2.png',
  },
  {
    name: 'Reymond Macawiwili',
    position: 'Senior Assistant',
    img: '/assets/team/assistant.png',
  },
  {
    name: 'Ricvie Mateo',
    position: 'Assistant',
    img: '/assets/team/assistant.png',
  },
  {
    name: 'Din Raguindin',
    position: 'Assistant',
    img: '/assets/team/assistant.png',
  },
]

export default function Home() {
  const { replace } = useRouter()

  return (
    <Main id="home">
      <Flex flexDirection={'column'} alignItems="center" sx={{ flex: 1 }}>
        <Carousel
          fadeDuration={150}
          carouselContent={['first', 'second', 'third'].map((data, i) => (
            <Image
              key={i}
              src={`/assets/carousel/${data}.jpg`}
              alt="ming"
              width={'100%'}
              height={[250, 450, 550]}
            />
          ))}
          backgroundColor={'rgba(1,1,1,0.6)'}
          contentProps={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Flex flexDirection={'column'} width="100%" flex={1} sx={{ gap: 10 }}>
            <Text
              textAlign={'center'}
              fontFamily="Castego"
              width={'100%'}
              sx={{ fontSize: [24, 45, 55], width: '100%' }}
            >
              Manila Feline Center
            </Text>
            <Button
              type="submit"
              backgroundcolor="rgba(188, 143, 143,0.8)"
              textcolor={theme.colors.black}
              hovercolor={'rgba(188, 143, 143,0.4)'}
              hovertextcolor={theme.colors.pink}
              activetextcolor={theme.colors.pink}
              variant="outlined"
              style={{
                borderColor: theme.colors.verylight,
                fontFamily: 'Castego',
                fontWeight: 600,
                borderRadius: 50,
                alignSelf: 'center',
              }}
              size={'large'}
              custom={{
                padding: 15,
                width: 250,
                '@media screen and (max-width: 640px)': {
                  fontSize: 12,
                  minWidth: 200,
                  padding: 10,
                  width: 'auto',
                },
              }}
              onClick={() => replace('/set-an-appointment/step1')}
            >
              BOOK AN APPOINTMENT
            </Button>
            <Button
              type="submit"
              backgroundcolor="rgba(188, 143, 143,0.8)"
              textcolor={theme.colors.black}
              hovercolor={'rgba(188, 143, 143,0.4)'}
              hovertextcolor={theme.colors.pink}
              activetextcolor={theme.colors.pink}
              variant="outlined"
              style={{
                borderColor: theme.colors.verylight,
                fontFamily: 'Castego',
                fontWeight: 600,
                borderRadius: 50,
                alignSelf: 'center',
              }}
              size={'large'}
              custom={{
                padding: 15,
                width: 250,
                '@media screen and (max-width: 640px)': {
                  fontSize: 12,
                  minWidth: 200,
                  padding: 10,
                  width: 'auto',
                },
              }}
              onClick={() => replace('/shop')}
            >
              Shop
            </Button>
          </Flex>
        </Carousel>
        <Section
          contentProps={{
            flexDirection: 'row',
            sx: { gap: 3 },
            flexWrap: 'wrap',
            justifyContent: 'center',
            pl: 50,
            pr: 50,
          }}
        >
          <ButtonModal
            style={{ fontSize: 18, padding: 12, width: 280 }}
            backgroundcolor={theme.colors.blackgray}
            textcolor={theme.colors.pink}
            hovercolor={'#7A7A7A'}
            hovertextcolor={theme.colors.pink}
            activetextcolor={theme.colors.pink}
            maxHeight={'80%'}
            activecolor={'#707070'}
            modalChild={
              <Flex flexDirection={'column'}>
                <Text as={'h1'} sx={{ fontSize: 24, color: 'black' }}>
                  Mission
                </Text>
                <Flex flexWrap={'wrap'} padding={20} overflow={'auto'}>
                  We provide quality medical, surgical, and dental care to every
                  feline or cat in need. We are dedicated to treating every cat
                  as if they were our own and exceeding our client’s
                  expectations.
                </Flex>
              </Flex>
            }
          >
            Mission
          </ButtonModal>
          <ButtonModal
            style={{ fontSize: 18, padding: 12, width: 280 }}
            backgroundcolor={theme.colors.pink}
            textcolor={'black'}
            hovercolor={theme.colors.lightpink}
            hovertextcolor={'black'}
            activetextcolor={'black'}
            activecolor={theme.colors.lightpink}
            maxHeight={'80%'}
            modalChild={
              <Flex flexDirection={'column'}>
                <Text as={'h1'} sx={{ fontSize: 24, color: 'black' }}>
                  Vision
                </Text>
                <Flex flexWrap={'wrap'} padding={20} overflow={'auto'}>
                  We envision creating a culture of lifelong healthier cats in
                  the community.
                </Flex>
              </Flex>
            }
          >
            Vision
          </ButtonModal>
          <ButtonModal
            style={{ fontSize: 18, padding: 12, width: 280 }}
            maxHeight={'80%'}
            modalChild={
              <Flex flexDirection={'column'}>
                <Text as={'h1'} sx={{ fontSize: 24, color: 'black' }}>
                  Services
                </Text>
                <Flex
                  flexWrap={'wrap'}
                  flexDirection={'column'}
                  padding={10}
                  overflow={'auto'}
                  justifyContent={'center'}
                  sx={{ gap: 10 }}
                >
                  {services.map((d, i) => (
                    <Flex key={i} flexDirection={'column'} sx={{ gap: 3 }}>
                      <ServiceIcon
                        key={d.name}
                        imageProps={{ image: { src: d.src } }}
                        flexProps={{
                          sx: {
                            gap: 24,
                            flexDirection: 'row',
                          },
                        }}
                        sx={{
                          width: '100%',
                          wordWrap: 'break-word',
                          textAlign: 'left',
                          whiteSpace: 'initial',
                          overflow: 'hidden',
                        }}
                      >
                        <Text
                          fontFamily={'Castego'}
                          color={'black'}
                          sx={{ fontSize: 24, fontWeight: 600 }}
                        >
                          {d.name}
                        </Text>
                        <Text
                          fontFamily={'Castego'}
                          color={'black'}
                          sx={{ fontSize: 14 }}
                        >
                          {d.description}
                        </Text>
                      </ServiceIcon>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            }
          >
            Services
          </ButtonModal>
          <ButtonModal
            style={{ fontSize: 18, padding: 12, width: 280 }}
            backgroundcolor={theme.colors.pink}
            textcolor={'black'}
            hovercolor={theme.colors.lightpink}
            hovertextcolor={'black'}
            activetextcolor={'black'}
            activecolor={theme.colors.lightpink}
            maxHeight={'80%'}
            modalChild={
              <Flex flexDirection={'column'}>
                <Text as={'h1'} sx={{ fontSize: 24, color: 'black' }}>
                  Commitment
                </Text>
                <Flex
                  flexWrap={'wrap'}
                  justifyContent={'center'}
                  padding={20}
                  overflow={'auto'}
                >
                  <Text
                    sx={{
                      fontSize: 16,
                      flex: 1,
                      whiteSpace: 'pre-wrap',
                      color: 'black',
                    }}
                  >
                    {`We share your love of cats and are committed to providing expert-level feline medicine, dental, and surgery without sacrificing accessibility and compassion. 
We adopt a progressive, holistic and comprehensive veterinary approach to patient ailments. 
We maintain the highest standards and place an emphasis on constantly improving our medical, surgical, and diagnostic capabilities, to improve all outcomes.
We are committed to honesty, transparency, and building up a relationship based on trust and respect. 
`}
                  </Text>
                </Flex>
              </Flex>
            }
          >
            Commitment
          </ButtonModal>
          <ButtonModal
            style={{ fontSize: 18, padding: 12, width: 280 }}
            maxHeight={'80%'}
            modalChild={
              <Flex flexDirection={'column'}>
                <Text as={'h1'} sx={{ fontSize: 24, color: 'black' }}>
                  Team
                </Text>
                <Flex
                  flexWrap={'wrap'}
                  padding={10}
                  overflow={'auto'}
                  justifyContent={'center'}
                >
                  {team.map((d, i) => (
                    <Flex key={i} flexDirection={'column'} sx={{ gap: 1 }}>
                      <ServiceIcon
                        key={d.name}
                        imageProps={{ image: { src: d.img } }}
                        flexProps={{
                          sx: {
                            gap: 24,
                          },
                        }}
                        sx={{
                          width: 250,
                          wordWrap: 'break-word',
                          textAlign: 'center',
                          whiteSpace: 'initial',
                          overflow: 'hidden',
                        }}
                      >
                        <Text
                          fontFamily={'Castego'}
                          color={'black'}
                          sx={{ fontSize: 24, fontWeight: 600 }}
                        >
                          {d.name}
                        </Text>
                        <Text
                          fontFamily={'Castego'}
                          color={'black'}
                          sx={{ fontSize: 14 }}
                        >
                          {d.position}
                        </Text>
                      </ServiceIcon>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            }
          >
            Team
          </ButtonModal>
          <ButtonModal
            style={{ fontSize: 18, padding: 12, width: 280 }}
            backgroundcolor={theme.colors.pink}
            textcolor={'black'}
            hovercolor={theme.colors.lightpink}
            hovertextcolor={'black'}
            activetextcolor={'black'}
            activecolor={theme.colors.lightpink}
            maxHeight={'80%'}
            modalChild={
              <Flex flexDirection={'column'}>
                <Text as={'h1'} sx={{ fontSize: 24, color: 'black' }}>
                  About Us
                </Text>
                <Flex flexWrap={'wrap'} padding={20} overflow={'auto'}>
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
                </Flex>
              </Flex>
            }
          >
            About Us
          </ButtonModal>
        </Section>
        {/* 
        <Section
          id="services"
          title="Our Services"
          backgroundColor={theme.mainColors.fourth}
          contentProps={{
            flexDirection: 'row',
            sx: { gap: 3 },
            flexWrap: 'wrap',
            justifyContent: 'center',
            pl: 50,
            pr: 50,
          }}
        >
          {services.map((d, i) => (
            <ServiceIcon
              key={i}
              imageProps={{ image: { src: d.src } }}
              flexProps={{
                sx: {
                  ':hover': {
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    animation: 'zoom-in-zoom-out 1s',
                    '@keyframes zoom-in-zoom-out': {
                      '0%': {
                        transform: 'scale(1, 1)',
                      },
                      '50%': {
                        transform: 'scale(1.2, 1.2)',
                      },
                      '100%': {
                        transform: 'scale(1, 1)',
                      },
                    },
                  },
                  width: 120,
                },
              }}
              sx={{
                wordWrap: 'break-word',
                textAlign: 'center',
                whiteSpace: 'initial',
                overflow: 'hidden',
                fontFamily: 'Castego',
              }}
            >
              {d.name}
            </ServiceIcon>
          ))}
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
          id="team"
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
          <SecondCarousel
            nextColorButton={theme.mainColors.first}
            contentProps={{ alignItems: 'center', justifyContent: 'center' }}
          >
            {team.map((d, i) => (
              <Flex key={i} flexDirection={'column'} sx={{ gap: 1 }}>
                <ServiceIcon
                  key={d.name}
                  imageProps={{ image: { src: d.img } }}
                  flexProps={{
                    sx: {
                      gap: 24,
                    },
                  }}
                  sx={{
                    wordWrap: 'break-word',
                    textAlign: 'center',
                    whiteSpace: 'initial',
                    overflow: 'hidden',
                  }}
                >
                  <Text
                    fontFamily={'Castego'}
                    color={'black'}
                    sx={{ fontSize: 24, fontWeight: 600 }}
                  >
                    {d.name}
                  </Text>
                  <Text
                    fontFamily={'Castego'}
                    color={'black'}
                    sx={{ fontSize: 14 }}
                  >
                    {d.position}
                  </Text>
                </ServiceIcon>
              </Flex>
            ))}
          </SecondCarousel>
        </Section>
        <Section
          id="team"
          title="Gallery"
          backgroundColor={theme.mainColors.fifth}
        >
          <Collage>
            {['1', '2', '3', '4', '5', '6'].map((d, i) => (
              <Image
                key={i}
                src={`/assets/gallery/${d}.jpg`}
                alt="ming"
                width={['100%', '80%', '40%']}
              />
            ))}
          </Collage>
        </Section>
        <Section
          id="aboutus"
          title="About Us"
          backgroundColor={theme.mainColors.third}
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
            src="/assets/meow.jpg"
            width="100%"
            height={'100%'}
            alt="background"
            sx={{ position: 'absolute', objectFit: 'cover' }}
          />
          <Flex
            alignSelf={'flex-end'}
            sx={{
              width: ['100%', '50%'],
              zIndex: 1,
              margin: 10,
            }}
            flexDirection="column"
            backgroundColor={theme.mainColors.sixth}
          >
            <Formik<CreateEmailDto>
              initialValues={{ from: '', message: '', subject: '', name: '' }}
              validationSchema={FormikValidation.createMail}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                sendMail(values).finally(() => {
                  setSubmitting(false)
                  resetForm()
                })
              }}
            >
              {({ isSubmitting }) => (
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
                  {isSubmitting && <Loading />}
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
                      name="from"
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
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Flex>
                </FormContainer>
              )}
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
        </Section> */}
      </Flex>
    </Main>
  )
}

import { theme } from '../../utils/theme'
import { Flex, Text as TextComp } from 'rebass'
import Drawer from '@mui/material/Drawer'
import React, { useCallback, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Button } from '../button'
import { useRouter } from 'next/router'

import { ServiceIcon } from '../icon'
import { FormInput } from '../input'
import { Loading } from '../loading'
import { FormContainer } from '../forms'
import { Formik } from 'formik'
import { CreateEmailDto, sendMail } from 'api'
import { FormikValidation } from 'helpers'
import { CustomModal, TextModal } from '../modal'

type Services = {
  name: string
  src: string
}
const navigations = ['Home']
const services: Services[] = [
  {
    name: 'Preventive Care',
    src: '/assets/services/Preventive Care.png',
  },
  {
    name: 'Wellness',
    src: '/assets/services/wellness.png',
  },
  {
    name: 'Consultation',
    src: '/assets/services/Consultation.png',
  },
  {
    name: 'Nutritional Counseling',
    src: '/assets/services/nutritional counseling.png',
  },
  {
    name: 'Laboratory',
    src: '/assets/services/laboratory.png',
  },
  {
    name: 'Surgery',
    src: '/assets/services/surgery.png',
  },
  {
    name: 'Telemedicine',
    src: '/assets/services/telemedicine.png',
  },
  {
    name: 'Dental Care',
    src: '/assets/services/dental care.png',
  },
  {
    name: 'Hospitalization',
    src: '/assets/services/hospitalization.png',
  },
  {
    name: 'After-hour emergency',
    src: '/assets/services/afrer hour emergency.png',
  },
  {
    name: 'Pet supplies',
    src: '/assets/services/pet-supplies.png',
  },
]

export const ContactUs = () => (
  <>
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
            height: '100%',
          }}
          label="Contact Us"
          labelProps={{
            width: '100%',
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
  </>
)

export const AllServices = () => (
  <Flex flexDirection={'column'} sx={{ gap: 2 }}>
    <TextComp as={'h2'}>Services</TextComp>
    <Flex
      flexDirection={'row'}
      flexWrap={'wrap'}
      sx={{ gap: 1 }}
      justifyContent={'center'}
      padding={20}
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
    </Flex>
  </Flex>
)

export const WebNavigation = ({ isLink }: { isLink?: boolean }) => {
  const { push } = useRouter()
  return (
    <>
      <TextModal
        width={'auto'}
        fontWeight={'bold'}
        style={{ cursor: 'pointer' }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        sx={{
          fontSize: [14, 16],
          fontFamily: 'Castego',

          padding: 0,
        }}
        color={theme.colors.pink}
        onClick={() => push('/#home')}
        isNotClickable={true}
      >
        {navigations[0]}
      </TextModal>
      <TextModal
        width={'auto'}
        style={{ cursor: 'pointer' }}
        fontWeight={'bold'}
        onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        sx={{
          fontSize: [14, 16],
          fontFamily: 'Castego',
          padding: 0,
        }}
        modalChild={<AllServices />}
        color={theme.colors.pink}
      >
        Services
      </TextModal>
      <TextModal
        width={'auto'}
        style={{ cursor: 'pointer' }}
        fontWeight={'bold'}
        onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        sx={{
          fontSize: [14, 16],
          fontFamily: 'Castego',
          padding: 0,
        }}
        color={theme.colors.pink}
        modalChild={<ContactUs />}
      >
        Contact Us
      </TextModal>
    </>
  )
}

export const MobileNavigation = ({ isLink }: { isLink?: boolean }) => {
  const { push } = useRouter()
  const [state, setState] = useState({
    right: false,
  })
  const [link, setLink] = useState<string | null>(null)
  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState({ right: open })
    },
    [setState]
  )

  const list = (setOpen: (v: boolean) => void) => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      role="presentation"
    >
      <List>
        {['Home', 'Services', 'Contact Us'].map((data: string, i) => (
          <ListItem key={i} disablePadding={true}>
            <ListItemButton
              onClick={() => {
                setLink(data)
                if (data === 'Services' || data === 'Contact Us') setOpen(true)
                else push('/#' + data?.split(' ').join('').toLowerCase())
              }}
            >
              <ListItemText primary={data} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
  return (
    <>
      <Button onClick={toggleDrawer(true)} sx={{ minWidth: 34 }}>
        <FiMenu size={30} />
      </Button>
      <CustomModal
        modalChild={
          link === 'Services' ? (
            <AllServices />
          ) : link === 'Contact Us' ? (
            <ContactUs />
          ) : undefined
        }
      >
        {({ setOpen }) => (
          <Drawer
            open={state.right}
            anchor={'right'}
            onClose={toggleDrawer(false)}
          >
            {list(setOpen)}
          </Drawer>
        )}
      </CustomModal>
    </>
  )
}

import React, { useCallback, useState, Fragment, useEffect } from 'react'
import { Flex, Text } from 'rebass'
import Drawer from '@mui/material/Drawer'
import { scroller } from 'react-scroll'

import { theme } from '../../utils/theme'
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

import { FormInput } from '../input'
import { Loading } from '../loading'
import { FormContainer } from '../forms'
import { Formik } from 'formik'
import { CreateEmailDto, sendMail } from 'api'
import { FormikValidation } from 'helpers'
import { CustomModal, TextModal } from '../modal'

import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import { useUser } from 'hooks'

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
                borderBottomColor: theme.mainColors.first,
              }}
              sx={{ color: 'black', width: '100%' }}
              style={{ background: 'white' }}
              placeholder="Please type your password"
            />
            <FormInput
              name="from"
              label={'Email'}
              variant="filled"
              inputcolor={{
                labelColor: 'gray',
                borderBottomColor: theme.mainColors.first,
              }}
              sx={{ color: 'black', width: '100%' }}
              style={{ background: 'white' }}
              placeholder="Please type your password"
            />
          </Flex>
          <FormInput
            name="subject"
            label={'Subject'}
            variant="filled"
            inputcolor={{
              labelColor: 'gray',
              borderBottomColor: theme.mainColors.first,
            }}
            sx={{ color: 'black', width: '100%' }}
            style={{ background: 'white' }}
            placeholder="Please type your password"
          />
          <FormInput
            name="message"
            label={'Message'}
            variant="filled"
            multiline={true}
            inputcolor={{
              labelColor: 'gray',
              borderBottomColor: theme.mainColors.first,
            }}
            sx={{ color: 'black', width: '100%' }}
            style={{ background: 'white' }}
            minRows={12}
            maxRows={12}
            placeholder="Please type your password"
          />
          <Flex width={'100%'} justifyContent={'end'}>
            <Button
              type="submit"
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
  <Select
    displayEmpty
    input={
      <OutlinedInput
        sx={{
          border: 0,
          paddingRight: 0,
          ':focus': {
            outline: 'none !important',
          },
        }}
      />
    }
    renderValue={(selected) => {
      if (selected !== null) {
        return 'Services'
      }

      return selected
    }}
    sx={{
      ':focus': {
        outline: 'none !important',
      },
      div: {
        padding: 0,
        width: 'auto',
        marginRight: '-32px',
        borderColor: 'transparent',
      },
      'div:focus': {
        outline: 'none !important',
      },
      fieldset: {
        border: 0,
        borderColor: 'transparent',
        display: 'none',
      },
      'input:focus': {
        outline: 'none !important',
      },
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      svg: {
        display: 'none',
      },
      fontSize: [14, 16],
      letterSpacing: '0.01071em',
      color: theme.colors.pink,
      ':hover': {
        opacity: 0.7,
      },
      fontWeight: 'bold',
    }}
  >
    {services.map((s) => (
      <MenuItem key={s.name} value={s.name}>
        {s.name}
      </MenuItem>
    ))}
  </Select>
)

export const WebNavigation = ({ isLink }: { isLink?: boolean }) => {
  const { push } = useRouter()
  const { logout } = useUser()
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
      <AllServices />
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
          zIndex: 99,
        }}
        color={theme.colors.pink}
        onClick={() => {
          scroller.scrollTo('footer', {
            spy: true,
            smooth: true,
            offset: 50,
            duration: 500,
          })
        }}
      >
        Contact Us
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
          zIndex: 99,
        }}
        color={theme.colors.pink}
        onClick={() => {
          logout()
        }}
      >
        Logout
      </TextModal>
    </>
  )
}

export const MobileNavigation = ({ isLink }: { isLink?: boolean }) => {
  const { push } = useRouter()
  const { logout } = useUser()
  const [state, setState] = useState({
    right: false,
  })
  const [link, setLink] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
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

  const list = () => (
    <Box
      sx={{ width: 250 }}
      onKeyDown={toggleDrawer(false)}
      role="presentation"
    >
      <List>
        {['Home', 'Services', 'Contact Us', 'Logout'].map((data: string, i) => (
          <Fragment key={i}>
            <ListItem disablePadding={true}>
              <ListItemButton
                onClick={() => {
                  setLink(data)
                  switch (data) {
                    case 'Services':
                      setOpen((v) => !v)
                      break
                    case 'Contact Us':
                      scroller.scrollTo('footer', {
                        spy: true,
                        smooth: true,
                        offset: 50,
                        duration: 500,
                      })
                      break
                    case 'Logout':
                      logout()
                      break
                    default:
                      push('/#' + data?.split(' ').join('').toLowerCase())
                      break
                  }
                }}
              >
                <ListItemText
                  primary={data}
                  secondary={
                    link === 'Services' &&
                    data === 'Services' &&
                    open &&
                    services.map((d, i) => (
                      <Text
                        key={d.name}
                        sx={{
                          width: '100%',
                          pl: 2,
                          pt: i === 0 ? 2 : 0,
                          fontSize: 16,
                          color: 'gray',
                        }}
                      >
                        {d.name}
                      </Text>
                    ))
                  }
                />
              </ListItemButton>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Box>
  )

  useEffect(() => {
    if (link !== 'Services') {
      setState({ right: false })
      setOpen(false)
    }
  }, [link, setState, setOpen])

  return (
    <>
      <Button onClick={toggleDrawer(true)} sx={{ minWidth: 34 }}>
        <FiMenu size={30} color={theme.colors.pink} />
      </Button>

      <Drawer open={state.right} anchor={'right'} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  )
}

import React, { useCallback, useState, Fragment, useEffect } from 'react'
import { Flex, Text, Link as Anchor } from 'rebass'
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

import { TextModal } from '../modal'

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
  <Flex flexDirection={'column'}>
    <Text as={'h1'} sx={{ fontSize: 24, color: 'black' }}>
      Contact Us
    </Text>
    <Flex
      flexDirection={'column'}
      pt={20}
      pb={20}
      justifyContent={'center'}
      sx={{ gap: 1, wordWrap: 'break-word' }}
    >
      <Text>0238 SANLY BLDG P TUAZON BLVD SOCORRO, CUBAO QC</Text>
      <Text>09123456789</Text>
      <Text>manila.feline.center@gmail.com</Text>
      <Text as={'h2'} sx={{ fontSize: 18, color: 'black', mt: 3 }}>
        Links
      </Text>
      <Text
        sx={{
          textDecoration: 'underline',
        }}
      >
        <Anchor
          href="https://facebook.com/ManilaFelineCenter"
          sx={{ wordWrap: 'break-word' }}
        >
          https://facebook.com/ManilaFelineCenter
        </Anchor>
      </Text>
      <Text
        sx={{
          textDecoration: 'underline',
        }}
      >
        <Anchor
          href="https://instragram.com/ManilaFelineCenter"
          sx={{ wordWrap: 'break-word' }}
        >
          https://instragram.com/ManilaFelineCenter
        </Anchor>
      </Text>
      <Text as={'h2'} sx={{ fontSize: 18, color: 'black', mt: 3 }}>
        Opening hours
      </Text>
      <Text>9:00 AM to 8:00PM</Text>
    </Flex>
  </Flex>
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
        modalChild={<ContactUs />}
        color={theme.colors.pink}
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
        {['Home', 'Contact Us', 'Logout'].map((data: string, i) => (
          <Fragment key={i}>
            <ListItem disablePadding={true}>
              <ListItemButton
                onClick={() => {
                  setLink(data)
                  switch (data) {
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
                  primary={
                    data === 'Contact Us' ? (
                      <TextModal width={'auto'} modalChild={<ContactUs />}>
                        Contact Us
                      </TextModal>
                    ) : (
                      data
                    )
                  }
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

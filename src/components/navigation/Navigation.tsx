import { Link, scroller } from 'react-scroll'
import NextLink from 'next/link'
import { TextProps } from 'rebass'
import { theme } from '../../utils/theme'
import { Text } from '../text'
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

const LinkRef = ({
  href,
  children,
  isLink,
  ...others
}: { href: string; isLink?: boolean } & TextProps) => {
  return !isLink ? (
    <Link
      to={href}
      spy={true}
      smooth={true}
      offset={0}
      duration={500}
      style={{ cursor: 'pointer' }}
    >
      <Text
        width={'auto'}
        fontWeight={'bold'}
        sx={{
          fontSize: [14, 16],
          fontFamily: 'Castego',
          ':hover': {
            opacity: 0.7,
          },
          '&&:active': {
            opacity: 1,
          },
        }}
        {...others}
      >
        {children}
      </Text>
    </Link>
  ) : (
    <NextLink href={'/#' + href} style={{ cursor: 'pointer' }}>
      <Text
        width={'auto'}
        fontWeight={'bold'}
        sx={{
          fontSize: [14, 16],
          fontFamily: 'Castego',
          ':hover': {
            opacity: 0.7,
          },
          '&&:active': {
            opacity: 1,
          },
        }}
        {...others}
      >
        {children}
      </Text>
    </NextLink>
  )
}

const navigations = ['Home', 'Services', 'Team', 'About Us', 'Contact Us']

export const WebNavigation = ({ isLink }: { isLink?: boolean }) => {
  return (
    <>
      {navigations.map((data) => (
        <LinkRef
          key={data}
          href={data?.split(' ').join('').toLowerCase()}
          color={theme.backgroundColors.darkbrown}
          isLink={isLink}
        >
          {data}
        </LinkRef>
      ))}
    </>
  )
}

export const MobileNavigation = ({ isLink }: { isLink?: boolean }) => {
  const { replace } = useRouter()
  const [state, setState] = useState({
    right: false,
  })
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
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      role="presentation"
    >
      <List>
        {navigations.map((data: string, i) => (
          <ListItem key={i} disablePadding={true}>
            <ListItemButton
              onClick={() =>
                !isLink
                  ? scroller.scrollTo(data?.split(' ').join('').toLowerCase(), {
                      spy: true,
                      smooth: true,
                      offset: 50,
                      duration: 500,
                    })
                  : replace('/#' + data?.split(' ').join('').toLowerCase())
              }
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
      <Drawer open={state.right} anchor={'right'} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  )
}

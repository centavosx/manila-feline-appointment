import { Flex, Image, Link as Anchor, FlexProps } from 'rebass'
import { MobileNavigation, WebNavigation } from '../navigation'

import { theme } from '../../utils/theme'

import { Header } from '../header'
import { Text } from '../text'
import { MobileView, WebView } from '../views'
import { BaseHead } from '../basehead'
import { useRouter } from 'next/router'

export const Main = ({
  pageTitle,
  children,
  isLink,
}: { pageTitle?: string; isLink?: boolean } & FlexProps) => {
  const { pathname } = useRouter()
  return (
    <>
      <BaseHead
        title="Manila Feline Center"
        pageTitle={pageTitle}
        description="Set your appointment now"
      />
      <Flex
        width={'100%'}
        sx={{ position: pathname === '/' ? 'unset' : 'fixed', height: '100%' }}
        justifyContent="center"
        backgroundColor={theme.colors.verylight}
      >
        <Flex
          flexDirection={'column'}
          sx={{
            flex: 1,
            position: pathname === '/' ? 'unset' : 'fixed',
            height: '100%',
            overflow: 'auto',
            width: '100%',
          }}
          maxWidth={2250}
          alignSelf="center"
          backgroundColor={theme.colors.verylight}
        >
          <Header justifyContent={'start'} sx={{ gap: 2, padding: 20 }}>
            <Flex flex={1} sx={{ justifyContent: 'start' }}>
              <Anchor href="/" sx={{ mr: [null, 4] }}>
                <Flex alignItems={'center'} sx={{ gap: 2 }}>
                  <Image
                    src={'/assets/logo.png'}
                    width={60}
                    height={60}
                    minWidth={'auto'}
                    alt="image"
                  />
                  <Text
                    sx={{
                      fontSize: [14, 18],
                      fontWeight: 600,
                      fontFamily: 'Castego',
                      color: theme.backgroundColors.darkbrown,
                    }}
                  >
                    Manila Feline Center
                  </Text>
                </Flex>
              </Anchor>
            </Flex>
            <WebView>
              <Flex sx={{ gap: 16, padding: 15 }}>
                <WebNavigation isLink={isLink} />
              </Flex>
            </WebView>
            <MobileView>
              <MobileNavigation isLink={isLink} />
            </MobileView>
          </Header>
          {children}
          <Header backgroundColor={theme.colors.verylight} padding={15}>
            <Text
              sx={{
                textAlign: ['center', 'start'],
                color: theme.mainColors.first,
                fontWeight: 'bold',
              }}
            >
              0238 SANLY BLDG P TUAZON BLVD SOCORRO, CUBAO QC
            </Text>
            <Text
              sx={{
                textAlign: ['center'],
                color: theme.mainColors.first,
                fontWeight: 'bold',
              }}
            >
              Copyright © 2022 Project
            </Text>
            <Text
              textAlign={'end'}
              sx={{
                color: theme.mainColors.first,
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              <Anchor href="https://facebook.com/ManilaFelineCenter">
                https://facebook.com/ManilaFelineCenter
              </Anchor>
            </Text>
          </Header>
        </Flex>
      </Flex>
    </>
  )
}

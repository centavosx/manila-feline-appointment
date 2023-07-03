import { Flex, Image, Link as Anchor, FlexProps } from 'rebass'
import Wave from 'react-wavify'
import Navigation from '../navigation'

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
  isShop,
}: { pageTitle?: string; isLink?: boolean; isShop?: boolean } & FlexProps) => {
  return (
    <>
      <BaseHead
        title="Manila Feline Center"
        pageTitle={pageTitle}
        description="Set your appointment now"
      />
      <Flex
        width={'100%'}
        sx={{ height: '100%', flexDirection: 'column' }}
        justifyContent="center"
        backgroundColor={theme.colors.white}
      >
        <Flex
          sx={{
            height: 'auto',
            width: '100%',
            flexDirection: 'column',
            backgroundColor: theme.colors.white,
          }}
        >
          <Header
            justifyContent={'start'}
            sx={{
              gap: 2,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: '8px',
              paddingBottom: '8px',
              width: '100%',
              zIndex: 99,
            }}
            maxWidth={2250}
            alignSelf="center"
          >
            <Flex flex={1} sx={{ justifyContent: 'start' }}>
              <Anchor href="/" sx={{ mr: [null, 4] }}>
                <Flex alignItems={'center'} sx={{ gap: 2 }}>
                  <Flex
                    sx={{
                      borderRadius: '100%',
                      height: 60,
                      width: 60,
                      backgroundColor: theme.colors.pink,
                      padding: 0,
                    }}
                  >
                    <Image
                      src={'/assets/logo.png'}
                      width={'101%'}
                      height={'101%'}
                      minWidth={'auto'}
                      alt="image"
                    />
                  </Flex>
                  <Text
                    sx={{
                      fontSize: [14, 18],
                      fontWeight: 600,
                      fontFamily: 'Castego',
                      color: theme.colors.black,
                    }}
                  >
                    Manila Feline Center
                  </Text>
                </Flex>
              </Anchor>
            </Flex>
            <WebView>
              <Flex sx={{ gap: 16, padding: 15 }}>
                <Navigation.WebNavigation isLink={isLink} />
              </Flex>
            </WebView>
            <MobileView>
              <Navigation.MobileNavigation isLink={isLink} />
            </MobileView>
          </Header>
        </Flex>
        <Flex
          sx={{
            gap: 2,
            backgroundColor: isShop ? theme.colors.white : theme.colors.pink,
            height: '100%',
            overflow: 'auto',
            width: '100%',
            flexDirection: 'column',
          }}
          alignSelf="center"
        >
          <Flex flex={1} maxWidth={2250} alignSelf="center">
            <Flex flexDirection={'column'} sx={{ height: '100%' }}>
              {children}
            </Flex>
          </Flex>
          <WebView
            style={{
              position: 'relative',
              bottom: -20,
            }}
          >
            <Wave
              fill={theme.colors.blackgray}
              paused={false}
              options={{
                height: 90,
                amplitude: 50,
                speed: 0.5,
                points: 8,
              }}
              style={{ height: 210 }}
            />
          </WebView>
          <MobileView
            style={{
              position: 'relative',
              bottom: -10,
            }}
          >
            <Wave
              fill={theme.colors.blackgray}
              paused={false}
              options={{
                height: 45,
                amplitude: 35,
                speed: 0.5,
                points: 3,
              }}
              style={{ height: 120 }}
            />
          </MobileView>
          <Header
            id={'footer'}
            backgroundColor={theme.colors.blackgray}
            sx={{
              gap: 2,
              padding: 20,
              width: '100%',
              position: 'relative',
            }}
            alignSelf="center"
          >
            <Flex
              flex={1}
              flexDirection={'column'}
              sx={{
                gap: 1,
                textAlign: 'center',
              }}
              maxWidth={2250}
            >
              <Text
                sx={{
                  color: theme.colors.pink,
                  fontWeight: 'bold',
                }}
              >
                Manila Feline Center
              </Text>
              <Text
                sx={{
                  color: theme.colors.white,
                  fontWeight: 'bold',
                }}
              >
                Creating a community of life long healthier cats in the
                Philippines
              </Text>
            </Flex>
          </Header>
        </Flex>
      </Flex>
    </>
  )
}

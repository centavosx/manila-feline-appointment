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
}: { pageTitle?: string; isLink?: boolean } & FlexProps) => {
  return (
    <>
      <BaseHead
        title="Manila Feline Center"
        pageTitle={pageTitle}
        description="Set your appointment now"
      />
      <Flex
        width={'100%'}
        sx={{ position: 'unset', height: '100%' }}
        justifyContent="center"
        backgroundColor={theme.colors.pink}
      >
        <Flex
          flexDirection={'column'}
          sx={{
            flex: 1,
            position: 'unset',
            height: '100%',
            overflow: 'auto',
            width: '100%',
          }}
          maxWidth={2250}
          alignSelf="center"
          backgroundColor={theme.colors.pink}
        >
          <Header
            justifyContent={'start'}
            sx={{
              gap: 2,
              padding: 20,
              position: 'relative',
              backgroundColor: theme.colors.black,
            }}
          >
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
                      color: theme.colors.pink,
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
          {children}
          <WebView
            style={{
              position: 'relative',
              bottom: -10,
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
            padding={20}
            flexDirection={['column', 'row']}
            sx={{ alignItems: ['center', 'start'], gap: [3, 1] }}
          >
            <Flex
              flex={1}
              flexDirection={'column'}
              sx={{
                gap: 1,
                textAlign: 'center',
              }}
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

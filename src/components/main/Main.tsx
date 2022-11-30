import { Flex, Image, Link as Anchor, FlexProps } from 'rebass'
import { MobileNavigation, WebNavigation } from '../navigation'

import { theme } from '../../utils/theme'
import { Button } from '../button'
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
  const { replace } = useRouter()
  return (
    <>
      <BaseHead
        title="Appointment"
        pageTitle={pageTitle}
        description="Set your appointment now"
      />

      <Flex
        flexDirection={'column'}
        sx={{ flex: 1 }}
        backgroundColor={theme.backgroundColors.darkbrown}
      >
        <Header justifyContent={'start'} sx={{ gap: 2, padding: 15 }}>
          <Flex flex={1} sx={{ justifyContent: 'start' }}>
            <Anchor href="/" sx={{ mr: [null, 4] }}>
              <Flex alignItems={'center'} sx={{ gap: 2 }}>
                <Image
                  src={'/assets/logo.png'}
                  width={50}
                  height={50}
                  alt="image"
                />
                <Text
                  sx={{
                    fontSize: [11, 12],
                    fontWeight: 'bold',
                    color: theme.colors.verylight,
                  }}
                >
                  Manila Feline Center
                </Text>
              </Flex>
            </Anchor>
          </Flex>
          <WebView>
            <Flex sx={{ gap: 24, padding: 15 }}>
              <WebNavigation isLink={isLink} />
            </Flex>
          </WebView>
          <MobileView>
            <MobileNavigation isLink={isLink} />
          </MobileView>
        </Header>
        {children}
        <Header backgroundColor={theme.mainColors.first} padding={15}>
          <Text sx={{ textAlign: ['center', 'start'] }}>
            0238 SANLY BLDG P TUAZON BLVD SOCORRO, CUBAO QC
          </Text>
          <Text sx={{ textAlign: ['center'] }}>
            <Anchor href="https://facebook.com/ManilaFelineCenter">
              https://facebook.com/ManilaFelineCenter
            </Anchor>
          </Text>
          <Text textAlign={'center'}>0919 824 2456</Text>
          <Button
            sx={{ width: ['50%', 'auto'] }}
            onClick={() => replace('/#contactus')}
          >
            Contact Us
          </Button>
        </Header>
      </Flex>
    </>
  )
}

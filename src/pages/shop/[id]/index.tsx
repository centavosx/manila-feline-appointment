import React from 'react'
import { Main } from 'components/main'
import {
  AiFillStar,
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from 'react-icons/ai'
import { Flex, Image, Text } from 'rebass'
import { SearchableInput } from 'components/input'
import styled from '@emotion/styled'
import { Section } from 'components/sections'
import { theme } from 'utils/theme'
import { ShopButtonPrimary, ShopButtonSecondary } from 'components/button'

const ShadowedImage = styled(Image)`
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.25);
`

const ShadowedFlex = styled(Flex)`
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.25);
`

export default function ProductInfo() {
  return (
    <Main isLink={true}>
      <Flex p={36} width={'100%'} flexDirection={'column'}>
        <Flex
          flexDirection={['column', 'column', 'row']}
          sx={{ padding: 36, pt: 24, pb: 56, gap: 4, width: '100%' }}
        >
          <Flex
            flexDirection={'column'}
            width={300}
            sx={{ gap: 3, justifyContent: 'center', alignSelf: 'center' }}
          >
            <ShadowedImage size={250} width={'100%'} />
            <Flex sx={{ gap: 2 }}>
              <ShadowedImage height={120} flex={1} />
              <ShadowedImage height={120} flex={1} />
            </Flex>
          </Flex>
          <Flex flex={1} flexDirection={'column'} sx={{ gap: 3 }}>
            <Flex>
              <ShadowedFlex
                p={2}
                sx={{
                  border: '1px solid black',
                  backgroundColor: theme.colors.pink,
                }}
              >
                <Text>All Life Stages</Text>
              </ShadowedFlex>
            </Flex>
            <Text as={'h2'} alignItems={'left'}>
              Kit Cat Soya Clump Baby Powder 7L Cat Litter
            </Text>
            <Flex flexDirection={'row'} alignItems={'center'}>
              <Text as={'h3'} flex={1}>
                Php460.00
              </Text>
              <Text as={'h4'}>Rating</Text>
              <AiFillStar
                size={16}
                style={{ marginLeft: '4px', marginRight: '4px' }}
              />
              <Text>(5.0)</Text>
            </Flex>
            <Text as={'h4'}>Stock: 1150</Text>
            <Text>
              Descriptiondawdwadawdawd Descriptiondawdwadawdawddawdawdawd
              Descriptiondawdwadawdawddaw dawd
            </Text>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              sx={{ gap: 2, mt: 2 }}
            >
              <Text as={'h3'}>Quantity</Text>
              <ShadowedFlex
                sx={{
                  borderRadius: 150,
                  overflow: 'hidden',
                  border: '0.5px solid black',
                  textAlign: 'center',
                }}
                justifyContent={'center'}
              >
                <ShopButtonPrimary
                  style={{
                    width: 50,
                    height: '100%',
                    padding: 2,
                    minWidth: 0,
                    borderRadius: 0,
                    borderTopLeftRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderWidth: 0,
                  }}
                  isTransition={false}
                >
                  +
                </ShopButtonPrimary>
                <Text
                  width={80}
                  justifyContent={'center'}
                  alignItems={'center'}
                  textAlign={'center'}
                  height={'100%'}
                  alignSelf={'center'}
                  display={'flex'}
                >
                  22
                </Text>
                <ShopButtonPrimary
                  style={{
                    width: 50,

                    padding: 2,
                    minWidth: 0,
                    borderRadius: 0,
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                    borderWidth: 0,
                  }}
                  isTransition={false}
                >
                  -
                </ShopButtonPrimary>
              </ShadowedFlex>
            </Flex>
            <Flex flexDirection={'row'} sx={{ gap: 2, mt: 4 }}>
              <ShopButtonSecondary>
                <AiOutlineShoppingCart size={18} style={{ marginRight: 6 }} />{' '}
                Add to Cart
              </ShopButtonSecondary>
              <ShopButtonPrimary>
                <AiOutlineShopping size={18} style={{ marginRight: 6 }} />
                Buy Now
              </ShopButtonPrimary>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          sx={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            p: 36,
          }}
        >
          <Text as={'h2'}>More Information</Text>
        </Flex>
      </Flex>
    </Main>
  )
}

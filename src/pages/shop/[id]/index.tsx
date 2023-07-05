import React, { useState, useEffect, useRef } from 'react'
import { Main } from 'components/main'
import {
  AiFillStar,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai'
import { Flex, Image, Text } from 'rebass'
import { FormInput, Input, SearchableInput } from 'components/input'
import styled from '@emotion/styled'
import { Section } from 'components/sections'
import { theme } from 'utils/theme'
import { ShopButtonPrimary, ShopButtonSecondary } from 'components/button'
import { Formik } from 'formik'
import { FormContainer } from 'components/forms'
import { format } from 'date-fns'
import { ShopItem, ShopItemContainer } from 'components/shop'

const ShadowedImage = styled(Image)`
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.25);
`

const ShadowedFlex = styled(Flex)`
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.25);
`

const DisplayStar = ({ selected }: { selected: number }) => {
  return (
    <Flex sx={{ gap: 1 }}>
      {Array(5)
        .fill(null)
        .map((_, index) =>
          index < selected ? (
            <AiFillStar key={index} color={theme.colors.darkpink} size={18} />
          ) : (
            <AiOutlineStar key={index} size={18} />
          )
        )}
    </Flex>
  )
}

const SelectStar = ({
  onClick,
  selected,
}: {
  onClick?: (star: number) => void
  selected: number
}) => {
  const [num, setNum] = useState(selected)

  return (
    <Flex sx={{ gap: 1 }} onMouseLeave={() => setNum(0)}>
      {Array(5)
        .fill(null)
        .map((_, index) =>
          index < num || index < selected ? (
            <AiFillStar
              key={index}
              color={theme.colors.darkpink}
              size={38}
              onMouseOver={() => setNum(index + 1)}
              onClick={() => onClick?.(index + 1 === selected ? 0 : index + 1)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <AiOutlineStar
              key={index}
              size={38}
              onMouseOver={() => setNum(index + 1)}
              style={{ cursor: 'pointer' }}
            />
          )
        )}
    </Flex>
  )
}

const ShowMoreContainer = () => {
  const [isShow, setIsShow] = useState(false)

  return (
    <Flex
      sx={{
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        position: 'relative',
        transition: 'max-height 0.3s ease-in-out',
      }}
      flexDirection={'column'}
      height={'100%'}
      maxHeight={isShow ? '100%' : 300}
      paddingBottom={isShow ? 30 : 0}
    >
      <Flex
        sx={{
          p: 36,
          gap: 3,
        }}
        flexDirection={'column'}
        overflow={'hidden'}
      >
        <Text as={'h2'}>More Information</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor
          purus non enim praesent elementum facilisis leo. Purus sit amet
          volutpat consequat. Habitasse platea dictumst quisque sagittis purus.
          Amet massa vitae tortor condimentum lacinia quis vel eros. Tempus
          imperdiet nulla malesuada pellentesque elit eget gravida cum sociis.
          Donec ultrices tincidunt arcu non sodales neque sodales. Tellus at
          urna condimentum mattis pellentesque id. Arcu cursus vitae congue
          mauris rhoncus aenean vel elit. Odio ut sem nulla pharetra diam. Vel
          quam elementum pulvinar etiam. Morbi blandit cursus risus at ultrices
          mi tempus imperdiet nulla. Tellus id interdum velit laoreet id donec
          ultrices. Enim eu turpis egestas pretium aenean. Convallis tellus id
          interdum velit laoreet. Id aliquet lectus proin nibh nisl. Varius sit
          amet mattis vulputate enim. Sit amet purus gravida quis blandit turpis
          cursus. Scelerisque fermentum dui faucibus in. Quis eleifend quam
          adipiscing vitae. Mi bibendum neque egestas congue quisque egestas
          diam in. Sed viverra ipsum nunc aliquet bibendum enim facilisis
          gravida. Nulla at volutpat diam ut venenatis tellus in. Nulla
          porttitor massa id neque. Potenti nullam ac tortor vitae purus
          faucibus ornare suspendisse sed. Cursus vitae congue mauris rhoncus
          aenean vel. Etiam non quam lacus suspendisse faucibus interdum. Nisl
          vel pretium lectus quam id leo in vitae turpis. Rhoncus mattis rhoncus
          urna neque. Malesuada proin libero nunc consequat interdum varius sit
          amet mattis. Diam quam nulla porttitor massa id neque aliquam
          vestibulum. Eu turpis egestas pretium aenean pharetra magna ac
          placerat. Vivamus arcu felis bibendum ut tristique et egestas quis.
          Nulla facilisi morbi tempus iaculis urna id volutpat lacus.
          Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nunc
          pulvinar sapien et ligula ullamcorper malesuada proin libero nunc.
          Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Quis
          commodo odio aenean sed adipiscing diam donec. Et pharetra pharetra
          massa massa ultricies mi quis. Imperdiet dui accumsan sit amet nulla
          facilisi morbi tempus. Nulla facilisi etiam dignissim diam quis. Dui
          nunc mattis enim ut. Sed id semper risus in. Odio eu feugiat pretium
          nibh ipsum consequat nisl. Nunc faucibus a pellentesque sit amet
          porttitor eget. Tortor id aliquet lectus proin. Nulla at volutpat diam
          ut. Massa tincidunt dui ut ornare lectus sit amet. Duis ultricies
          lacus sed turpis tincidunt id aliquet risus. Urna duis convallis
          convallis tellus id interdum velit. Dolor morbi non arcu risus quis
          varius quam. Euismod nisi porta lorem mollis aliquam ut porttitor leo.
          Urna cursus eget nunc scelerisque viverra mauris in aliquam sem.
          Lobortis mattis aliquam faucibus purus in massa tempor. Dignissim
          sodales ut eu sem integer vitae justo eget magna. Fermentum odio eu
          feugiat pretium nibh ipsum consequat nisl. Molestie a iaculis at erat
          pellentesque adipiscing commodo. Justo donec enim diam vulputate ut
          pharetra sit. At erat pellentesque adipiscing commodo elit at
          imperdiet dui. Tellus orci ac auctor augue mauris augue neque. Blandit
          aliquam etiam erat velit scelerisque in dictum non. Sed nisi lacus sed
          viverra. Rhoncus dolor purus non enim praesent elementum facilisis leo
          vel. Elit at imperdiet dui accumsan sit amet nulla facilisi. Turpis in
          eu mi bibendum neque. Massa tincidunt nunc pulvinar sapien et ligula
          ullamcorper malesuada. Ac turpis egestas maecenas pharetra convallis
          posuere morbi. Sit amet commodo nulla facilisi nullam vehicula. Magna
          fermentum iaculis eu non diam. Congue nisi vitae suscipit tellus
          mauris a diam. Ornare suspendisse sed nisi lacus sed viverra. Ipsum
          dolor sit amet consectetur adipiscing. Enim eu turpis egestas pretium.
          Ultrices sagittis orci a scelerisque. Egestas quis ipsum suspendisse
          ultrices gravida dictum fusce ut placerat. Arcu dictum varius duis at
          consectetur. Convallis a cras semper auctor neque vitae. Morbi
          tristique senectus et netus et malesuada fames. Ipsum faucibus vitae
          aliquet nec. Hac habitasse platea dictumst quisque sagittis purus. Sem
          et tortor consequat id. Varius vel pharetra vel turpis nunc eget lorem
          dolor. Et odio pellentesque diam volutpat. Sagittis purus sit amet
          volutpat consequat mauris. Eu feugiat pretium nibh ipsum consequat.
          Pharetra massa massa ultricies mi quis hendrerit dolor magna eget.
          Augue interdum velit euismod in pellentesque massa placerat duis.
          Lacus viverra vitae congue eu. Nisl condimentum id venenatis a
          condimentum vitae sapien pellentesque. Enim praesent elementum
          facilisis leo vel fringilla. Arcu felis bibendum ut tristique et
          egestas quis ipsum. Volutpat ac tincidunt vitae semper quis lectus. Ac
          turpis egestas integer eget aliquet nibh praesent. Dolor purus non
          enim praesent elementum facilisis leo vel. Volutpat maecenas volutpat
          blandit aliquam etiam erat velit scelerisque in. Et tortor at risus
          viverra adipiscing at in tellus. Eu scelerisque felis imperdiet proin
          fermentum leo vel orci. Id venenatis a condimentum vitae sapien
          pellentesque habitant morbi. Pellentesque nec nam aliquam sem et
          tortor consequat id porta. Enim facilisis gravida neque convallis a
          cras. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim
          cras. Tristique et egestas quis ipsum. Elit pellentesque habitant
          morbi tristique. Arcu cursus euismod quis viverra nibh cras. Ut
          aliquam purus sit amet luctus. Facilisis magna etiam tempor orci eu
          lobortis elementum nibh. Netus et malesuada fames ac turpis. Semper
          quis lectus nulla at. Orci porta non pulvinar neque laoreet
          suspendisse interdum. Ut etiam sit amet nisl purus. Eget duis at
          tellus at urna condimentum mattis pellentesque. Tempus egestas sed sed
          risus pretium quam vulputate. Adipiscing commodo elit at imperdiet dui
          accumsan sit amet. Tempus egestas sed sed risus pretium. Cursus in hac
          habitasse platea dictumst. Elementum integer enim neque volutpat. Id
          leo in vitae turpis. Tellus rutrum tellus pellentesque eu tincidunt
          tortor aliquam nulla facilisi. Amet mattis vulputate enim nulla. Sit
          amet purus gravida quis blandit turpis cursus. At lectus urna duis
          convallis convallis tellus. Faucibus a pellentesque sit amet porttitor
          eget. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Libero
          nunc consequat interdum varius sit amet mattis vulputate. Congue eu
          consequat ac felis donec. In mollis nunc sed id semper risus in. Mi in
          nulla posuere sollicitudin aliquam ultrices sagittis. Praesent semper
          feugiat nibh sed pulvinar proin gravida hendrerit lectus. Posuere
          morbi leo urna molestie at elementum eu facilisis. Eget duis at tellus
          at urna condimentum mattis pellentesque. Semper risus in hendrerit
          gravida rutrum. Cursus mattis molestie a iaculis at. Odio euismod
          lacinia at quis risus sed vulputate odio. Dictumst vestibulum rhoncus
          est pellentesque elit ullamcorper. Lorem mollis aliquam ut porttitor.
          Leo urna molestie at elementum. Consectetur adipiscing elit duis
          tristique sollicitudin nibh sit. Urna cursus eget nunc scelerisque
          viverra. Cursus metus aliquam eleifend mi in nulla posuere
          sollicitudin. Ornare arcu dui vivamus arcu felis. At imperdiet dui
          accumsan sit amet nulla facilisi morbi. Volutpat blandit aliquam etiam
          erat velit scelerisque. Facilisis leo vel fringilla est ullamcorper
          eget. Ornare massa eget egestas purus viverra accumsan in nisl nisi.
          Quis risus sed vulputate odio ut enim. Leo vel fringilla est
          ullamcorper eget nulla facilisi etiam. Sit amet dictum sit amet justo
          donec enim. Non nisi est sit amet facilisis magna.
        </Text>
      </Flex>
      <Flex
        sx={{
          position: 'absolute',
          backgroundColor: isShow ? 'transparent' : 'rgba(0,0,0,0.3)',
          height: '100%',
          width: '100%',
        }}
      >
        <Flex
          width={'100%'}
          sx={{
            bottom: 10,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShopButtonSecondary onClick={() => setIsShow((v) => !v)}>
            {isShow ? 'Show Less' : 'Show More'}
          </ShopButtonSecondary>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default function ProductInfo() {
  return (
    <Main isLink={true}>
      <Flex
        p={[24, 28, 32, 36]}
        width={'100%'}
        flexDirection={'column'}
        sx={{ gap: 3 }}
      >
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
        <ShowMoreContainer />
        <Flex
          flexDirection={'column'}
          p={36}
          sx={{ gap: 4, borderBottom: '1px solid black' }}
        >
          <Formik
            initialValues={{ message: '', review: 0 }}
            onSubmit={() => {}}
          >
            {({ values, setFieldValue }) => (
              <FormContainer label="Reviews">
                <FormInput
                  name="message"
                  label={'Message'}
                  multiline={true}
                  variant="outlined"
                  inputcolor={{
                    labelColor: 'gray',
                    backgroundColor: 'white',
                    borderBottomColor: theme.mainColors.first,
                    color: 'black',
                  }}
                  minRows={1}
                  maxRows={5}
                  padding={20}
                  paddingBottom={16}
                  sx={{ color: 'black', width: '100%', mt: 2 }}
                />
                <Flex
                  flex={1}
                  alignItems={['left', 'center', 'center']}
                  flexDirection={['column', 'row', 'row']}
                >
                  <SelectStar
                    selected={values.review}
                    onClick={(v) => setFieldValue('review', v)}
                  />
                  <Flex flex={1} justifyContent={'flex-end'}>
                    <ShopButtonPrimary>
                      <AiOutlineEdit style={{ marginRight: 10 }} /> Submit
                    </ShopButtonPrimary>
                  </Flex>
                </Flex>
              </FormContainer>
            )}
          </Formik>
          <Flex flexDirection={'column'} sx={{ gap: 4 }}>
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Flex flexDirection={'column'} sx={{ gap: 2 }} key={i}>
                  <Text as={'h3'}>Vincent Llantio</Text>

                  <DisplayStar selected={2} />
                  <Text>
                    condimentum vitae sapien pellentesque. Enim praesent
                    elementum facilisis leo vel fringilla. Arcu felis bibendum
                    ut tristique et egestas quis ipsum. Volutpat ac tincidunt
                    vitae semper quis lectus. Ac turpis egestas integer eget
                    aliquet nibh praesent. Dolor purus non
                  </Text>
                  <Text sx={{ fontSize: 11, color: 'gray' }}>
                    {format(new Date(), `yyyy-MM-dd hh:mm aaaaa'm'`)}
                  </Text>
                </Flex>
              ))}
          </Flex>
        </Flex>
        <Section
          title="Customer also bought"
          textProps={{
            width: '100%',
            padding: [0, 3, 3],
            textAlign: 'left',
            color: 'black',
            fontSize: ['24px', '32px'],
            fontWeight: 'bold',
          }}
          contentProps={{
            pl: [0, '6px', '6px'],
            pr: [0, '6px', '6px'],
            width: '100%',
          }}
          rightChild={
            <ShopButtonPrimary style={{ alignSelf: 'left' }}>
              <AiOutlineSearch size={30} style={{ marginRight: 10 }} /> View
              More
            </ShopButtonPrimary>
          }
        >
          <ShopItemContainer>
            <ShopItem />
            <ShopItem />
            <ShopItem />
          </ShopItemContainer>
        </Section>
      </Flex>
    </Main>
  )
}

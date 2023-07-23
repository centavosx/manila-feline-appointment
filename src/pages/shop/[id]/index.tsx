import React, { useState, useEffect, useRef, useMemo } from 'react'
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
import { useApi, useCart, useRecentView } from 'hooks'
import { getAllProduct, getProduct, getProductReview } from 'api'
import { useRouter } from 'next/router'
import { Loading } from 'components/loading'
import Router from 'next/router'

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

const ShowMoreContainer = ({ description }: { description?: string }) => {
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
        <Text>{description}</Text>
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

export default function ProductInfo({
  id,
  category,
}: {
  id: string
  category: string
}) {
  const {
    data: product,
    isFetching,
    error,
  } = useApi(async () => await getProduct(id))

  const { cart, save, addValue, subtractValue, checkIfInCart, removeLocal } =
    useCart(false)

  const { data: productReview, isFetching: isReviewFetching } = useApi(
    async () => await getProductReview(id)
  )

  const { data: allProducts, isFetching: isProductFetching } = useApi(
    async () =>
      await getAllProduct(0, 3, {
        category: [category],
        notIn: [id],
      })
  )

  const data = useMemo(() => {
    if (!product) return undefined
    const d = structuredClone(product)

    const arr: string[] = []

    if (!!d?.images) {
      for (const val of d.images) {
        if (val.pos === 'first') arr[0] = val.link
        if (val.pos === 'second') arr[1] = val.link
        if (val.pos === 'third') arr[2] = val.link
      }
      delete d.images
    }

    return { images: arr as string[], ...d }
  }, [product])

  const { replace } = useRouter()

  useEffect(() => {
    if (!!error) replace('/shop')
  }, [error])

  const products = allProducts?.data

  useRecentView(id, !!product)

  return (
    <Main isLink={true}>
      {(isFetching || isReviewFetching || isProductFetching) && <Loading />}
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
            <ShadowedImage src={data?.images?.[0]} size={250} width={'100%'} />
            <Flex sx={{ gap: 2 }}>
              <ShadowedImage src={data?.images?.[1]} height={120} flex={1} />
              <ShadowedImage src={data?.images?.[2]} height={120} flex={1} />
            </Flex>
          </Flex>
          <Flex flex={1} flexDirection={'column'} sx={{ gap: 3 }}>
            <Flex sx={{ gap: 1, flewWrap: 'wrap' }}>
              <Flex flex={1}>
                <ShadowedFlex
                  p={2}
                  sx={{
                    border: '1px solid black',
                    backgroundColor: theme.colors.pink,
                  }}
                >
                  <Text>{data?.category}</Text>
                </ShadowedFlex>
              </Flex>
              {!!checkIfInCart(id) && (
                <Text as={'h3'} color={'gray'}>
                  In Cart
                </Text>
              )}
            </Flex>
            <Text as={'h2'} alignItems={'left'}>
              {data?.name}
            </Text>
            <Flex flexDirection={'row'} alignItems={'center'}>
              <Text as={'h3'} flex={1}>
                Php{data?.price}
              </Text>
              <Text as={'h4'}>Rating</Text>
              <AiFillStar
                size={16}
                style={{ marginLeft: '4px', marginRight: '4px' }}
              />
              <Text>
                ({!!data?.rating ? Number(data.rating).toFixed(2) : '0.00'})
              </Text>
            </Flex>
            <Text as={'h4'}>Stock: {data?.items}</Text>
            <Text>{data?.shortDescription}</Text>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              sx={{ gap: 2 }}
            >
              <Flex
                sx={{
                  borderRadius: 150,
                  overflow: 'hidden',
                  border: '0.5px solid black',
                  textAlign: 'center',
                  boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.25)',
                  height: 35,
                }}
                justifyContent={'center'}
              >
                <ShopButtonPrimary
                  style={{
                    width: 45,
                    height: '100%',
                    padding: 2,
                    minWidth: 0,
                    borderRadius: 0,
                    borderTopLeftRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderWidth: 0,
                  }}
                  isTransition={false}
                  onClick={() =>
                    (cart?.find((v) => v.id === id)?.qty ?? 1) <
                      (data?.items ?? 0) && addValue(id)
                  }
                >
                  +
                </ShopButtonPrimary>
                <Text
                  pl={4}
                  pr={4}
                  justifyContent={'center'}
                  alignItems={'center'}
                  textAlign={'center'}
                  height={'100%'}
                  alignSelf={'center'}
                  display={'flex'}
                  fontSize={18}
                >
                  {cart?.find((v) => v.id === id)?.qty ?? 1}
                </Text>
                <ShopButtonPrimary
                  style={{
                    width: 45,
                    height: '100%',
                    padding: 2,
                    minWidth: 0,
                    borderRadius: 0,
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                    borderWidth: 0,
                  }}
                  isTransition={false}
                  onClick={() => subtractValue(id)}
                >
                  -
                </ShopButtonPrimary>
              </Flex>
            </Flex>
            <Flex flexDirection={'row'} sx={{ gap: 2, mt: 4 }}>
              <ShopButtonSecondary
                onClick={() => (!!checkIfInCart(id) ? removeLocal(id) : save())}
              >
                <AiOutlineShoppingCart size={18} style={{ marginRight: 6 }} />
                {!!checkIfInCart(id) ? 'Remove from Cart' : 'Add to Cart'}
              </ShopButtonSecondary>
              <ShopButtonPrimary>
                <AiOutlineShopping size={18} style={{ marginRight: 6 }} />
                Buy Now
              </ShopButtonPrimary>
            </Flex>
          </Flex>
        </Flex>
        <ShowMoreContainer description={data?.description} />
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
          {!!productReview && (
            <Flex flexDirection={'column'} sx={{ gap: 4 }}>
              {productReview.map((v: any, i: number) => (
                <Flex flexDirection={'column'} sx={{ gap: 2 }} key={i}>
                  <Text as={'h3'}>{v.user?.name}</Text>

                  <DisplayStar selected={v.rating} />
                  <Text>{v.comment}</Text>
                  <Text sx={{ fontSize: 11, color: 'gray' }}>
                    {format(new Date(v.created), `yyyy-MM-dd hh:mm aaaaa'm'`)}
                  </Text>
                </Flex>
              ))}
            </Flex>
          )}
        </Flex>
        {!!products && products.length > 0 && (
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
              <ShopButtonPrimary
                style={{ alignSelf: 'left' }}
                onClick={() => Router.push('/shop/list')}
              >
                <AiOutlineSearch size={30} style={{ marginRight: 10 }} /> View
                More
              </ShopButtonPrimary>
            }
          >
            <ShopItemContainer>
              {products.map((v: any, i: any) => (
                <ShopItem
                  id={v.id}
                  key={i}
                  name={v.name}
                  rating={v.rating}
                  price={v.price}
                  stock={v.items}
                  image={v.image}
                  category={v.category}
                />
              ))}
            </ShopItemContainer>
          </Section>
        )}
      </Flex>
    </Main>
  )
}

export async function getServerSideProps(context: any) {
  const id: string = context.params.id || ''
  const category: string = context.query.category || ''

  return {
    props: { id, category },
  }
}

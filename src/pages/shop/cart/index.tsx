import { Main } from 'components/main'
import { Flex, Text, Image } from 'rebass'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { ShopButtonPrimary } from 'components/button'
import { AiOutlineDelete } from 'react-icons/ai'
import { useApi, useCart } from 'hooks'
import { getAllProduct } from 'api'
import { useEffect, useRef } from 'react'
import { Loading } from 'components/loading'

const Item = ({
  image,
  name,
  price,
  stock,
  onAdd,
  onSub,
  onDel,
  item,
}: {
  image: string
  name: string
  price: string
  stock: number
  onAdd: () => void
  onSub: () => void
  onDel: () => void
  item: number
}) => {
  return (
    <Flex flexDirection={'row'} alignItems={'start'}>
      <Checkbox />
      <Flex
        flexDirection={'row'}
        sx={{ gap: 2, alignItems: 'center' }}
        flex={1}
      >
        <Image src={image} size={[80, 100]} />
        <Flex flexDirection={'column'} sx={{ gap: 2 }} flex={1}>
          <Text as={'h4'}>{name}</Text>
          <Text style={{ fontSize: 11 }}>Stock: {stock}</Text>

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
                height: 20,
              }}
              justifyContent={'center'}
            >
              <ShopButtonPrimary
                style={{
                  width: 25,
                  height: '100%',
                  padding: 2,
                  minWidth: 0,
                  borderRadius: 0,
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 100,
                  borderWidth: 0,
                }}
                isTransition={false}
                onClick={() => onAdd()}
              >
                +
              </ShopButtonPrimary>
              <Text
                pl={2}
                pr={2}
                justifyContent={'center'}
                alignItems={'center'}
                textAlign={'center'}
                height={'100%'}
                alignSelf={'center'}
                display={'flex'}
                fontSize={11}
              >
                {item}
              </Text>
              <ShopButtonPrimary
                style={{
                  width: 25,
                  padding: 2,
                  minWidth: 0,
                  borderRadius: 0,
                  borderTopRightRadius: 100,
                  borderBottomRightRadius: 100,
                  borderWidth: 0,
                }}
                isTransition={false}
                onClick={() => onSub()}
              >
                -
              </ShopButtonPrimary>
            </Flex>
          </Flex>
          <Text as={'h5'}>Php {price}</Text>
        </Flex>

        <AiOutlineDelete
          color="red"
          style={{ cursor: 'pointer' }}
          onClick={() => onDel()}
        />
      </Flex>
    </Flex>
  )
}

export default function Cart() {
  const { cart, save, addValue, subtractValue, checkIfInCart } = useCart()
  let r = useRef(false)
  const {
    data: allProducts,
    refetch,
    isFetching,
  } = useApi(async ({ inArr }) => {
    return await getAllProduct(0, 100, {
      inArr,
    })
  }, false)

  useEffect(() => {
    if (!!cart && !r.current) {
      setTimeout(() => {
        const cartTemp = cart.map((v) => v.id)
        refetch({
          inArr:
            cartTemp.length === 0
              ? ['00000000-0000-0000-0000-000000000000']
              : cartTemp,
        })
      }, 200)
      r.current = true
    }
  }, [cart])

  return (
    <Main isLink={true}>
      {isFetching && <Loading />}
      <Flex
        height={'100%'}
        width={'100%'}
        p={[24, 28, 32, 36]}
        flexDirection={'column'}
        sx={{ gap: 4 }}
      >
        <Text as={'h2'}>My Cart</Text>
        <Flex
          height={'100%'}
          flexDirection={['column', 'column', 'column', 'row']}
          sx={{ gap: 4 }}
          width={'100%'}
        >
          <Flex flex={1} flexDirection={'column'} sx={{ gap: 2 }}>
            {!!allProducts?.data &&
              !!cart &&
              allProducts.data.map((v: any, i: number) => (
                <Item
                  key={i}
                  name={v.name}
                  price={v.price}
                  stock={v.items}
                  image={v.image}
                  onAdd={() => addValue(v.id)}
                  onSub={() => subtractValue(v.id)}
                  item={cart?.find((v) => v.id)?.qty ?? 1}
                  onDel={() => {}}
                />
              ))}
          </Flex>
          <Flex
            flexDirection={'column'}
            width={['100%', '100%', '100%', 450]}
            sx={{ gap: 2 }}
          >
            <Text as={'h2'}>Summary</Text>
            <Flex
              sx={{
                borderTop: '1px solid black',
                borderBottom: '1px solid black',
                gap: 2,
              }}
              flexDirection={'column'}
              p={2}
            >
              <Text>Item 1</Text>
              <Text>Item 1</Text>

              <Text>Item 1</Text>
              <Text>Item 1</Text>
              <Text>Item 1</Text>
              <Text>Item 1</Text>
              <Text>Item 1</Text>
            </Flex>
            <Flex flexDirection={'row'}>
              <Text flex={1}>Selected Item</Text>
              <Text>x1</Text>
            </Flex>
            <Flex flexDirection={'row'}>
              <Text flex={1} as={'h3'}>
                Total
              </Text>
              <Text as={'h3'}>Php 10000</Text>
            </Flex>
            <Flex mt={2} justifyContent={'flex-end'}>
              <ShopButtonPrimary>Checkout</ShopButtonPrimary>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Main>
  )
}

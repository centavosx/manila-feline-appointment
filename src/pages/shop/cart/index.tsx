import { Main } from 'components/main'
import { Flex, Text, Image } from 'rebass'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { ShopButtonPrimary } from 'components/button'
import { AiOutlineDelete } from 'react-icons/ai'
import { useApi, useCart } from 'hooks'
import { buyProduct, getAllProduct } from 'api'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Loading } from 'components/loading'
import { useRouter } from 'next/router'
import { theme } from 'utils/theme'

const Item = ({
  image,
  name,
  price,
  stock,
  onAdd,
  onSub,
  onDel,
  item,
  selected,
  onSelect,
}: {
  image: string
  name: string
  price: string
  stock: number
  onAdd: () => void
  onSub: () => void
  onDel: () => void
  item: number
  selected: boolean
  onSelect: () => void
}) => {
  return (
    <Flex flexDirection={'row'} alignItems={'start'}>
      <Checkbox
        checked={selected}
        color="secondary"
        onClick={() => onSelect()}
      />
      <Flex
        flexDirection={'row'}
        sx={{ gap: 3, alignItems: 'center' }}
        flex={1}
      >
        <Image src={image} size={[80, 100]} />
        <Flex flexDirection={'column'} sx={{ gap: 2 }} flex={1}>
          <Text as={'h4'} color={theme.colors.lightpink}>
            {name}
          </Text>
          <Text style={{ fontSize: 11, color: theme.colors.lightpink }}>
            Stock: {stock}
          </Text>

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
                color={theme.colors.lightpink}
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
          <Text as={'h5'} color={theme.colors.lightpink}>
            Php {price}
          </Text>
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
  const { push } = useRouter()
  const [selected, setSelec] = useState<string[]>([])
  const { cart, save, addValue, subtractValue, remove } = useCart()
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
  const [isLoading, setIsLoading] = useState(false)

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

  const completeDetails = useMemo(() => {
    if (!!allProducts?.data && !!cart) {
      const selectedObj: Record<string, any> = {}
      let total = 0
      const products = allProducts.data.map((v: any) => {
        const isSelected = selected.includes(v.id)
        const qty = cart?.find((c) => c.id === v.id)?.qty ?? 1
        if (isSelected) {
          selectedObj[v.id] = { ...v, qty }
          const price = Number(v.price)
          total += price * qty
        }
        return {
          ...v,
          qty,
          selected: isSelected,
        }
      })
      return {
        selectedProducts: Object.keys(selectedObj).map((v) => selectedObj[v]),
        products,
        item: Object.keys(selectedObj).length,
        total,
      }
    }

    return undefined
  }, [cart, allProducts, selected])

  useEffect(() => {
    if (isLoading && !!completeDetails && completeDetails.item > 0) {
      buyProduct(
        completeDetails.selectedProducts.map((v) => ({
          id: v.id,
          qty: v.qty,
          price: v.price,
        }))
      )
        .then((v) => {
          push(v.data)
        })
        .catch((d) => {
          alert(
            d?.request?.status === 400 ? 'Invalid Code' : 'An error has occured'
          )
        })
        .finally(() => setIsLoading(false))
    }
  }, [isLoading, completeDetails])

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
        <Text as={'h2'} color={theme.colors.lightpink}>
          My Cart
        </Text>
        <Flex
          height={'100%'}
          flexDirection={['column', 'column', 'column', 'row']}
          sx={{ gap: 4 }}
          width={'100%'}
        >
          <Flex flex={1} flexDirection={'column'} sx={{ gap: 2 }}>
            {!!completeDetails &&
              completeDetails.products.map((v: any) => (
                <Item
                  key={v.id}
                  name={v.name}
                  price={v.price}
                  stock={v.items}
                  image={v.image}
                  onAdd={() => v.qty < v.items && addValue(v.id)}
                  onSub={() => subtractValue(v.id)}
                  item={v.qty}
                  onDel={() => {
                    r.current = false
                    remove(v.id)
                    setSelec((sel) => {
                      return sel.filter((rem) => rem !== v.id)
                    })
                  }}
                  selected={v.selected}
                  onSelect={() => {
                    setSelec((sel) => {
                      if (!!sel.some((s) => s === v.id)) {
                        return sel.filter((rem) => rem !== v.id)
                      }
                      return [...sel, v.id]
                    })
                  }}
                />
              ))}
          </Flex>
          <Flex
            flexDirection={'column'}
            width={['100%', '100%', '100%', 450]}
            sx={{ gap: 2 }}
          >
            <Text as={'h2'} color={theme.colors.lightpink}>
              Summary
            </Text>
            <Flex
              sx={{
                borderTop: `1px solid ${theme.colors.lightpink}`,
                borderBottom: `1px solid ${theme.colors.lightpink}`,
                gap: 2,
              }}
              flexDirection={'column'}
              p={2}
            >
              {!!completeDetails &&
                completeDetails.selectedProducts.map((v, i) => {
                  return (
                    <Flex flexDirection={'row'} sx={{ gap: 2 }} key={v}>
                      <Text flex={1} color={theme.colors.lightpink}>
                        {i + 1}. {v?.name}
                      </Text>
                      <Text
                        flex={1}
                        textAlign={'center'}
                        color={theme.colors.lightpink}
                      >
                        x{v?.qty ?? 0}
                      </Text>
                      <Text
                        flex={1}
                        textAlign={'end'}
                        color={theme.colors.lightpink}
                      >
                        Php {v?.price}
                      </Text>
                    </Flex>
                  )
                })}
            </Flex>
            {!!completeDetails && completeDetails.item > 0 && (
              <>
                <Flex flexDirection={'row'}>
                  <Text flex={1} color={theme.colors.lightpink}>
                    Selected Items
                  </Text>
                  <Text color={theme.colors.lightpink}>
                    x{completeDetails.item}
                  </Text>
                </Flex>
                <Flex flexDirection={'row'}>
                  <Text flex={1} as={'h3'} color={theme.colors.lightpink}>
                    Total
                  </Text>
                  <Text as={'h3'} color={theme.colors.lightpink}>
                    Php {Number(completeDetails.total).toFixed(2)}
                  </Text>
                </Flex>
                <Flex mt={2} justifyContent={'flex-end'}>
                  <ShopButtonPrimary
                    onClick={() => setIsLoading(true)}
                    disabled={isLoading}
                  >
                    Checkout
                  </ShopButtonPrimary>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Main>
  )
}

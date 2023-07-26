import { Main } from 'components/main'
import { Flex, Text } from 'rebass'
import { ShopItem, ShopItemContainer } from 'components/shop'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { Input } from 'components/input'
import { ShopButtonPrimary } from 'components/button'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useApi } from 'hooks'
import { getAllProduct } from 'api'
import { Loading } from 'components/loading'

const CATEGORIES = ['Food', 'Toys', 'Litter', 'Accessories', 'Others']

export default function List() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [{ min, max, page }, setParams] = useState({ min: 0, max: 0, page: 0 })

  const {
    data: allProducts,
    refetch,
    isFetching,
  } = useApi(async ({ category, range, page }) => {
    return await getAllProduct(page, 9, {
      category,
      range,
    })
  }, false)

  useEffect(() => {
    const v = setTimeout(() => {
      refetch({
        range:
          min === 0 && max === 0 ? undefined : [min.toString(), max.toString()],
        category: selectedCategories,
        page,
      })
    }, 500)

    return () => {
      clearTimeout(v)
    }
  }, [min, max, page, selectedCategories])

  const products = allProducts?.data
  const total: number = allProducts?.total ?? 0

  return (
    <Main isLink={true}>
      {isFetching && <Loading />}
      <Flex
        sx={{ height: '100%', gap: [4, 4, 0] }}
        flexDirection={['column', 'column', 'column', 'row']}
        p={[24, 28, 32, 36]}
      >
        <Flex flexDirection={'column'} sx={{ gap: 2 }}>
          <Text as={'h3'}>Categories</Text>
          <Flex
            flexDirection={'column'}
            p={2}
            sx={{ borderBottom: '1px solid black' }}
          >
            <FormControlLabel
              control={<Checkbox checked={selectedCategories.length === 0} />}
              onClick={() => setSelectedCategories([])}
              label="All"
            />
            {CATEGORIES.map((cat, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(cat)}
                    onClick={() =>
                      setSelectedCategories((v) =>
                        !!v.includes(cat)
                          ? v.filter((rem) => rem !== cat)
                          : [...v, cat]
                      )
                    }
                  />
                }
                label={cat}
              />
            ))}
          </Flex>
          <Flex flexDirection={'column'} mt={2} sx={{ gap: 2 }}>
            <Text as={'h3'}>Price Range</Text>
            <Flex sx={{ gap: 3, alignItems: 'center' }}>
              <Input
                type={'number'}
                value={min}
                onChange={(e: any) =>
                  !isNaN(e.target.value as unknown as number) &&
                  setParams((v) => ({ ...v, min: Number(e.target.value) }))
                }
              />
              <Text ml={-2}>To</Text>
              <Input
                type={'number'}
                value={max}
                onChange={(e: any) =>
                  !isNaN(e.target.value as unknown as number) &&
                  setParams((v) => ({ ...v, max: Number(e.target.value) }))
                }
              />
            </Flex>
          </Flex>
          <Flex mt={2}>
            <ShopButtonPrimary
              onClick={() => {
                setParams({
                  min: 0,
                  max: 0,
                  page: 0,
                })
                setSelectedCategories([])
              }}
            >
              Clear All
            </ShopButtonPrimary>
          </Flex>
        </Flex>
        <Flex
          flex={1}
          marginTop={[4, 4, 4, 0]}
          flexDirection={'column'}
          sx={{ gap: 5 }}
        >
          <ShopItemContainer aligned="center">
            {products?.map((v: any, i: any) => (
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
          <Flex flexDirection={'row'} width={'100%'}>
            <Flex
              flex={1}
              flexDirection={'row'}
              sx={{ gap: 2, cursor: 'pointer' }}
            >
              {page + 1 > 1 && (
                <Flex
                  sx={{ gap: 2, cursor: 'pointer', alignItems: 'center' }}
                  onClick={() => setParams((v) => ({ ...v, page: v.page - 1 }))}
                >
                  <AiOutlineArrowLeft />
                  <Text>Prev</Text>
                </Flex>
              )}
            </Flex>
            <Text flex={1} textAlign={'center'}>
              {page + 1}
            </Text>
            <Flex
              flex={1}
              flexDirection={'row'}
              sx={{ gap: 2, cursor: 'pointer' }}
              justifyContent={'flex-end'}
            >
              {!!products && products.length * (page + 1) < total && (
                <Flex
                  sx={{ gap: 2, cursor: 'pointer', alignItems: 'center' }}
                  onClick={() => setParams((v) => ({ ...v, page: v.page + 1 }))}
                >
                  <Text>Next</Text>
                  <AiOutlineArrowRight />
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Main>
  )
}

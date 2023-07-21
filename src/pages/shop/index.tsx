import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { ShopButtonPrimary } from 'components/button'
import { SearchableInput } from 'components/input'
import { AiOutlineSearch } from 'react-icons/ai'
import { Flex } from 'rebass'
import { theme } from 'utils/theme'
import { Section } from 'components/sections'
import { Main } from 'components/main'
import { ShopItem, ShopItemContainer } from 'components/shop'
import { useApi } from 'hooks'
import { getAllProduct, getRecommended } from 'api'

const RecommendedWrapper = styled(Flex)({
  width: '100%',
  padding: '70px 0 40px',
  border: '3px solid #000',
  borderRadius: '50px',
  backgroundColor: theme.colors.lightpink,
})

const ShopContainer = styled(Flex)`
  position: relative;
  margin: 0 auto;
  padding: 24px;

  .item-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item-img {
    width: 360px;
    height: 362px;
    background-color: white;

    &--small {
      width: 192px;
      height: 118px;
    }
  }

  .item-sub-img {
    display: flex;
    gap: 15px;
    margin-top: 30px;
  }

  .item-desc {
    list-style-position: inside;
    font-size: 23px;
    font-weight: 700;
    margin-top: 30px;
  }

  .item-title {
    font-size: 40px;
    text-align: center;
  }

  .item-subtitle {
    font-size: 30px;
    text-align: center;
    margin-top: 40px;

    & > span {
      display: block;
      font-size: 35px;
      margin-top: 10px;
    }
  }
`

type ProductType = {
  id: string
  name: string

  shortdescription: string

  description: string

  category: string

  items: number
  price: string
  rating: string
}

type RawProduct = ProductType & {
  images?: { pos: string; link: string }[]
}

type Product = ProductType & {
  first: string
  second: string
  third: string
}

const UpperItem = ({
  first,
  second,
  third,
  name,
  shortdescription,

  price,
}: Product) => {
  return (
    <RecommendedWrapper>
      <ShopContainer>
        <Flex flexDirection={['column', 'column', 'row']} sx={{ gap: '25px' }}>
          <div className="item-slider">
            <img src={first} alt="" className="item-img" />
            <div className="item-sub-img">
              <img src={second} alt="" className="item-img item-img--small" />
              <img src={third} alt="" className="item-img item-img--small" />
            </div>
          </div>
          <Flex width={'100%'} flexDirection={'column'}>
            <h3 className="item-title">RECOMMENDED ITEM</h3>
            <h4 className="item-subtitle">
              {name} <span>PHP {price}</span>
            </h4>
            <ul className="item-desc">{shortdescription}</ul>
            <Flex sx={{ width: '100%', justifyContent: 'flex-end' }}>
              <ShopButtonPrimary>
                <AiOutlineSearch size={30} style={{ marginRight: 10 }} /> View
                More
              </ShopButtonPrimary>
            </Flex>
          </Flex>
        </Flex>
      </ShopContainer>
    </RecommendedWrapper>
  )
}

export default function Shop() {
  const { data } = useApi(async () => await getRecommended())
  const { data: allProducts } = useApi(
    async () =>
      await getAllProduct(0, 6, {
        sort: 'DESC',
      })
  )
  const recommended = useMemo(() => {
    if (!!data) {
      const d: RawProduct = structuredClone(data)

      const arr: string[] = []

      if (!!d?.images) {
        for (const val of d.images) {
          if (val.pos === 'first') arr[0] = val.link
          if (val.pos === 'second') arr[1] = val.link
          if (val.pos === 'third') arr[2] = val.link
        }
        delete d.images
      }

      return { images: arr, ...d }
    }
    return undefined
  }, [data])

  const products: (RawProduct & { image: string })[] | undefined =
    allProducts?.data

  return (
    <Main isLink={true}>
      <Flex
        p={12}
        width={[200, 700]}
        justifyContent={'flex-end'}
        alignSelf={'flex-end'}
      >
        <SearchableInput
          label="Search"
          placeHolder="Search"
          startAdornment={
            <AiOutlineSearch size={30} style={{ marginRight: 10 }} />
          }
        />
      </Flex>
      {!!recommended && (
        <UpperItem
          {...recommended}
          first={recommended.images[0] as string}
          second={recommended.images[1] as string}
          third={recommended.images[2] as string}
        />
      )}

      <Section
        title="Recent Viewed Items"
        textProps={{
          width: '100%',
          padding: 3,
          textAlign: 'left',
          color: 'black',
          fontSize: '40px',
        }}
        contentProps={{ pl: '6px', pr: '6px', width: '100%' }}
        rightChild={
          <ShopButtonPrimary>
            <AiOutlineSearch size={30} style={{ marginRight: 10 }} /> View More
          </ShopButtonPrimary>
        }
      >
        {/* <ShopItemContainer>
          <ShopItem />
          <ShopItem />
          <ShopItem />
        </ShopItemContainer> */}
      </Section>

      <Section
        title="New Items"
        textProps={{
          width: '100%',
          padding: 3,
          textAlign: 'left',
          color: 'black',
          fontSize: '40px',
        }}
        contentProps={{ pl: '6px', pr: '6px', width: '100%' }}
        rightChild={
          <ShopButtonPrimary>
            <AiOutlineSearch size={30} style={{ marginRight: 10 }} /> View More
          </ShopButtonPrimary>
        }
      >
        {!!products && (
          <ShopItemContainer>
            {products.map((v, i) => (
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
        )}
      </Section>
    </Main>
  )
}

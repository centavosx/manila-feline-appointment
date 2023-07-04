import React from 'react'
import styled from '@emotion/styled'
import { ShopButtonPrimary } from 'components/button'
import { SearchableInput } from 'components/input'
import { AiOutlineSearch } from 'react-icons/ai'
import { Flex } from 'rebass'
import { theme } from 'utils/theme'
import { Section } from 'components/sections'
import { Main } from 'components/main'
import { ShopItem, ShopItemContainer } from 'components/shop'

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
      border: 3px solid #000;
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

const UpperItem = () => {
  return (
    <RecommendedWrapper>
      <ShopContainer>
        <Flex flexDirection={['column', 'column', 'row']} sx={{ gap: '25px' }}>
          <div className="item-slider">
            <img src="" alt="" className="item-img" />
            <div className="item-sub-img">
              <img src="" alt="" className="item-img item-img--small" />
              <img src="" alt="" className="item-img item-img--small" />
            </div>
          </div>
          <Flex width={'100%'} flexDirection={'column'}>
            <h3 className="item-title">RECOMMENDED ITEM</h3>
            <h4 className="item-subtitle">
              Kit Cat Soya Clump Baby Powder 7L Cat Litter{' '}
              <span>PHP 460.00</span>
            </h4>
            <ul className="item-desc">
              <li>
                100% natural eco-friendly biodegradable soybean cat litter
              </li>
              <li>Quick clumping and with odor control</li>
              <li>
                More gentle on the paws, ideal for kittens but still suitable
                for all life stages
              </li>
              <li>Flushable and virtually 99.9% dust-free</li>
              <li>Soft and gentle on paw</li>
            </ul>
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

      <UpperItem />

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
        <ShopItemContainer>
          <ShopItem />
          <ShopItem />
          <ShopItem />
        </ShopItemContainer>
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
        <ShopItemContainer>
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
        </ShopItemContainer>
      </Section>
    </Main>
  )
}

import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from 'components/button'
import { SearchableInput } from 'components/input'
import {
  AiFillStar,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai'
import { Flex, Image, Text } from 'rebass'
import { theme } from 'utils/theme'
import { Section } from 'components/sections'
import { Main } from 'components/main'

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

const ShopButtonPrimary = ({ ...props }: ButtonProps) => (
  <Button
    backgroundcolor={theme.colors.pink}
    textcolor={theme.colors.black}
    hovercolor={'rgba(188, 143, 143,0.4)'}
    hovertextcolor={theme.colors.black}
    activecolor={'rgba(188, 143, 143,0.4)'}
    activetextcolor={theme.colors.black}
    variant="outlined"
    style={{
      borderColor: 'black',
      fontFamily: 'Castego',
      fontWeight: 600,
      borderRadius: 50,
      alignSelf: 'center',
      transition: '0.3s ease-in-out',
    }}
    size={'large'}
    custom={{
      padding: 10,
      paddingLeft: 24,
      paddingRight: 24,
      width: 'auto',
      '@media screen and (max-width: 640px)': {
        fontSize: 12,
        paddingLeft: 16,
        paddingRight: 16,
        width: 'auto',
      },
      '&:hover': {
        transform: 'scale(0.9)',
      },
    }}
    {...props}
  />
)

const ShopButtonSecondary = ({ ...props }: ButtonProps) => {
  return (
    <Button
      backgroundcolor={theme.colors.white}
      textcolor={theme.colors.black}
      hovercolor={'rgba(255, 255, 255,0.4)'}
      hovertextcolor={theme.colors.black}
      activecolor={'rgba(255, 255, 255,0.4)'}
      activetextcolor={theme.colors.black}
      variant="outlined"
      style={{
        borderColor: 'black',
        fontFamily: 'Castego',
        fontWeight: 600,
        borderRadius: 50,
        alignSelf: 'center',
        transition: '0.3s ease-in-out',
      }}
      size={'large'}
      custom={{
        padding: 10,
        paddingLeft: 24,
        paddingRight: 24,
        width: 'auto',
        '@media screen and (max-width: 640px)': {
          fontSize: 12,
          paddingLeft: 16,
          paddingRight: 16,
          width: 'auto',
        },
        '&:hover': {
          transform: 'scale(0.9)',
        },
      }}
      {...props}
    />
  )
}

const CardContainer = styled(Flex)`
  position: relative;
  width: 308px;
  padding: 10px 15px 95px 8px;
  background-color: ${theme.colors.lightpink};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.25);
  .card-upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;

    &::before {
      content: '';
      display: block;
      width: 40px;
      height: 40px;
      background: url('/src/img/shop/search-icon.svg') no-repeat center / 100%
        100%;
    }
  }
  .card-img {
    width: 150px;
    height: 150px;
    margin: 10px auto 20px;
  }

  .card-title {
    font-size: 20px;
    text-align: center;
  }

  .card-rating {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 15px;
    font-size: 20px;

    &::before {
      content: '';
      display: inline-flex;
      width: 30px;
      height: 30px;
      background: url('/src/img/shop/search-icon.svg') no-repeat center / 100%
        100%;
    }
  }
`

const ShopItemContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex justifyContent={'center'} width={'100%'}>
      <Flex
        sx={{
          fontSize: '32px',
          fontWeight: '700',
          flexWrap: 'wrap',
          alignItems: 'initial',
          gap: '60px',
          justifyContent: 'center',
        }}
      >
        {children}
      </Flex>
    </Flex>
  )
}

const ShopItem = () => {
  return (
    <CardContainer>
      <div className="card-upper">
        <span>STOCK 150</span>
      </div>
      <div className="card-img">
        <img
          src=""
          alt=""
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
          }}
        />
      </div>
      <h4 className="card-title">
        Whiskas Tasty Mix Chicken and Tuna with Carrots in Gravy 70g Cat Wet
        Food
        <br />
        <br />
        PHP 40.00
      </h4>
      <Flex sx={{ gap: 2, flexDirection: 'row', justifyContent: 'center' }}>
        <ShopButtonSecondary>View More</ShopButtonSecondary>
        <ShopButtonPrimary>
          <AiOutlineShoppingCart size={24} />
        </ShopButtonPrimary>
      </Flex>
      <span className="card-rating">
        <AiFillStar size={24} style={{ marginRight: 8 }} />
        (5.0)
      </span>
    </CardContainer>
  )
}

export default function Shop() {
  return (
    <Main isLink={true} isShop={true}>
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

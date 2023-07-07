import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai'
import { Flex } from 'rebass'
import { theme } from 'utils/theme'
import { ShopButtonPrimary, ShopButtonSecondary } from 'components/button'

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
export const ShopItemContainer = ({
  children,
  aligned = 'center',
}: {
  children: ReactNode
  aligned?: 'left' | 'right' | 'center'
}) => {
  return (
    <Flex justifyContent={'center'} width={'100%'}>
      <Flex
        sx={{
          fontSize: '32px',
          fontWeight: '700',
          flexWrap: 'wrap',
          alignItems: 'initial',
          gap: '60px',
          justifyContent: aligned,
        }}
      >
        {children}
      </Flex>
    </Flex>
  )
}

export const ShopItem = ({
  size = 'large',
}: {
  size?: 'small' | 'medium' | 'large'
}) => {
  return (
    <CardContainer
      style={{
        width: size === 'large' ? undefined : size === 'medium' ? 284 : 254,
      }}
    >
      <div className="card-upper">
        <span
          style={{
            fontSize:
              size === 'large' ? undefined : size === 'medium' ? 12 : 10,
          }}
        >
          STOCK 150
        </span>
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
      <h4
        className="card-title"
        style={{
          fontSize: size === 'large' ? undefined : size === 'medium' ? 18 : 16,
        }}
      >
        Whiskas Tasty Mix Chicken and Tuna with Carrots in Gravy 70g Cat Wet
        Food
        <br />
        <br />
        PHP 40.00
      </h4>
      <Flex sx={{ gap: 2, flexDirection: 'row', justifyContent: 'center' }}>
        <ShopButtonSecondary
          style={{
            fontSize:
              size === 'large' ? undefined : size === 'medium' ? 14 : 12,
          }}
        >
          View More
        </ShopButtonSecondary>
        <ShopButtonPrimary
          style={{
            fontSize:
              size === 'large' ? undefined : size === 'medium' ? 14 : 12,
          }}
        >
          <AiOutlineShoppingCart
            size={size === 'large' ? 24 : size === 'medium' ? 20 : 18}
          />
        </ShopButtonPrimary>
      </Flex>
      <span
        className="card-rating"
        style={{
          fontSize: size === 'large' ? undefined : size === 'medium' ? 18 : 16,
        }}
      >
        <AiFillStar
          size={size === 'large' ? 24 : size === 'medium' ? 20 : 18}
          style={{ marginRight: 8 }}
        />
        (5.0)
      </span>
    </CardContainer>
  )
}

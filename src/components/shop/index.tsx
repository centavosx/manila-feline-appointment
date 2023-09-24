import React, { ReactNode, memo } from 'react'
import styled from '@emotion/styled'
import {
  AiFillStar,
  AiOutlineDelete,
  AiOutlineShoppingCart,
} from 'react-icons/ai'
import { Flex } from 'rebass'
import { theme } from 'utils/theme'
import { ShopButtonPrimary, ShopButtonSecondary } from 'components/button'
import Router from 'next/router'
import { useCart } from 'hooks'

const CardContainer = styled(Flex)`
  &:hover {
    cursor: pointer;
    transform: scale(0.9);
  }
  transition: 0.3s ease-in-out;
  position: relative;
  width: 308px;
  padding: 10px 15px 95px 8px;
  background-color: ${theme.colors.pink};
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

  .card-bottom {
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 20px;
    bottom: 15px;
  }
  .card-rating {
    font-size: 20px;
    display: flex;
    align-items: center;
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

export const ShopItem = memo(
  ({
    size = 'large',
    image,
    name,
    rating,
    price,
    stock,
    category,
    id,
    cart,
    onAdd,
    onRemove,
  }: {
    size?: 'small' | 'medium' | 'large'
    image: string
    name: string
    rating: string
    price: string
    stock: number
    id: string
    category: string
    cart: { id: string; qty: number }[]
    onAdd: () => void
    onRemove: () => void
  }) => {
    return (
      <CardContainer
        style={{
          width: size === 'large' ? undefined : size === 'medium' ? 284 : 254,
          pointerEvents: 'auto',
        }}
        onClick={() => Router.push('/shop/' + id + '?category=' + category)}
      >
        <div className="card-upper">
          <span
            style={{
              fontSize:
                size === 'large' ? undefined : size === 'medium' ? 12 : 10,
            }}
          >
            STOCK {stock}
          </span>
        </div>
        <div className="card-img">
          <img
            src={image}
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
            fontSize:
              size === 'large' ? undefined : size === 'medium' ? 18 : 16,
          }}
        >
          {name}
          <br />
          <br />
          PHP {price}
        </h4>

        <div className="card-bottom">
          <span
            className="card-rating"
            style={{
              fontSize:
                size === 'large' ? undefined : size === 'medium' ? 18 : 16,
            }}
          >
            <AiFillStar
              size={size === 'large' ? 24 : size === 'medium' ? 20 : 18}
              style={{ marginRight: 8 }}
            />
            ({Number(rating).toFixed(2)})
          </span>
          <Flex sx={{ gap: 2, flexDirection: 'row' }}>
            <ShopButtonPrimary
              style={{
                fontSize:
                  size === 'large' ? undefined : size === 'medium' ? 14 : 12,
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                cart?.some((v) => v.id === id) ? onRemove() : onAdd()
              }}
            >
              {cart?.some((v) => v.id === id) ? (
                <AiOutlineDelete
                  size={size === 'large' ? 24 : size === 'medium' ? 20 : 18}
                />
              ) : (
                <AiOutlineShoppingCart
                  size={size === 'large' ? 24 : size === 'medium' ? 20 : 18}
                />
              )}
            </ShopButtonPrimary>
          </Flex>
        </div>
      </CardContainer>
    )
  }
)
ShopItem.displayName = 'Shop'

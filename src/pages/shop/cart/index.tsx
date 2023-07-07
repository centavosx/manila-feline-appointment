import { Main } from 'components/main'
import { Flex, Text, Image } from 'rebass'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { ShopButtonPrimary } from 'components/button'

const Item = () => {
  return (
    <Flex flexDirection={'row'} alignItems={'start'}>
      <Checkbox />
      <Flex flexDirection={'row'} sx={{ gap: 2 }} flex={1}>
        <Image size={80} />
        <Flex flexDirection={'column'} sx={{ gap: 2 }} flex={1}>
          <Text as={'h4'}>Cat food</Text>
          <Text sx={{ color: 'gray', fontSize: 11 }}>Stock: 10</Text>
          <Text as={'h3'}>Php 1000</Text>
        </Flex>
        <Text>x1</Text>
      </Flex>
    </Flex>
  )
}

export default function Cart() {
  return (
    <Main isLink={true}>
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
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <Item key={i} />
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

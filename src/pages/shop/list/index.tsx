import { Main } from 'components/main'
import { Flex, Text } from 'rebass'
import { ShopItem, ShopItemContainer } from 'components/shop'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { Input } from 'components/input'
import { ShopButtonPrimary } from 'components/button'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export default function List() {
  return (
    <Main isLink={true}>
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
            <FormControlLabel control={<Checkbox />} label="Food" />
            <FormControlLabel control={<Checkbox />} label="Toys" />
            <FormControlLabel
              control={<Checkbox />}
              label="Collars and Leashes"
            />
            <FormControlLabel control={<Checkbox />} label="Litter" />
            <FormControlLabel control={<Checkbox />} label="Accessories" />
            <FormControlLabel control={<Checkbox />} label="Adult" />
            <FormControlLabel control={<Checkbox />} label="All life stages" />
          </Flex>
          <Flex flexDirection={'column'} mt={2} sx={{ gap: 2 }}>
            <Text as={'h3'}>Price Range</Text>
            <Flex sx={{ gap: 3, alignItems: 'center' }}>
              <Input type={'number'} value={0} />
              <Text ml={-2}>To</Text>
              <Input type={'number'} value={0} />
            </Flex>
          </Flex>
          <Flex mt={2}>
            <ShopButtonPrimary>Clear All</ShopButtonPrimary>
          </Flex>
        </Flex>
        <Flex
          flex={1}
          marginTop={[4, 4, 4, 0]}
          flexDirection={'column'}
          sx={{ gap: 5 }}
        >
          <ShopItemContainer aligned="center">
            {Array(9)
              .fill(null)
              .map((_, i) => (
                <ShopItem key={i} size="small" />
              ))}
          </ShopItemContainer>
          <Flex flexDirection={'row'} width={'100%'}>
            <Flex
              flex={1}
              flexDirection={'row'}
              sx={{ gap: 2, cursor: 'pointer' }}
            >
              <AiOutlineArrowLeft />
              <Text>Prev</Text>
            </Flex>
            <Text flex={1} textAlign={'center'}>
              0
            </Text>
            <Flex
              flex={1}
              flexDirection={'row'}
              sx={{ gap: 2, cursor: 'pointer' }}
              justifyContent={'flex-end'}
            >
              <Text>Prev</Text>
              <AiOutlineArrowRight />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Main>
  )
}

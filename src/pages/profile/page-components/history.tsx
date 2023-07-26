import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'

import { Section } from 'components/sections'

import { CustomTable } from 'components/table'
import { useApi } from 'hooks'
import { useRouter } from 'next/router'

import { getAllTransaction } from 'api'
import { format } from 'date-fns'
import { Response } from 'dto/'

type Props = {
  title: string
  isBooking: boolean
}

type Transactiontype = {
  refId: string

  userId: string

  created: string
}

function TransactionsComponent({ title, isBooking }: Props) {
  const [{ page, limit, search }, setParams] = useState({
    limit: 20,
    page: 0,
    search: '',
  })
  const {
    data: dat,
    isFetching,
    refetch,
  } = useApi(
    async () =>
      await getAllTransaction(page, limit, {
        isBooking: !!isBooking ? 1 : 0,
        search,
      })
  )
  const { push } = useRouter()
  const data: Response = dat ?? { data: [] as Transactiontype[], total: 0 }

  useEffect(() => {
    refetch()
  }, [page, limit, search])

  return (
    <Flex flexDirection={'column'} alignItems="center" width={'100%'}>
      <Section
        title={title}
        textProps={{ textAlign: 'start' }}
        contentProps={{ width: '100%' }}
        isFetching={isFetching}
        padding={0}
      >
        <CustomTable
          isCheckboxEnabled={false}
          dataCols={[
            {
              name: 'Transaction Id',
              field: 'refId',
            },
            {
              name: 'Created',
              custom: (v) => {
                return (
                  <>
                    {format(new Date(v.created), `yyyy-MM-dd hh:mm aaaaa'm'`)}
                  </>
                )
              },
            },
          ]}
          onRowClick={(v) => push('/transactions/' + v.refId)}
          dataRow={(data.data ?? []) as Transactiontype[]}
          page={page}
          pageSize={limit}
          total={data?.total ?? 0}
          rowIdentifierField={'refId'}
          handleChangePage={(_, p) => {
            setParams((query) => ({
              ...query,
              page: p,
            }))
          }}
          onSearch={(v) => {
            setParams((query) => ({
              ...query,
              page: 0,
              search: v,
            }))
          }}
          handleChangeRowsPerPage={(e) =>
            setParams((v) => ({
              ...v,
              page: 0,
              limit: parseInt(e.target.value),
            }))
          }
        />
      </Section>
    </Flex>
  )
}

export default function History() {
  return (
    <Section
      title={'History' as JSX.Element & string}
      textProps={{ textAlign: 'start' }}
      contentProps={{
        alignItems: 'start',
        sx: { gap: [20, 40] },
        width: '100%',
      }}
      width={'100%'}
      padding={0}
    >
      <TransactionsComponent key={0} title="Transactions" isBooking={false} />
      <TransactionsComponent key={1} title="Appointments" isBooking={true} />
    </Section>
  )
}

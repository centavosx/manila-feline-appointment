import React, { useEffect, useMemo, useState } from 'react'
import { Flex, Text } from 'rebass'

import { Section } from 'components/sections'

import { CustomTable } from 'components/table'
import { useApi } from 'hooks'
import { useRouter } from 'next/router'

import { getAllTransaction, getTransaction } from 'api'
import { format } from 'date-fns'
import { Response } from 'dto/'
import { User } from 'entities'
import { BackButton } from 'components/back'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

type Props = {
  title: string
  isBooking: boolean
  onClick: (v: string, isBooking: boolean) => void
}

type Transactiontype = {
  refId: string

  userId: string

  created: string
}

function TransactionsComponent({ title, isBooking, onClick }: Props) {
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
          onRowClick={(v) => onClick(v.refId, isBooking)}
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

function TransactionInformation({
  id,
  onClick,
}: {
  id: string
  onClick: () => void
}) {
  const { data, isFetching, error, refetch } = useApi(
    async () => await getTransaction(id)
  )

  const {
    product,
    refId: prodRefId,
    created: prodCreated,

    total: prodTotal,
  } = useMemo(() => {
    if (!data) return { product: [] }
    let refId: string | undefined = undefined

    let created: string | undefined = undefined

    let total = 0

    const product = data.filter((v: any) => {
      refId = v.refId

      created = v.created
      if (!!v.transaction)
        total += Number(v.transaction.price) * v.transaction.itemNumber

      return !!v.transaction
    })

    return { product, refId, created, total }
  }, [data])

  useEffect(() => {
    if (!!error) onClick()
  }, [error])

  const created = prodCreated
  const refId = prodRefId
  const total: number = prodTotal || 0

  return (
    <Flex flexDirection={'column'} alignItems="center" width={'100%'}>
      <Section
        title={
          (
            <BackButton onClick={onClick}>Transaction Information</BackButton>
          ) as JSX.Element & string
        }
        isFetching={isFetching}
        textProps={{ textAlign: 'start' }}
        contentProps={{
          alignItems: 'start',
          sx: { gap: [20, 40] },
        }}
        padding={0}
      >
        <Flex flexDirection={'column'} sx={{ gap: 2 }} width={'100%'}>
          <Text as={'h3'}>TransactionId: {refId}</Text>
          <Text as={'h3'}>Total: Php {total?.toFixed(2)}</Text>
          <Text as={'h5'}>
            Created:{' '}
            {!!created
              ? format(new Date(created), `yyyy-MM-dd hh:mm aaaaa'm'`)
              : undefined}
          </Text>
        </Flex>
        <Table
          sx={{ minWidth: 500, position: 'relative', backgroundColor: 'white' }}
          aria-label="custom pagination table"
          stickyHeader={true}
        >
          <TableHead>
            <TableRow>
              {(product.length > 0
                ? ['Id', 'Product Name', 'Qty', 'Price']
                : []
              ).map((head) => (
                <TableCell
                  key={head as string}
                  align={head !== 'Id' && head !== 'RefId' ? 'right' : 'left'}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {product.length > 0 &&
              product.map((row: any, i: any) => (
                <TableRow key={i} hover={true} style={{ cursor: 'pointer' }}>
                  {[
                    row.transaction.product.id,
                    row.transaction.product.name,
                    row.transaction.itemNumber,
                    'Php' + row.transaction.price,
                  ].map((d, k) => (
                    <TableCell
                      key={k}
                      component="th"
                      scope="row"
                      sx={{
                        width: k === 0 ? 320 : undefined,
                        textAlign: k > 0 ? 'end' : undefined,
                      }}
                    >
                      {d}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Section>
    </Flex>
  )
}

function AppointmentInformation({
  id,
  onClick,
}: {
  id: string
  onClick: () => void
}) {
  const { data, isFetching, error, refetch } = useApi(
    async () => await getTransaction(id)
  )

  const {
    appointment,
    refId: appointmentRefId,
    created: appointmentCreated,
    total: appointmentTotal,
  } = useMemo(() => {
    if (!data) return { appointment: [] }
    let refId: string | undefined = undefined
    let created: string | undefined = undefined

    let total = 0

    const appointment = data.filter((v: any) => {
      refId = v.refId
      created = v.created
      total += 100
      return !!v.appointment
    })

    return { appointment, refId, created, total }
  }, [data])

  useEffect(() => {
    if (!!error) onClick()
  }, [error])

  const created = appointmentCreated
  const refId = appointmentRefId
  const total: number = appointmentTotal || 0
  const dataApp = appointment?.[0]?.appointment

  return (
    <Flex flexDirection={'column'} alignItems="center" width={'100%'}>
      <Section
        title={
          (
            <BackButton onClick={onClick}>Appointment Information</BackButton>
          ) as JSX.Element & string
        }
        isFetching={isFetching}
        textProps={{ textAlign: 'start' }}
        contentProps={{
          alignItems: 'start',
          sx: { gap: [20, 40] },
        }}
        padding={0}
      >
        <Flex flexDirection={'column'} sx={{ gap: 2 }} width={'100%'}>
          <Text as={'h3'}>TransactionId: {refId}</Text>
          <Text as={'h3'}>Total: Php {total?.toFixed(2)}</Text>
          <Text as={'h5'}>
            Created:{' '}
            {!!created
              ? format(new Date(created), `yyyy-MM-dd hh:mm aaaaa'm'`)
              : undefined}
          </Text>
        </Flex>
        {!!dataApp && (
          <Flex flexDirection={'column'} sx={{ gap: 2 }} width={'100%'}>
            <Text as={'h3'}>RefId: {dataApp.refId}</Text>
            <Text as={'h3'}>Pet Name: {dataApp.petName}</Text>
            <Text as={'h3'}>Age: {dataApp.age}</Text>
            <Text as={'h3'}>
              Birthdate:{' '}
              {!!created
                ? format(
                    new Date(dataApp.birthDate),
                    `yyyy-MM-dd hh:mm aaaaa'm'`
                  )
                : undefined}
            </Text>
            <Text as={'h3'}>
              Start Date:{' '}
              {!!created
                ? format(
                    new Date(dataApp.startDate),
                    `yyyy-MM-dd hh:mm aaaaa'm'`
                  )
                : undefined}
            </Text>
            <Text as={'h3'}>
              End Date:{' '}
              {!!created
                ? format(new Date(dataApp.endDate), `yyyy-MM-dd hh:mm aaaaa'm'`)
                : undefined}
            </Text>
            <Text as={'h3'}>Status: {dataApp.status}</Text>
          </Flex>
        )}
      </Section>
    </Flex>
  )
}

export default function History() {
  const [data, setData] = useState<{
    id: string
    isBooking?: boolean
  }>()

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
      {!!data ? (
        data.isBooking ? (
          <AppointmentInformation
            id={data.id}
            onClick={() => setData(undefined)}
          />
        ) : (
          <TransactionInformation
            id={data.id}
            onClick={() => setData(undefined)}
          />
        )
      ) : (
        <>
          <TransactionsComponent
            key={0}
            title="Transactions"
            isBooking={false}
            onClick={(id, isBooking) => setData({ id, isBooking })}
          />
          <TransactionsComponent
            key={1}
            title="Appointments"
            isBooking={true}
            onClick={(id, isBooking) => setData({ id, isBooking })}
          />
        </>
      )}
    </Section>
  )
}

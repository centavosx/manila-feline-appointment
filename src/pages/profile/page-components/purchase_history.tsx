import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'

import { Section } from 'components/sections'

import { CustomTable } from 'components/table'

import { useRouter } from 'next/router'

export default function PurchaseHistory() {
  const { replace, query, pathname, push } = useRouter()
  const [
    { limit: limitParams, page: pageParams, search: searchParams },
    setParams,
  ] = useState({ limit: 0, page: 0, search: '' })

  return (
    <Flex flexDirection={'column'} alignItems="center" width={'100%'}>
      <Section
        title="Purchase History"
        textProps={{ textAlign: 'start' }}
        p={0}
      >
        <CustomTable
          dataCols={[
            { field: 'id', name: 'ID' },
            {
              field: 'name',
              name: 'Name',
            },
            {
              field: 'email',
              name: 'Email',
            },
            {
              field: 'position',
              name: 'Position',
            },
            {
              field: 'description',
              name: 'Description',
            },
          ]}
          dataRow={[]}
          page={pageParams}
          pageSize={limitParams}
          total={0}
          rowIdentifierField={'id'}
          handleChangePage={(_, p) => {
            setParams((query) => ({
              ...query,
              page: p,
            }))
          }}
          handleChangeRowsPerPage={(e) =>
            setParams((query) => ({
              ...query,
              page: 0,
              limit: parseInt(e.target.value),
            }))
          }
          onSearch={(v) =>
            setParams((query) => ({
              ...query,
              page: 0,
              search: v,
            }))
          }
          onRowClick={(v) =>
            push({ pathname: '/doctors/[id]', query: { id: v.id } })
          }
        />
      </Section>
    </Flex>
  )
}

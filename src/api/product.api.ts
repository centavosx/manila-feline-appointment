import { apiAuth } from '../utils'

export const getAllProduct = async (
  page?: number,
  limit?: number,
  other?: any
) => {
  const response = await apiAuth.get('/product', {
    params: {
      page,
      limit,
      ...other,
    },
  })
  return response
}

export const getRecommended = async () => {
  const response = await apiAuth.get('/product/recommended', {})
  return response
}

export const getProduct = async (id: string) => {
  const response = await apiAuth.get('/product/' + id)
  return response
}

export const getProductReview = async (id: string) => {
  const response = await apiAuth.get('/product/' + id + '/review')
  return response
}

export const deleteService = async (data: { ids: string[] }) => {
  const response = await apiAuth.post(`/service/delete`, data)
  return response
}

export const searchService = async (search: string) => {
  const response = await apiAuth.get(`/service/search`, {
    params: {
      search,
    },
  })
  return response
}

export const sendReview = async (
  id: string,
  data: { comment: string; rate: number }
) => {
  const response = await apiAuth.put('/product/review/' + id, data)
  return response
}

export const buyProduct = async (
  data: { id: string; price: string; qty: number }[]
) => {
  const response = await apiAuth.post('/product/buy', {
    data: data,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  return response
}

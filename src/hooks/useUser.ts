import { useContext } from 'react'
import { DataContext } from '../contexts'

export const useUser = () => {
  const { user, logout, refetch, isFetching } = useContext(DataContext)

  return { user, logout, refetch, isFetching }
}

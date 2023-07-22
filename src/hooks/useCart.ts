import { useEffect, useRef, useState } from 'react'

export function useCart(isDebounce = true) {
  const [state, setState] = useState<{ id: string; qty: number }[]>()
  const [toRefresh, setToRefresh] = useState(0)
  useEffect(() => {
    setState(
      !!localStorage.getItem('cart')
        ? (JSON.parse(localStorage.getItem('cart')!) as unknown as {
            id: string
            qty: number
          }[])
        : []
    )
  }, [])

  useEffect(() => {
    if (!!isDebounce && !!state) {
      const deb = setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(state))
      }, 1000)

      return () => {
        clearTimeout(deb)
      }
    }
  }, [state])

  const addValue = (id: string) => {
    setState((v) => {
      if (!v) return
      const isExist = v.some((ch) => ch.id === id)
      if (isExist)
        return v.map((value) => {
          if (value.id === id) return { ...value, qty: value.qty + 1 }
          return value
        })
      return [...v, { id, qty: 2 }]
    })
  }

  const checkIfInCart = (id: string) => {
    if (!state) return false
    const value = !!localStorage.getItem('cart')
      ? (JSON.parse(localStorage.getItem('cart')!) as unknown as {
          id: string
          qty: number
        }[])
      : []

    return value.some((v) => v.id === id)
  }

  const subtractValue = (id: string) => {
    setState((v) => {
      if (!v) return
      const isExist = v.some((ch) => ch.id === id)
      if (isExist)
        return v.map((value) => {
          if (value.id === id)
            return { ...value, qty: value.qty - 1 === 0 ? 1 : value.qty - 1 }
          return value
        })
      return [...v, { id, qty: 1 }]
    })
  }

  const save = () => {
    if (!state) return
    localStorage.setItem('cart', JSON.stringify(state))
    setToRefresh((v) => v + 1)
  }
  return { cart: state, addValue, subtractValue, save, checkIfInCart }
}

export function useRecentView(id?: string | undefined, isView = false) {
  const [state, setState] = useState<string[]>()

  useEffect(() => {
    setState(
      !!localStorage.getItem('viewed')
        ? (JSON.parse(localStorage.getItem('viewed')!) as unknown as string[])
        : []
    )
  }, [])

  useEffect(() => {
    if (isView && !!state) {
      localStorage.setItem('viewed', JSON.stringify([id, ...state].slice(0, 3)))
    }
  }, [isView, state])

  return state
}

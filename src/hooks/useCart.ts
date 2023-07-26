import { useEffect, useRef, useState } from 'react'

export function useCart(isDebounce = true, debounceValue = 300) {
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
      }, debounceValue)

      return () => {
        clearTimeout(deb)
      }
    }
  }, [state])

  const addValue = (id: string, qty = 2) => {
    setState((v) => {
      if (!v) return
      const isExist = v.some((ch) => ch.id === id)
      if (isExist)
        return v.map((value) => {
          if (value.id === id) return { ...value, qty: value.qty + 1 }
          return value
        })
      return [...v, { id, qty }]
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

  const subtractValue = (id: string, qty = 1) => {
    setState((v) => {
      if (!v) return
      const isExist = v.some((ch) => ch.id === id)
      if (isExist)
        return v.map((value) => {
          if (value.id === id)
            return { ...value, qty: value.qty - 1 === 0 ? 1 : value.qty - 1 }
          return value
        })
      return [...v, { id, qty }]
    })
  }

  const remove = (id: string) => {
    setState((v) => {
      const value = v?.filter((arr) => arr.id !== id)
      return value
    })
  }

  const removeLocal = (id: string) => {
    if (!state) return
    const value = structuredClone(state)
    localStorage.setItem(
      'cart',
      JSON.stringify(value.filter((arr) => arr.id !== id))
    )
    setToRefresh((v) => v + 1)
  }

  const save = (id: string, qty: number) => {
    if (!state) return
    const value = !!localStorage.getItem('cart')
      ? (JSON.parse(localStorage.getItem('cart')!) as unknown as {
          id: string
          qty: number
        }[])
      : []

    localStorage.setItem('cart', JSON.stringify([...value, { id, qty }]))
    setToRefresh((v) => v + 1)
  }
  return {
    cart: state,
    addValue,
    subtractValue,
    save,
    checkIfInCart,
    remove,
    removeLocal,
  }
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

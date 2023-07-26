import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@mui/material'
import { DataProvider, PageProvider } from '../contexts'
import { useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'

const theme = createTheme()

NProgress.configure({ showSpinner: false })

export default function App({ Component, pageProps }: AppProps) {
  const { query } = useRouter()

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      NProgress.start()
    })

    Router.events.on('routeChangeComplete', (url) => {
      NProgress.done(false)
    })
  }, [Router])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => NProgress.start())
      return () => {
        window.removeEventListener('beforeunload', () => NProgress.done(false))
      }
    }
  }, [])

  useEffect(() => {
    if (!!query.remove) {
      let v = !!localStorage.getItem('cart')
        ? (JSON.parse(localStorage.getItem('cart')!) as unknown as {
            id: string
            qty: number
          }[])
        : []
      const splitted = (query.remove as string).split(',')

      v = v.filter((toR) => !splitted.includes(toR.id))

      localStorage.setItem('cart', JSON.stringify(v))
    }
  }, [query])

  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ThemeProvider>
  )
}

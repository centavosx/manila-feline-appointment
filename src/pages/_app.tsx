import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@mui/material'
import { FaceBookComponent } from '../components/facebook'

const theme = createTheme()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <FaceBookComponent />
    </ThemeProvider>
  )
}

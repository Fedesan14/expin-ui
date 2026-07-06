import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { store } from './store/store'
import { GlobalStyles } from './theme/GlobalStyles'
import { theme } from './theme/theme'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Provider>
  )
}

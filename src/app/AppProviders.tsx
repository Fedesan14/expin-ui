import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { store } from './store/store'
import { GlobalStyles } from './theme/GlobalStyles'
import { theme } from './theme/theme'
import { ToastProvider } from '../slices/common/components/Toast'
import { AppUpdateProvider } from './pwa/AppUpdateProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <AppUpdateProvider>
            <GlobalStyles />
            {children}
          </AppUpdateProvider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  )
}

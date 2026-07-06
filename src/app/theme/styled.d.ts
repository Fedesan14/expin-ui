import 'styled-components'
import type { AppTheme } from './theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: AppTheme['colors']
    fonts: AppTheme['fonts']
    fontSizes: AppTheme['fontSizes']
    spacing: AppTheme['spacing']
    radii: AppTheme['radii']
    shadows: AppTheme['shadows']
  }
}

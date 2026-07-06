import 'styled-components'
import type { AppTheme } from './theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: AppTheme['colors']
    fonts: AppTheme['fonts']
    fontSizes: AppTheme['fontSizes']
    fontWeights: AppTheme['fontWeights']
    lineHeights: AppTheme['lineHeights']
    spacing: AppTheme['spacing']
    space: AppTheme['space']
    radii: AppTheme['radii']
    shadows: AppTheme['shadows']
    sizes: AppTheme['sizes']
    zIndex: AppTheme['zIndex']
    breakpoints: AppTheme['breakpoints']
    transitions: AppTheme['transitions']
  }
}

import { theme } from '../theme/'
import get from 'lodash/get'

export function minWidth(breakpoint) {
  return `@media screen and (min-width: ${get(
    theme.breakpoints,
    breakpoint
  )}px)`
}

export function maxWidth(breakpoint) {
  return `@media screen and (max-width: ${get(theme.breakpoints, breakpoint) -
    1}px)`
}

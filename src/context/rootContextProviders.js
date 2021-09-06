import { compose } from 'recompose'

import { authUserContextProvider } from './authUserContextProvider'
import { socketContextProvider } from './socketContextProvider'

export const rootContextProviders = compose(
  authUserContextProvider,
  socketContextProvider
)

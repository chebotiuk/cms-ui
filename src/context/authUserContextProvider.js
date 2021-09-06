import { provideContext } from '../hoc/context'

export const authUserContextProvider = provideContext(
  'authUserContext',
  ({ data }) => ({ authUser: data.user }),
)

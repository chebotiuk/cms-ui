import io from 'socket.io-client'

import { provideContext } from '../hoc/context'
import { config } from '../config/configLoader';

let instance = null

export const socketContextProvider = provideContext(
  'socketContext',
  () => ({
    getInstance: function () {
      if (instance) return instance

      instance = io(config.serverUrl, { reconnection: true })
      return instance
    },
    killInstance: function () {
      instance.destroy()
      if (instance) instance = null
    }
  }),
)

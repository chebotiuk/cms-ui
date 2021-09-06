import { config } from './config/configLoader'
import { RestClient } from './lib/RestClient'

export const api = new RestClient({
  serverUrl: config.serverUrl,
  apiVersion: 1,
})

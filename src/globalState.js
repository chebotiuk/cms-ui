import { api } from './api'

export const initialState = {
  notification: null,
}

export const reducer = (state, action) => {
  if (action.type === 'HTTP_ERROR') {
    api.post('/logs', { type: "info", message: `CLIENT_HTTP_ERROR: ${action.payload.status} ${action.payload.message}` })

    if (action.payload.status === 401) return window.location.replace('/auth')

    return {
      ...state,
      authorized: false,
      notification: {
        title: 'HTTP error',
        description: action.payload.status + ' ' + action.payload.message
      }
    }
  }

  switch (action.type) {
    case 'EVOKE_NOTIFICATION':
      return {
        ...state,
        notification: action.payload
      }
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null
      }
    default:
      throw new Error('No handler found for action.type ' + action.type)
  }
}

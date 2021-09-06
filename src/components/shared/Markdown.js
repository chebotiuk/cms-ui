import React from 'react'
import ReactMarkdown from 'react-markdown'

function Image(props) {
  return <img {...props} style={{ maxWidth: '100%' }} />
}

export const Markdown = ({ source }) => {
  return <ReactMarkdown source={source} renderers={{ image: Image }} />
}

import React, { useState, useEffect } from 'react'

import { Markdown } from './Markdown'
import { api } from '../../api'

async function parseBlocks(text) {
  const arr = text.split(/\{(.+?)\}/g)

  const blocks = await Promise.all(arr.map(item => {
    if (item.match(/\*(.+?)\*/g)) {
      const blockKey = item.split(/\*(.+?)\*/g)[1]
      
      return api.get('/blocks/key/:key', { params: { key: blockKey } })
        .then(block => block.textBlock)
        .catch(() => '')
    }
    
    return item
  }))

  const content = blocks.join('')

  if (content.match(/\{(.+?)\}/g)) return parseBlocks(content)

  return content
}

function useBlocks(source) {
  const [text, setText] = useState([])

  useEffect(() => {
    parseBlocks(source)
      .then(setText)
  }, [source])

  return text
}

export function BlockRenderer({ source }) {
  const text = useBlocks(source)

  return <Markdown source={text} />
}

import React from 'react'
import { useParams } from 'react-router-dom'

const Tag = () => {

    const {tagName} = useParams()

  return (
    <div>Tag: {tagName}</div>
  )
}

export default Tag
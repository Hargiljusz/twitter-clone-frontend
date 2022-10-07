import React from 'react'
import { useParams } from 'react-router-dom'
import PostByTag from '../components/PostByTag/PostByTag'

const Tag = () => {

    const {tagName} = useParams()

  return (
    <PostByTag  tagName={tagName}/>
  )
}

export default Tag
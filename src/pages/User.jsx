import React from 'react'
import { useParams } from 'react-router-dom'
import UserDetails from '../components/UserDetails/UserDetails'

const User = () => {
    const {id} = useParams()
    
  return (
    <>
      <UserDetails userId={id} />
    </>
  )
}

export default User
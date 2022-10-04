import React from 'react'
import useFollow from '../../hooks/followHook'
import { useQuery } from '@tanstack/react-query'

const Following = ({siteUserId}) => {
    const {checkFollowAuth} = useFollow()
    const {data,isLoading} = useQuery(["chcekFollow"],async()=>await checkFollowAuth(siteUserId),{refetchOnWindowFocus: false})
    const checkFollow = data?.data

  if(isLoading){
      return <div>Loading ...</div>
  }
  return (
    <div >
    {checkFollow.isFollowing ?<span>Obserwowany</span> : <button>Obserwuj</button>}
    <br />
    {checkFollow.isFollower ?<span>Ten Uzytkownik Obserwuje Cię</span> : <span>Ten Uzytkownik Nie Obserwuje Cię</span>}
    </div>
  )
}

export default Following
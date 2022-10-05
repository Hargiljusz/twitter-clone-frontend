import React from 'react'
import useFollow from '../../hooks/followHook'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'

const Following = ({siteUserId}) => {
    const {checkFollowAuth,followAuth,unfollowAuth} = useFollow()
    const queryClient = useQueryClient()
    const {data,isLoading} = useQuery(["chcekFollow"],async()=>await checkFollowAuth(siteUserId),{refetchOnWindowFocus: false})
    const sendFollow = useMutation(async()=>await followAuth(siteUserId,""),{
      onSuccess:()=>{
        queryClient.invalidateQueries(['chcekFollow'])
      }
    })

    const sendUnfollow = useMutation(async()=>await unfollowAuth(siteUserId,""),{
      onSuccess:()=>{
        queryClient.invalidateQueries(['chcekFollow'])
      }
    })


    const checkFollow = data?.data

  if(isLoading){
      return <div>Loading ...</div>
  }

 const buttonStyle ={
  padding: ".35rem",
  border:"none",
  borderRadius:"20px"
 } 


  return (
    <>
      {checkFollow.isFollowing ?<><span>Obserwowany</span> <button style={buttonStyle} onClick={()=>sendUnfollow.mutate()}>Przestań Obserwowac</button></> : <button style={buttonStyle} onClick={()=>sendFollow.mutate()}>Obserwuj</button>}
      <br />
      <div style={{height:".5rem"}}></div>
      {checkFollow.isFollower ?<span>Ten Uzytkownik Obserwuje Cię</span> : <span>Ten Uzytkownik Nie Obserwuje Cię</span>}
    </>
  )
}

export default Following
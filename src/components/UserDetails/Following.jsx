import React from 'react'
import useFollow from '../../hooks/followHook'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const Following = ({ siteUserId }) => {
  const { checkFollowAuth, followAuth, unfollowAuth } = useFollow()
  const queryClient = useQueryClient()

  const { data: checkFollow, isLoading } = useQuery(["chcekFollow"], async () => {
    const result = await checkFollowAuth(siteUserId, `
                                  userId,
                                  checkUserId, 
                                  isFollowing, 
                                  isFollower`
    )
    return result?.data ?? result.checkFollow
  },
    {
      refetchOnWindowFocus: false
    })

  const sendFollow = useMutation(async () => {
        const result = await followAuth(siteUserId, `
                  from, 
                  to, 
                  createdAt, 
                  id`)
        return result.data
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['chcekFollow'])
        }
    })

  const sendUnfollow =  useMutation(async () => {
    const result = await unfollowAuth(siteUserId, `
              from, 
              to, 
              createdAt, 
              id`)
    return result?.data ?? data.unfollow
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chcekFollow'])
    }
  })



  if (isLoading) {
    return <div>Loading ...</div>
  }

  const buttonStyle = {
    padding: ".35rem",
    border: "none",
    borderRadius: "20px"
  }


  return (
    <>
      {checkFollow.isFollowing ? <><span>Obserwowany</span> <button style={buttonStyle} onClick={() => sendUnfollow.mutate()}>Przestań Obserwowac</button></> : <button style={buttonStyle} onClick={() => sendFollow.mutate()}>Obserwuj</button>}
      <br />
      <div style={{ height: ".5rem" }}></div>
      {checkFollow.isFollower ? <span>Ten Uzytkownik Obserwuje Cię</span> : <span>Ten Uzytkownik Nie Obserwuje Cię</span>}
    </>
  )
}

export default Following
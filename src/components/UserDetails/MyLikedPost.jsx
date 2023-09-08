import React,{Fragment,useEffect} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import usePosts from '../../hooks/postHook'
import LoadSpinner from '../../assets/LoadSpinner/LoadSpinner'
import Post from '../Feed/Post'
import { useInView } from 'react-intersection-observer';

const MyLikedPost = () => {
    const {likedPostsAuth} = usePosts()
    const {data,isLoading,isFetchingNextPage,fetchNextPage,hasNextPage,error} = useInfiniteQuery([["myLikedPost"]],async({ pageParam = 0 })=>{
        const result = await likedPostsAuth(pageParam,20,`
        content {
            id,
            createByUser {
                backgroundPhoto,
                photo,
                userName,
                nick,
                id
              },
            createdAt,
            isLiked,
            isShared,
            content,
            likeNumber,
            shareNumber,
            multimediaDTO {
                files
              },
        },
        totalPageCount,
        pageNumber`)
        return result?.data ?? result.myLikedPosts
    },  {
      enabled: true,
      refetchOnWindowFocus: false,
      keepPreviousData:true,
      cacheTime: 0,
      getNextPageParam: (lastPage, allPage) => {
          if (lastPage.pageNumber + 1 === lastPage.totalPageCount) {
              return undefined
          }
          return allPage.length
      }
  })
    const { ref, inView } = useInView()


    useEffect(() => {
      if (inView && hasNextPage) {
          fetchNextPage()
      }
  }, [inView])

  if(isLoading){
     return <LoadSpinner /> 
  }
  return (
   <>
    {data?.pages.map((group, idx) => {
                    return (
                        <Fragment key={idx}>
                            {group?.content.map((p, i) => <Post key={i} post={p} />)}
                        </Fragment>
                    )
                })
    }
    {data?.pages[0]?.content.length === 0 ? <span>Brak Polubionych postów</span>:null} 
    {isFetchingNextPage  ? <LoadSpinner className={`spinner-position`} /> : null}
     <div style={{ visibility: "hidden" }} ref={ref}>Load More</div>
   </>
  )
}

export default MyLikedPost
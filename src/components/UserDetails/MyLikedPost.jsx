import React,{Fragment,useEffect} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import usePosts from '../../hooks/postHook'
import LoadSpinner from '../../assets/LoadSpinner/LoadSpinner'
import Post from '../Feed/Post'
import { useInView } from 'react-intersection-observer';

const MyLikedPost = () => {
    const {likedPostsAuth} = usePosts()
    const {data,isLoading,isFetchingNextPage,fetchNextPage,hasNextPage,error} = useInfiniteQuery([["myLikedPost"]],({ pageParam = 0 })=>likedPostsAuth(pageParam,20) ,  {
      enabled: true,
      refetchOnWindowFocus: false,
      keepPreviousData:true,
      getNextPageParam: (lastPage, allPage) => {
          if (lastPage.data.pageNumber + 1 === lastPage.data.totalPageCount) {
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
                            {group?.data?.content.map((p, i) => <Post key={i} post={p} />)}
                        </Fragment>
                    )
                })
    }
    {data?.pages[0]?.data?.content.length === 0 ?? data ? <span>Brak Polubionych postów</span>:null} 
    {isFetchingNextPage  ? <LoadSpinner className={`spinner-position`} /> : null}
     <div style={{ visibility: "hidden" }} ref={ref}>Load More</div>
   </>
  )
}

export default MyLikedPost
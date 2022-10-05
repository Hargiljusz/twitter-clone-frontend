import React,{Fragment,useEffect} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import usePosts from '../../hooks/postHook'
import LoadSpinner from '../../assets/LoadSpinner/LoadSpinner'
import Post from '../../components/Feed/Post'
import { useInView } from 'react-intersection-observer';

const SiteUserPosts = ({siteUserId}) => {
    const {getPostByUserId} = usePosts()
    const {data,isLoading,isFetchingNextPage,fetchNextPage,hasNextPage} = useInfiniteQuery([["postByUserId",siteUserId]],({ pageParam = 0 })=>getPostByUserId(siteUserId,pageParam,20) ,  {
      enabled: true,
      refetchOnWindowFocus: false,
      keepPreviousData:true,
      cacheTime:10*60*1000,
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
   <h1 className='h3 site-user'>Posty Użytkownika</h1>
    {data?.pages.map((group, idx) => {
                    return (
                        <Fragment key={idx}>
                            {group?.data?.content.map((p, i) => <Post key={i} post={p} />)}
                           
                        </Fragment>
                    )
                })}
    {isFetchingNextPage  ? <LoadSpinner className={`spinner-position`} /> : null}
     <div style={{ visibility: "hidden" }} ref={ref}>Load More</div>
   </>
  )
}

export default SiteUserPosts
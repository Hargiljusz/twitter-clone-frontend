import {useState,useEffect,Fragment} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import usePost from '../../hooks/postHook'
import { useInView } from 'react-intersection-observer';
import LoadSpinner from '../../assets/LoadSpinner/LoadSpinner'
import Post from '../Feed/Post'
import '../Feed/Feed.css'
import './PostByTag.css'

export const PostByTag = ({tagName}) => {
    const [isPopular, setIsPopular] = useState(true)

    return(
        <>
            {isPopular ? <PopularPostByTag tagName={tagName} setIsPopular={setIsPopular} />: <NewestPostByTag tagName={tagName} setIsPopular={setIsPopular}/>}
            
        </>
    )
}



export const PopularPostByTag = ({tagName,setIsPopular}) => {
    const {popularPosts} = usePost()
    const { ref, inView } = useInView()


    const {
        isLoading,
        isFetching,
        isSuccess,
        refetch,
        isRefetching,
        isError,
        error,
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useInfiniteQuery(['popularPosts'], async ({ pageParam = 0 }) => {
                            const result = await popularPosts(tagName,pageParam, 20, `
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
                                shareNumber
                            },
                            totalPageCount,
                            pageNumber`)
                            return result?.data ?? result.popularPostByTag
                        },
                            {
                                enabled: true,
                                refetchOnWindowFocus: false,
                                keepPreviousData:true,
                                cacheTime: 10*60*1000,
                                staleTime: 5*60*1000,
                                getNextPageParam: (lastPage, allPage) => {
                                    if (lastPage.pageNumber + 1 === lastPage.totalPageCount) {
                                        return undefined
                                    }
                                    return allPage.length
                                }
                            }
                        )


  useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView])


    if (isLoading) {
        return <LoadSpinner className={`spinner-position`} />
    } else {
        return (
            <>
            <div className='tag-posts-header'>
                <h1 className='h3'>Popularne Posty Dla Tagu: {tagName}</h1>
                <button className='postByTagButton' onClick={()=>setIsPopular(prev=>!prev)}>Zmien na najnowsze posty dla tagu: {tagName}</button>
            </div>
                {
                    data?.pages.map((group, idx) => {
                        return (
                            <Fragment key={idx}>
                                {group?.content.map((p, i) => <Post key={i} post={p} />)}
                            
                            </Fragment>
                        )
                    })}
                    {isFetchingNextPage  ? <LoadSpinner className={`spinner-position`} /> : null}
                    <div style={{ visibility: "hidden" }} ref={ref}>Load More</div>
            </>
        )
    }
}


export const NewestPostByTag = ({tagName,setIsPopular}) => {
    const {newestPosts} = usePost()
    const { ref, inView } = useInView()


    const {
        isLoading,
        isFetching,
        isSuccess,
        refetch,
        isRefetching,
        isError,
        error,
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useInfiniteQuery(['newestPosts'], async ({ pageParam = 0 }) => {
                            const result = await newestPosts(tagName,pageParam, 20, `
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
                                shareNumber
                            }`)
                            return result?.data ?? result.newestPostByTag
                            },
                            {
                                enabled: true,
                                refetchOnWindowFocus: false,
                                keepPreviousData:true,
                                cacheTime: 10*60*1000,
                                staleTime: 5*60*1000,
                                getNextPageParam: (lastPage, allPage) => {
                                    if (lastPage.pageNumber + 1 === lastPage.totalPageCount) {
                                        return undefined
                                    }
                                    return allPage.length
                                }
                            }
                        )


  useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView])


    
    if (isLoading) {
        return <LoadSpinner className={`spinner-position`} />
    } else {
        return (
            <>
            <div className='tag-posts-header'>
                <h1 className='h3'>Najnowsze Posty Dla Tagu: {tagName}</h1>
                <button className='postByTagButton' onClick={()=>setIsPopular(prev=>!prev)}>Zmien na popularne posty dla tagu: {tagName}</button>
            </div>
                {data?.pages.map((group, idx) => {
                        return (
                            <Fragment key={idx}>
                                {group?.content.map((p, i) => <Post key={i} post={p} />)}
                            
                            </Fragment>
                        )
                    })}
                    {isFetchingNextPage  ? <LoadSpinner className={`spinner-position`} /> : null}
                    <div style={{ visibility: "hidden" }} ref={ref}>Load More</div>
            </>
        )
    }
}



export default PostByTag
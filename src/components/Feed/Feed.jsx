import { useInfiniteQuery } from '@tanstack/react-query'
import usePost from '../../hooks/postHook'
import React, {useEffect, Fragment } from 'react'
import { useInView } from 'react-intersection-observer';
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadSpinner from "../../assets/LoadSpinner/LoadSpinner"
import Post from './Post';
import "./Feed.css"

const Feed = ({ refresh, refreshCallback }) => {
    const { feedAuth } = usePost()
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
    } = useInfiniteQuery(['feed'], async ({ pageParam = 0 }) => {
            const result = await feedAuth(pageParam, 20, `
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
                  }
            },
            totalPageCount,
            pageNumber`)
            return result?.data ?? result.feed
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
//console.log("isFetching "+isFetching,"isLoading "+isLoading,"isRefetching "+isRefetching)

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
                <Alert show={refresh} className='custom-info-wrapper'>
                    <div className='info-alert'>Nowe Posty</div>
                    <Link className='info-alert-link' onClick={() => {
                        refreshCallback(prev => !prev)
                        refetch()
                    }}>Załaduj</Link>
                </Alert>
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



export default Feed
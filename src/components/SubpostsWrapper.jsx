import React, { Fragment, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import usePosts from '../hooks/postHook'
import LoadSpinner from '../assets/LoadSpinner/LoadSpinner'
import Post from './Feed/Post'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';

const SubpostsWrapper = ({ postId, refreshCallback, isRefresh = false }) => {
    const { subpostsForPost } = usePosts()
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch, error } = useInfiniteQuery([["subpostsForPost", postId]], ({ pageParam = 0 }) => subpostsForPost(postId, pageParam, 20, `
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
    pageNumber`), {
        enabled: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        cacheTime: 0,
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

    if (isLoading) {
        return <LoadSpinner />
    }
    return (
        <>
            <Alert show={isRefresh} className='custom-info-wrapper'>
                <div className='info-alert'>Nowe Posty</div>
                <Link className='info-alert-link' onClick={() => {
                    refreshCallback(prev => !prev)
                    refetch()
                }}>Załaduj</Link>
            </Alert>
            {data?.pages.map((group, idx) => {
                return (
                    <Fragment key={idx}>
                        {group?.data?.content.map((p, i) => <Post key={i} post={p} />)}
                    </Fragment>
                )
            })
            }
            {data?.pages[0]?.data?.content.length === 0 ?? data ? <div style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}>Brak  postów dla tego posta</div> : null}
            {isFetchingNextPage ? <LoadSpinner className={`spinner-position`} /> : null}
            <div style={{ visibility: "hidden" }} ref={ref}>Load More</div>
        </>
    )
}

export default SubpostsWrapper
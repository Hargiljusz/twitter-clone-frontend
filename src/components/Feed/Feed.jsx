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
        isError,
        error,
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useInfiniteQuery(['feed'], ({ pageParam = 0 }) => feedAuth(pageParam, 10, `
                    content {
                        id,
                        createByUser,
                        createdAt,
                        isLiked,
                        isShared,
                        content
                    }`),
        {
            enabled: true,
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage, allPage) => {
                if (lastPage.data.pageNumber + 1 === lastPage.data.totalPageCount) {
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
                            {group?.data?.content.map((p, i) => <Post key={i} post={p} />)}
                            {isFetchingNextPage ? <LoadSpinner className={`spinner-position`} /> : null}
                        </Fragment>
                    )
                })}
                <div style={{ visibility: "hidden" }} ref={ref}>Load More</div>
            </>
        )
    }

}



export default Feed
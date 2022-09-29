import { useQuery } from '@tanstack/react-query'
import usePost from '../../hooks/postHook'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import "./Feed.css"
import {BiLike,BiShare} from "react-icons/bi"

const Feed = ({refresh}) => {
  const {feedAuth} = usePost()
  const [page,setPage] = useState(0)

  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    data,
    isPreviousData,
  } = useQuery(['feed', page], () => feedAuth(page,10,`
                content {
                    id
                }`),
                { enabled : true,keepPreviousData:true })

    let feed = []            

    if(isSuccess){
        feed = data?.data ?? data?.feed
    }
    if(isLoading){
        return <div>Loading ....</div>
    }else{
        return (
            <>
               {feed.content.map((p,idx)=><Post key={idx} post={p} />)}
            </>
          )
    }
    
}

export const Post = ({post}) => {
  return (
    <>
        <Card className='custom-post' style={{backgroundColor: "#2f4050", border:"none", borderBottom: "1px solid grey", borderRadius: "0px"}}>
            <Card.Header style={{padding:"0px 0px 10px 0px", fontSize:".75rem"}}>
                {post.id}
            </Card.Header>
            <Card.Text>
                {post.content}
            </Card.Text>
            <footer style={{fontSize:".75rem", decoration: "none", display:"flex", justifyContent:"space-between",marginTop:".25rem"}} >
                <div className='fotter-items'>
                    <BiLike className='like-icon active' onClick={e=>console.log(e)}></BiLike>
                    <span>{post.likeNumber}</span>
                </div>
                <div className='fotter-items'>
                    <BiShare className='like-icon'></BiShare>
                    <span> {post.shareNumber}</span>
                </div>
            </footer>
        </Card>
    </>
  )
}


export default Feed
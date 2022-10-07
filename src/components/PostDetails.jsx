import { useMemo,useState } from "react"
import {  useParams } from "react-router-dom"
import { useQuery,useMutation } from "@tanstack/react-query"
import usePost from "../hooks/postHook"
import LoaddingSpinner from '../assets/LoadSpinner/LoadSpinner'
import {highlighText} from './Feed/Post'
import {BiLike,BiShare} from "react-icons/bi"
import './Feed/Feed.css'

const PostDetails = () => {
    const {postId} = useParams()
    const {getById} = usePost()
    const {isLoading,data} = useQuery(["postDetails",postId],()=>getById(postId),{refetchOnWindowFocus:false}) 

    const tagHandleClick = (e,tagName) =>{
        e.stopPropagation()
        navigate(`/tag/${tagName}`)
    }

    const formatDate = (date) =>{
        const [YY_MM_DD,HH_MM_SS_MILI] = date.split("T")
        const [HH_MM_SS,MILI] = HH_MM_SS_MILI.split(".")
        return [YY_MM_DD,HH_MM_SS]
    }
    
    const memoContent = useMemo(()=>highlighText(data?.data?.content ,/\#\w+/g,tagHandleClick),[data])

    if(isLoading){
        return < LoaddingSpinner />
    }
    console.log(data)
  return (
    <div className='post-wrapper'  >
    <img className='post-author-img' alt='img' src={`/rest/api/files/${data?.data?.createByUser.photo.replace('\\','/')}`} onClick={()=>navigateToUser(data?.data?.createByUser.id)} />
    <div className='custom-post'>
        <div className='post-header'>
            <span className='nick' onClick={()=>navigateToUser(data?.data?.createByUser.id)}>{data?.data?.createByUser.nick}</span>
            <span className='userName' onClick={()=>navigateToUser(data?.data?.createByUser.id)}>@{data?.data?.createByUser.userName}</span>
            <span className='date'>{formatDate(data?.data?.createdAt).join(" ")}</span>
        </div>
        <div>{memoContent}</div>
            

        <div className='footer-wrapper' >
            <div className='fotter-items'>
                <BiLike className={`icon`} onClick={(e)=>likeHandle(e,data?.data?.id)}></BiLike>
                <span>{0}</span>
            </div>
            <div className='fotter-items'>
                <BiShare className={`icon`} style={{transform: "scaleX(-1)"}} onClick={(e)=>shareHandle(e,data?.data?.id)}></BiShare>
                <span> {0}</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default PostDetails
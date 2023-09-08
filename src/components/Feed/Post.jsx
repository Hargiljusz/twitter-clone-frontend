
import useLike  from "../../hooks/likeHook"
import useSharePost from "../../hooks/sharePostHook"
import React,{ useState, useContext,useMemo } from 'react'
import AuthContext from '../../context/AuthContext'
import { BackendType } from "../../context/AuthContext"
import {BiLike,BiShare} from "react-icons/bi"
import {useNavigate } from 'react-router-dom'
import "./Feed.css"

const Post = ({post}) => {
    const [localIsLiked,setLocalIsLiked] = useState(post.isLiked) // derrived state - anti pattern
    const [localIsShared,setLocalIsShared] = useState(post.isShared)// derrived state - anti pattern
    const {user,backendType} = useContext(AuthContext)
    const {addLikeAuth,deleteLikeByUserIdAndPostIdAuth} = useLike()
    const { addSharePostAuth,deleteSharePostByUserIdAndPostIdAuth} = useSharePost()
    const likeActive = localIsLiked
    const shareActive =  localIsShared
    const navigate = useNavigate()

    const likeHandle = async (event,postId)=>{
        event.preventDefault()
        setLocalIsLiked(prev=>!prev)
        if(!likeActive){
           await addLikeAuth({userId:user.userId,postFor: postId},"id")
           return
        }
        await deleteLikeByUserIdAndPostIdAuth({userId:user.userId,postFor: postId},"statusResult")
        return
    }

    const shareHandle = async (event,postId)=>{
        event.preventDefault()
        setLocalIsShared(prev=>!prev)
        if(!shareActive){
            await addSharePostAuth({
                postFor: postId,
                sharedByUserId: user.userId
              },"id")
              return
        }
        await deleteSharePostByUserIdAndPostIdAuth({postFor: postId,sharedByUserId:user.userId},"statusResult")
        return
    }

    const tagHandleClick = (e,tagName) =>{
        e.stopPropagation()
        navigate(`/tag/${tagName}`)
    }

    const postNavigateClick = (e,postId) =>{
        e.stopPropagation()
        navigate(`/post/${postId}`,{state:{isShared: post.isShared,isLiked:post.isLiked}})
    }

    const formatDate = (date) =>{
        const [YY_MM_DD,HH_MM_SS_MILI] = date.split("T")
        const [HH_MM_SS,MILI] = HH_MM_SS_MILI.split(".")
        return [YY_MM_DD,HH_MM_SS]
    }

    const _computeLikeNumber = () =>{
        if(post.isLiked && localIsLiked){
            return post.likeNumber
        }

        if(post.isLiked && !localIsLiked){
            return post.likeNumber - 1
        }
        
        if(!post.isLiked && localIsLiked){
            return post.likeNumber + 1
        }
        if(!post.isLiked && !localIsLiked){
            return post.likeNumber
        }
    }

    const _computeShareNumber = () =>{
        if(post.isShared && localIsShared){
            return post.shareNumber
        }

        if(post.isShared && !localIsShared){
            return post.shareNumber - 1
        }
        
        if(!post.isShared && localIsShared){
            return post.shareNumber + 1
        }
        if(!post.isShared && !localIsShared){
            return post.shareNumber
        }
    }

    const navigateToUser = (userId) =>{
        navigate(`/user/${userId}`)
    }

    const backedFileURL = backendType === BackendType.RestAPI ? "/rest/api/files" : "/graphql/api/files"
    
    const likeNumber = _computeLikeNumber()
    const shareNumber = _computeShareNumber()

  const memoContent = useMemo(()=>highlighText(post.content ,/\#\w+/g,tagHandleClick),[post])

  return (
    
    <div className='post-wrapper'  >
        <img className='post-author-img' alt='img' src={`${backedFileURL}/${post.createByUser.photo.replace('\\','/')}`} onClick={()=>navigateToUser(post.createByUser.id)} />
        <div className='custom-post'>
            <div className='post-header'>
                <span className='nick' onClick={()=>navigateToUser(post.createByUser.id)}>{post.createByUser.nick}</span>
                <span className='userName' onClick={()=>navigateToUser(post.createByUser.id)}>@{post.createByUser.userName}</span>
                <span className='date'>{formatDate(post.createdAt).join(" ")}</span>
            </div>
            <div style={{cursor:'pointer'}} onClick={(e)=>postNavigateClick(e,post.id)}>
                {memoContent}
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                        {post?.multimediaDTO?.files.map((fsrc,idx) => <img key={idx} style={{width:`${90/post?.multimediaDTO?.files.length}%`,paddingTop:".5rem"}} loading={"lazy"} src={`${backedFileURL}/${fsrc}`} alt="images"/>)}
                    </div>
            </div>
                

            <div className='footer-wrapper' >
                <div className='fotter-items'>
                    <BiLike className={`icon ${likeActive ? "active": ""}`} onClick={(e)=>likeHandle(e,post.id)}></BiLike>
                    <span>{likeNumber}</span>
                </div>
                <div className='fotter-items'>
                    <BiShare className={`icon ${shareActive ? "active": ""}`} style={{transform: "scaleX(-1)"}} onClick={(e)=>shareHandle(e,post.id)}></BiShare>
                    <span> {shareNumber}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post

export const highlighText = (text,regex,handleClick) =>{
    if (!text || !(regex instanceof RegExp)) {
        return <div>text</div>;
      }

    const matchedWords = text.match(regex)
    const splitedText = text.split(regex)
      return(
        <div>
            {splitedText.map((text,idx) => {
                if(idx < matchedWords?.length ?? 0){
                    return <span key={idx}>
                            <span>{text}</span>
                            <span className='tag' onClick={(e)=>handleClick(e,matchedWords[idx].substring(1))}>{matchedWords[idx]}</span>
                            </span>
                }
                return <span key={idx}>{text}</span>
            })}
        </div>
      )
}
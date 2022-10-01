
import useLike  from "../../hooks/likeHook"
import useSharePost from "../../hooks/sharePostHook"
import React,{ useState, useContext,useMemo,useEffect, Fragment } from 'react'
import AuthContext from '../../context/AuthContext'
import {BiLike,BiShare} from "react-icons/bi"
import {useNavigate } from 'react-router-dom'
import "./Feed.css"

const Post = ({post}) => {
    const [localIsLiked,setLocalIsLiked] = useState(post.isLiked) // derrived state - anti pattern
    const [localIsShared,setLocalIsShared] = useState(post.isShared)// derrived state - anti pattern
    const {user} = useContext(AuthContext)
    const {addLikeAuth,deleteLikeByUserIdAndPostIdAuth} = useLike()
    const { addSharePostAuth,deleteSharePostByUserIdAndPostIdAuth} = useSharePost()

    const likeActive = localIsLiked
    const shareActive =  localIsShared

    const navigate = useNavigate()

    const likeHandle = async (event,postId)=>{
        event.preventDefault()
        setLocalIsLiked(prev=>!prev)
        if(!likeActive){
           await addLikeAuth({userId:user.userId,postFor: postId})
           return
        }
        await deleteLikeByUserIdAndPostIdAuth({userId:user.userId,postFor: postId})
    }

    const shareHandle = async (event,postId)=>{
        event.preventDefault()
        setLocalIsShared(prev=>!prev)
        if(!shareActive){
            await addSharePostAuth({
                postFor: postId,
                sharedByUserId: user.userId
              })
              return
        }
        await deleteSharePostByUserIdAndPostIdAuth({postFor: postId,sharedByUserId:user.userId})
    }

    const tagHandleClick = (tagName) =>{
        navigate(`/tag/${tagName}`)
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
    
    const likeNumber = _computeLikeNumber()
    const shareNumber = _computeShareNumber()

  const memoContent = useMemo(()=>highlighText(post.content ,/\#\w+/g,tagHandleClick),[post])

  return (
    
    <div className='post-wrapper'>
        <img className='post-author-img' alt='img' src={`rest/api/files/${post.createByUser.photo}`} onClick={()=>navigateToUser(post.createByUser.id)} />
        <div className='custom-post'>
            <div className='post-header'>
                <span className='nick' onClick={()=>navigateToUser(post.createByUser.id)}>{post.createByUser.nick}</span>
                <span className='userName' onClick={()=>navigateToUser(post.createByUser.id)}>@{post.createByUser.userName}</span>
                <span className='date'>{formatDate(post.createdAt).join(" ")}</span>
            </div>
                {memoContent}

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

const highlighText = (text,regex,handleClick) =>{
    if (!text || !(regex instanceof RegExp)) {
        return <div>text</div>;
      }

    const matchedWords = text.match(regex)
    const splitedText = text.split(regex)
      return(
        <div>
            {splitedText.map((text,idx) => {
                if(idx < matchedWords.length){
                    return <span key={idx}>
                            <span>{text}</span>
                            <span className='tag' onClick={()=>handleClick(matchedWords[idx].substring(1))}>{matchedWords[idx]}</span>
                            </span>
                }
                return <span key={idx}>{text}</span>
            })}
        </div>
      )
}
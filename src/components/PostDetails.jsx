import { useMemo,useState,useContext } from "react"
import {  useParams, useLocation, useNavigate } from "react-router-dom"
import { useQuery,useMutation } from "@tanstack/react-query"
import usePost from "../hooks/postHook"
import LoaddingSpinner from '../assets/LoadSpinner/LoadSpinner'
import {highlighText} from './Feed/Post'
import {BiLike,BiShare,BiComment} from "react-icons/bi"
import useLike from "../hooks/likeHook"
import useSharePost from "../hooks/sharePostHook"
import './Feed/Feed.css'
import AuthContext from "../context/AuthContext"
import PostCreationPanel from '../components/PostCreationPanel/PostCreationPanel'
import SubpostsWrapper from './SubpostsWrapper'

const PostDetails = () => {
    //#region init data
    const {postId} = useParams()
    const {getById} = usePost()
    const {isLoading,data} = useQuery(["postDetails",postId],()=>getById(postId),{refetchOnWindowFocus:false}) 
    const {state:{isLiked,isShared}} = useLocation()
    const navigate = useNavigate()
    const [localIsLiked,setLocalIsLiked] = useState(isLiked)
    const [localIsShared,setLocalIsShared] = useState(isShared)
    const {addLikeAuth,deleteLikeByUserIdAndPostIdAuth} = useLike()
    const {addSharePostAuth,deleteSharePostByUserIdAndPostIdAuth} = useSharePost()
    const likeActive = localIsLiked
    const shareActive =  localIsShared
    const [showCommentTextArea,setShowCommentTextArea] = useState(false)
    const [refreshSubPosts,setRefreshSubposts] = useState(false)
    const {user} = useContext(AuthContext)
    //#endregion

    
    //#region utils
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

    const tagHandleClick = (e,tagName) =>{
        e.stopPropagation()
        navigate(`/tag/${tagName}`)
    }

    const formatDate = (date) =>{
        const [YY_MM_DD,HH_MM_SS_MILI] = date.split("T")
        const [HH_MM_SS,MILI] = HH_MM_SS_MILI.split(".")
        return [YY_MM_DD,HH_MM_SS]
    }

    const navigateToUser = (userId) =>{
        navigate(`/user/${userId}`)
    }
    
    const _computeLikeNumber = () =>{
        if(isLiked && localIsLiked){
            return data?.data?.likeNumber
        }

        if(isLiked && !localIsLiked){
            return data?.data?.likeNumber - 1
        }
        
        if(!isLiked && localIsLiked){
            return data?.data?.likeNumber + 1
        }
        if(!isLiked && !localIsLiked){
            return data?.data?.likeNumber
        }
    }

    const _computeShareNumber = () =>{
        if(isShared && localIsShared){
            return data?.data?.shareNumber
        }

        if(isShared && !localIsShared){
            return data?.data?.shareNumber - 1
        }
        
        if(!isShared && localIsShared){
            return data?.data?.shareNumber + 1
        }
        if(!isShared && !localIsShared){
            return data?.data?.shareNumber
        }
    }

    const memoContent = useMemo(()=>highlighText(data?.data?.content ,/\#\w+/g,tagHandleClick),[data])
    const likeNumber = _computeLikeNumber()
    const shareNumber = _computeShareNumber()

    //#endregion

    if(isLoading){
        return < LoaddingSpinner />
    }
  return (
    <>
        <div className='post-wrapper' style={{paddingTop:"3.5rem"}} >
            <img className='post-author-img' alt='img' src={`/rest/api/files/${data?.data?.createByUser.photo.replace('\\','/')}`} onClick={()=>navigateToUser(data?.data?.createByUser.id)} />
            <div className='custom-post'>
                <div className='post-header'>
                    <span className='nick' onClick={()=>navigateToUser(data?.data?.createByUser.id)}>{data?.data?.createByUser.nick}</span>
                    <span className='userName' onClick={()=>navigateToUser(data?.data?.createByUser.id)}>@{data?.data?.createByUser.userName}</span>
                    <span className='date'>{formatDate(data?.data?.createdAt).join(" ")}</span>
                </div>
                <div>
                {memoContent}
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                        {data?.data?.multimediaDTO?.files.map((fsrc,idx) => <img key={idx} style={{width:"30%",paddingTop:".5rem"}} src={`/rest/api/files/${fsrc}`}/>)}
                    </div>
                </div>
                    
                <div className='footer-wrapper' >
                        <div className="fotter-items">
                            <BiComment className={`icon ${showCommentTextArea ? "active": ""}`} onClick={()=>setShowCommentTextArea(prev=>!prev)} />
                        </div>
                        <div className='fotter-items'>
                            <BiLike className={`icon ${likeActive ? "active": ""}`} onClick={(e)=>likeHandle(e,data?.data?.id)}></BiLike>
                            <span>{likeNumber}</span>
                        </div>
                        <div className='fotter-items'>
                            <BiShare className={`icon ${shareActive ? "active": ""}`} style={{transform: "scaleX(-1)"}} onClick={(e)=>shareHandle(e,data?.data?.id)}></BiShare>
                            <span> {shareNumber}</span>
                        </div>
                    </div>
            </div>
        </div>
        {showCommentTextArea ? <PostCreationPanel refreshCallback={setRefreshSubposts} postFor={postId} />: null}
        <div style={{width:"95%", float:"right"}}>
            <SubpostsWrapper postId={postId} refreshCallback={setRefreshSubposts} isRefresh={refreshSubPosts} />
        </div>
        
    </>
  )
}

export default PostDetails
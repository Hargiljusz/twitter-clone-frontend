import { useMemo,useState,useContext } from "react"
import {  useParams, useLocation, useNavigate } from "react-router-dom"
import { useQuery,useQueryClient } from "@tanstack/react-query"
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
    const queryClient = useQueryClient()
    const {postId} = useParams()
    const {user,userStatus} = useContext(AuthContext)
    const {getByIdAuth} = usePost()
    const {isLoading,data} = useQuery(["postDetails",postId],()=>getByIdAuth(postId,`
    id,
    createByUser {
        backgroundPhoto,
        photo,
        userName,
        nick,
        id
      },
    createdAt,
    ${userStatus.isLogged?"isLiked,":""}
    ${userStatus.isLogged?"isShared,":""}
    content,
    likeNumber,
    shareNumber`),{refetchOnWindowFocus:false}) 
    const isLiked = data?.data?.isLiked
    const isShared = data?.data?.isShared
    
    const {addLikeAuth,deleteLikeByUserIdAndPostIdAuth} = useLike()
    const {addSharePostAuth,deleteSharePostByUserIdAndPostIdAuth} = useSharePost()
    const [showCommentTextArea,setShowCommentTextArea] = useState(false)
    const [refreshSubPosts,setRefreshSubposts] = useState(false)
    
    //#endregion

    
    //#region utils
    const likeHandle = async (event,postId)=>{
        event.preventDefault()
        if(!isLiked){
           await addLikeAuth({userId:user.userId,postFor: postId})
           queryClient.invalidateQueries(["postDetails",postId])
           return
        }
        await deleteLikeByUserIdAndPostIdAuth({userId:user.userId,postFor: postId})
        queryClient.invalidateQueries(["postDetails",postId])
    }

    const shareHandle = async (event,postId)=>{
        event.preventDefault()
        if(!isShared){
            await addSharePostAuth({
                postFor: postId,
                sharedByUserId: user.userId
              })
              queryClient.invalidateQueries(["postDetails",postId])
              return
        }
        await deleteSharePostByUserIdAndPostIdAuth({postFor: postId,sharedByUserId:user.userId})
        queryClient.invalidateQueries(["postDetails",postId])
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
    
    const memoContent = useMemo(()=>highlighText(data?.data?.content ,/\#\w+/g,tagHandleClick),[data])

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
                        {data?.data?.multimediaDTO?.files.map((fsrc,idx) => <img key={idx} style={{width:`${90/data?.data?.multimediaDTO?.files.length}%`,paddingTop:".5rem"}} src={`/rest/api/files/${fsrc}`}/>)}
                    </div>
                </div>
                    
                <div className='footer-wrapper' >
                        <div className="fotter-items">
                            <BiComment className={`icon ${showCommentTextArea ? "active": ""}`} onClick={()=>setShowCommentTextArea(prev=>!prev)} />
                        </div>
                        <div className='fotter-items'>
                            {userStatus.isLogged?<BiLike className={`icon ${isLiked ? "active": ""}`} onClick={(e)=>likeHandle(e,data?.data?.id)}></BiLike>:<BiLike className={`icon`} ></BiLike>}
                            <span>{data?.data?.likeNumber}</span>
                        </div>
                        <div className='fotter-items'>
                        {userStatus.isLogged? <BiShare className={`icon ${isShared ? "active": ""}`} style={{transform: "scaleX(-1)"}} onClick={(e)=>shareHandle(e,data?.data?.id)}></BiShare>:<BiShare className={`icon`} ></BiShare>}
                            <span> {data?.data?.shareNumber}</span>
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
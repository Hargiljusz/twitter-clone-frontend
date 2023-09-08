import React,{useRef,useContext} from 'react'
import useUser from "../../hooks/userHook"
import useFollow from '../../hooks/followHook'
import { useQuery } from '@tanstack/react-query'
import LoadSpinner from "../../assets/LoadSpinner/LoadSpinner"
import UserTabs from './UserTabs'
import AuthContext,{BackendType} from '../../context/AuthContext'
import Following from './Following'
import { Link } from 'react-router-dom'
import SiteUserPosts from "./SiteUserPosts"
import "./UserDetails.css" 

const UserDetails = ({userId}) => {
    const {getById} = useUser()
    const {getNumberOfFollowers,getNumberOfFollowing} = useFollow()
    const imgRef = useRef(null)
    const imgWrapperRef = useRef(null)
    const {user,userStatus,backendType} = useContext(AuthContext)

    const {data,isFetching,isLoading} = useQuery(
      ["user",userId],
      async()=>{
        const response = await getById(userId,` 
        backgroundPhoto,
        photo,
        userName,
        nick,
        id`)
        return response.data
      },
      {keepPreviousData:true,refetchOnWindowFocus:false})


      const {data:followerNumber,isLoading:isLoadingFollowerNumber} = useQuery(["followerNumber",userId],async()=>{
        const response  = await getNumberOfFollowers(userId)
        return response.data
      })
      const {data:followingNumber,isLoading:isLoadingFollowingNumber} = useQuery(["followingNumber",userId],async ()=>{
        const response = await getNumberOfFollowing(userId)
        return response.data
      })

      const handleImgError = () =>{
        if(!imgRef) {
          return
        }

        imgRef.current.src = `/bgPhoto.png`
        imgWrapperRef.current.style.backgroundImage = `url(/bgPhoto.png)`
      }
      const backedFileURL = backendType === BackendType.RestAPI ? "/rest/api/files" : "/graphql/api/files"
  if(isFetching || isLoadingFollowerNumber || isLoadingFollowingNumber){
    return <LoadSpinner className={`spinner-position`} />
  } 
  return (
      <div className='user-info-wrapper'>
        <div ref={imgWrapperRef} className='user-bg-img' style={{backgroundImage:`url(/rest/api/files/${data?.backgroundPhoto})`}}>
          <img src={`${backedFileURL}/${data?.backgroundPhoto}`} onError={handleImgError} ref={imgRef} style={{width:"100%",height:"100%", visibility:"hidden"}} onClick={()=>console.log(imgRef.current.src)}/> 
        </div>
        <img className='avatar'  src={`/rest/api/files/${data.photo.replace('\\','/')}`} alt='img'  />
        <div id='user-info'>
          <strong>{data.nick}</strong>
          <span >@{data.userName}</span>
          {userId !== user.userId ?  
          <div style={{marginTop:".5rem",marginBottom:".5rem"}}>
            {userStatus.isLogged? <Following siteUserId={userId} />:null}
          </div> : null}

          <div>
            <Link className='follows-link' to={`#`} key={1}>
               <strong>{followerNumber?.count ?? followerNumber}</strong> Obserwowanych 
            </Link>
            <Link style={{marginLeft: "10rem"}} className='follows-link' to={`#`} key={2}>
               <strong>{followingNumber?.count ?? followingNumber }</strong> Obserwujących 
            </Link>
          </div>
        </div>
        <div style={{marginTop: '2rem'}}>
        {userId === user.userId ?  <UserTabs userId={data.id} /> : <SiteUserPosts siteUserId={userId} />}
        </div>
    </div>
  )
}

export default UserDetails

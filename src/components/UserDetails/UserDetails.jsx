import React,{useRef,useContext} from 'react'
import useUser from "../../hooks/userHook"
import { useQuery } from '@tanstack/react-query'
import LoadSpinner from "../../assets/LoadSpinner/LoadSpinner"
import UserTabs from './UserTabs'
import AuthContext from '../../context/AuthContext'
import Following from './Following'
import { Link } from 'react-router-dom'
import SiteUserPosts from "./SiteUserPosts"
import "./UserDetails.css" 

const UserDetails = ({userId}) => {
    const {getById} = useUser()
    const imgRef = useRef(null)
    const imgWrapperRef = useRef(null)
    const {user} = useContext(AuthContext)

    const {data,isFetching,isLoading} = useQuery(
      ["user",userId],
      async()=>{
        const response = await getById(userId,"")
        return response?.data ?? {}
      },
      {keepPreviousData:true,refetchOnWindowFocus:false})

      const handleImgError = () =>{
        if(!imgRef) {
          return
        }

        imgRef.current.src = `/bgPhoto.png`
        imgWrapperRef.current.style.backgroundImage = `url(/bgPhoto.png)`
      }

  if(isFetching){
    return <LoadSpinner className={`spinner-position`} />
  }   
  return (
      <div className='user-info-wrapper'>
        <div ref={imgWrapperRef} className='user-bg-img' style={{backgroundImage:`url(rest/api/files/${data?.backgroundPhoto})`}}>
          <img src={`rest/api/files/${data?.backgroundPhoto}`} onError={handleImgError} ref={imgRef} style={{width:"100%",height:"100%", visibility:"hidden"}} onClick={()=>console.log(imgRef.current.src)}/> 
        </div>
        <img className='avatar'  src={`/rest/api/files/${data.photo.replace('\\','/')}`} alt='img'  />
        <div id='user-info'>
          <strong>{data.nick}</strong>
          <span >@{data.userName}</span>
          {userId !== user.userId ?  
          <div style={{marginTop:".5rem",marginBottom:".5rem"}}>
            <Following siteUserId={userId} />
          </div> : null}

          <div>
            <Link className='follows-link' to={`#`}><strong>125</strong> Obserwowanych</Link>
            <Link style={{marginLeft: "10rem"}} className='follows-link' to={`#`}><strong>29</strong> Obserwujących</Link>
          </div>
        </div>
        <div style={{marginTop: '2rem'}}>
        {userId === user.userId ?  <UserTabs userId={data.id} /> : <SiteUserPosts siteUserId={userId} />}
        </div>
    </div>
  )
}

export default UserDetails

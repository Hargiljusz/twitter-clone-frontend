import React,{useRef,useContext} from 'react'
import useUser from "../../hooks/userHook"
import { useQuery } from '@tanstack/react-query'
import LoadSpinner from "../../assets/LoadSpinner/LoadSpinner"
import UserTabs from './UserTabs'
import AuthContext from '../../context/AuthContext'
import Following from './Following'
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
          <br />
          <span >@{data.userName}</span>
          {userId !== user.userId ?  <Following siteUserId={userId} /> : null}
          <br  />
          <span ><strong>125</strong> Obserwowanych</span>
          <span style={{marginLeft: "10rem"}}><strong>29</strong> Obserwujących</span>
        </div>
        <div style={{marginTop: '2rem'}}>
        {userId === user.userId ?  <UserTabs userId={data.id} /> : null}
        </div>
    </div>
  )
}

export default UserDetails

import React,{ useState ,useEffect,useRef,useContext} from 'react'
import { useMutation} from '@tanstack/react-query'
import usePost from '../../hooks/postHook'
import AuthContext from '../../context/AuthContext'
import { Alert } from 'react-bootstrap'
import "./PostCreationPanel.css"

const PostCreationPanel = ({refreshCallback,postFor = ""}) => {
    const {addPostAuth} = usePost();
    const textAreRef = useRef(null)
    const imagesRef = useRef(null)
    const maxCharacterNumber = 280
    const [postContetnt,setPostContetnt] = useState("")
    const [showAlert,setShowAlert] = useState(false)
    const {user} = useContext(AuthContext)

    const postMutation = useMutation(postContent =>{
        const newPost = {
            contetnt:postContent,
            postFor:postFor,
            createByUserId: user.userId
        }
        return addPostAuth(newPost,imagesRef.current.files,`id`)
    })

    useEffect(()=>{
        if(textAreRef){
            textAreRef.current.spellcheck = false
            textAreRef.current.autocomplete = true
            textAreRef.current.autocorrect = true
        }
    },[])

    
    const handleOnChange = (e)=>{
        e.preventDefault()
        const content = e.target.value
        if(content.length > maxCharacterNumber){
            setShowAlert(true)
        }

        if(showAlert &&  (content.length <= maxCharacterNumber)){
            setShowAlert(false)
        }
        setPostContetnt(content)
    }
    const handleSend = () =>{
        if(imagesRef.current.files.length > 3){
            alert("Maksymalnie 3 zdjęcia")
            return
        }
        postMutation.mutate(postContetnt)
        setPostContetnt("")
        setShowAlert(false)
        refreshCallback(prev=>!prev)
    }

  return (
        <div className='text-area-wrapper'>
            <textarea cols="60" rows="5" className='custom-textarea' ref={textAreRef} onChange={handleOnChange} value={postContetnt}/>
            <Alert variant='danger' show={showAlert} className='custom-alert'>Przekroczono Maksymalną ilość znaków</Alert>
            <div className='info-wrapper'>
                <span>{postContetnt.length}/{maxCharacterNumber}</span>
                <input ref={imagesRef} type='file' multiple accept='image/*'/>
                <button className='custom-button' onClick={handleSend}>Postuj</button>
            </div>
        </div>
  )
}

export default PostCreationPanel
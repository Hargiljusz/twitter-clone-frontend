import React,{ useState ,useEffect,useRef,useContext} from 'react'
import { useMutation} from '@tanstack/react-query'
import usePost from '../../hooks/postHook'
import AuthContext from '../../context/AuthContext'
import { Alert } from 'react-bootstrap'
import "./PostCreationPanel.css"

const PostCreationPanel = () => {
    const {addPostAuth} = usePost();
    const textAreRef = useRef(null)
    const maxCharacterNumber = 280
    const [postContetnt,setPostContetnt] = useState("")
    const [contentCharacterNumber,setContentCharacterNumber] = useState(0)
    const [showAlert,setShowAlert] = useState(false)
    const {user} = useContext(AuthContext)

    const postMutation = useMutation(postContent =>{
        const newPost = {
            contetnt:postContent,
            postFor:"",
            createByUserId: user.userId
        }
        return addPostAuth(newPost,`id`)
    },{
         onSuccess: (data,variable,context)=>{
            console.log(data)
            console.log(variable)
         }
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
        const content = event.target.value
        setContentCharacterNumber(content.length)
        if(contentCharacterNumber +1 > maxCharacterNumber){
            setShowAlert(true)
        }

        if(showAlert &&  (contentCharacterNumber -1<= maxCharacterNumber)){
            setShowAlert(false)
        }
        setPostContetnt(content)
    }
    const handleSend = () =>{
        postMutation.mutate(postContetnt)
        setPostContetnt("")
        setContentCharacterNumber(0)
        setShowAlert(false)
    }

  return (
        <div className='text-area-wrapper'>
            <textarea cols="60" rows="5" className='custom-textarea' ref={textAreRef} onChange={handleOnChange} value={postContetnt}/>
            <Alert variant='danger' show={showAlert} className='custom-alert'>Przekroczono Maksymalną ilość znaków</Alert>
            <div className='info-wrapper'>
                <span>{contentCharacterNumber}/{maxCharacterNumber}</span>
                <button onClick={handleSend}>Postuj</button>
            </div>
        </div>
  )
}

export default PostCreationPanel
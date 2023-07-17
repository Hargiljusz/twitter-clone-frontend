import { useQuery } from "@tanstack/react-query";
import useUser from "../../hooks/userHook"
import useTag from "../../hooks/tagHook"
import { useState ,useEffect,useRef} from "react";
import "./SearchBar.css"
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce"
const SearchBar = () => {
    const {search: searchUser} = useUser()
    const {search: searchTag} = useTag()
    const [searchInput,setSearchInput] = useState("")
    const searachInputRef = useRef(null)

    const {data:dataTag = [],refetch:refetchTag} = useQuery(["searchTag"], async()=> {
        return await searchTag(0,20,searchInput,`content {
            createdAt
            name
          }
          pageSize
          pageNumber
          totalPageCount`)
          
    },{enabled:false,refetchOnWindowFocus:false,cacheTime:0})


    const {data:dataUser = [],refetch:refetchUser} = useQuery(["searchUser"], async()=> {
        return await searchUser(searchInput,0,20,`content {
            id,
            email,
            name,
            userName,
            nick,
            userName
          }
          pageSize
          pageNumber
          totalPageCount`)
          
    },{enabled:false,refetchOnWindowFocus:false,cacheTime:0})

    const resultTag = dataTag?.data ?? dataTag?.search
    const resultUser = dataUser?.data ?? dataUser?.searchUsers

   const debounce = useDebounce(searchInput,300)
    
    const handleOnChange = (event) =>{
        event.preventDefault()
        let value = event.target.value
        setSearchInput(value) 
    }

    useEffect(()=>{
        if(searchInput && searchInput !== ""){
            refetchTag()
            refetchUser()
            //console.log("sended")
            // resultTag?.content.length > 0 ? console.log("tag",resultTag):null;
            // resultUser?.content.length > 0 ? console.log("user",resultUser): null;
        }
    },[debounce])


  return (
    <>
   <div className="wrapper" >
    <div className="search-input" ref={searachInputRef} onFocus={()=>searachInputRef.current.classList.add("active")} onBlur={()=>searachInputRef.current.classList.remove("active")}>
        <input type="text" placeholder="Szukaj...." value={searchInput} onChange={handleOnChange}  />
        {searchInput !== "" ? <AutoComBox tagData={resultTag} userData={resultUser} searachInputRef={searachInputRef}/> : null}
    </div>
    
   </div>
   </>
  )
}


const AutoComBox = ({tagData,userData,searachInputRef}) => {
    const tags = tagData?.content.map(t=>{
        return <AutoComBoxTag key={t.name} tag={t}/>
    }) 
    const users = userData?.content.map(u=><AutoComBoxUser key={u.id} user={u}/>) 

    tags || users ? searachInputRef.current.classList.add("active"):  searachInputRef.current.classList.remove("active")

  return (
    <div className="autocom-box">
     {tags}   
    {users} 
    </div>
  )
}

const AutoComBoxTag = ({tag}) => {
  //navigate(`/tag/${tagName}`)
  return (
    <Link to={`/tag/${tag.name}`} style={{textDecoration: "none"}}><li>{"#"+tag.name}</li></Link>
  )
}

const AutoComBoxUser = ({user}) => {
    return (
        <Link to={`/user/${user.id}`} style={{textDecoration: "none"}}><li>{user.email}</li></Link>
    )
  }



export default SearchBar
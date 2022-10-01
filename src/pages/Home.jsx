import { useState ,useContext} from "react"
import AuthContext from "../context/AuthContext"
import Feed from "../components/Feed/Feed"
import PostCreationPanel from "../components/PostCreationPanel/PostCreationPanel"

const Home = () =>{
    const [refresh,setRefresh] = useState(false)
    const {userStatus} = useContext(AuthContext)
    return(
        <>
            <h1 className="h4 mt-4 ms-4">Główna</h1>
            {userStatus.isLogged ? 
            <>
                <PostCreationPanel refreshCallback={setRefresh}/>
                <Feed refresh={refresh} refreshCallback={setRefresh}/>
            </>
            : null}
        </>
    )
}
export default Home
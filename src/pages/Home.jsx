import LoginModal from "../components/LoginModal"
import PostCreationPanel from "../components/PostCreationPanel/PostCreationPanel"

const Home = () =>{
    return(
        <>
            <h1 className="h4 mt-4 ms-4">Główna</h1>
            <PostCreationPanel/>
        </>
    )
}
export default Home
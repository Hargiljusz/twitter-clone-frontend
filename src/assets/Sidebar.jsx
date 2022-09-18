import "../App.css"
import {FiHome,FiLogIn} from "react-icons/fi"
import {BsFillPersonFill} from "react-icons/bs"
import routes from "../utils/routesData"
import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import LoginModal from "../components/LoginModal"

const Sidebar = () => {

  const {userStatus,user,logout} = useContext(AuthContext)
  
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        
      <Link to={routes.Home}>
          <li className="SidebarRow">
              <FiHome className="Icon"></FiHome>
              <div className="Title">Home</div>
              
          </li>
          </Link>

        {userStatus.isLogged ?
        <Link to={routes.Profile}>
          <li className="SidebarRow">
              <BsFillPersonFill className="Icon"></BsFillPersonFill>
              <div className="Title">Person</div>
          </li>
        </Link>:null}

        {userStatus.isLogged ?
        <Link to="#" onClick={()=>logout()}>
          <li className="SidebarRow">
              <FiLogIn className="Icon" style = {{transform: 'rotate(180deg)' }}></FiLogIn>
              <div className="Title">Logout</div>
          </li>
        </Link>:null}

        {!userStatus.isLogged ?
        <LoginModal/>:null}

      </ul>
      <div className="SidebarFotter">{userStatus.isLogged ? user.email: null}</div>
    </div>
  )
  
}

export default Sidebar;
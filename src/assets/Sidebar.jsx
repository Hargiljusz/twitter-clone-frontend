import "../App.css"
import {FiHome} from "react-icons/fi"
import {BsFillPersonFill} from "react-icons/bs"

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <li className="SidebarRow">
            <FiHome className="Icon"></FiHome>
            <div className="Title">Home</div>
        </li>

        <li className="SidebarRow">
            <BsFillPersonFill className="Icon"></BsFillPersonFill>
            <div className="Title">Person</div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;
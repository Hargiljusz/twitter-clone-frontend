import React from "react"
import {FiHome,FiLogIn} from "react-icons/fi"
import {BsFillPersonFill} from "react-icons/bs"
import routesData from "./routesData"

const sidebarData = [
    {
        name: "Home",
        icon: <FiHome/>,
        path: routesData.Home
    },
    {
        name: "Login",
        icon: <BsFillPersonFill/>,
        path: routesData.Login
    },{
        name: "Profil",
        icon: <FiLogIn/>,
        path: routesData.Profile
    },
    
]
export default sidebarData;
import { useState } from "react";
import { Tabs,Tab } from "react-bootstrap";
import MyPost from "./MyPost";
import MySubpost from "./MySubpost";
import MyLikedPost from './MyLikedPost'
import MySharedPost from './MySharedPosts'
import "./UserDetails.css" 

const UserTabs = ({userId}) => {
    const [key,setKey] = useState('myPosts')

    
    return (
    <>
        <Tabs accessKey={key} onSelect={k=>setKey(k)} transition={false} fill >
           <Tab eventKey='myPosts' title='My Posts' tabClassName="coloredTab" className="tab-content-custom">
            <MyPost/>
           </Tab>
           <Tab eventKey='mySubposts' title='My Subpost' tabClassName="coloredTab" className="tab-content-custom">
            <MySubpost userId={userId} />
           </Tab>  
           <Tab eventKey='myLikedPosts' title='My Liked Posts' tabClassName="coloredTab" className="tab-content-custom">
            <MyLikedPost />
           </Tab> 
           <Tab eventKey='mySharedPosts' title='My Shared' tabClassName="coloredTab" className="tab-content-custom">
            <MySharedPost/>
           </Tab> 
        </Tabs>
    </>
  )
}

export default UserTabs
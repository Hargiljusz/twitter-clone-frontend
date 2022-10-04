import axios from "axios"
import jwtAxios from "../../utils/jwtAxios"
const prefixUrl = "/rest"


const getNumberOfFollowers = (userId) => {
    return axios.get(`${prefixUrl}/api/follow/followeringNumber?userId=${userId}`)
}

const getNumberOfFollowing = (userId) => {
    return axios.get(`${prefixUrl}/api/follow/followersNumber?userId=${userId}`)
}

const getFollowPropositionAuth = (page = 0,size = 10,ctx) =>{
    return jwtAxios.get(`${prefixUrl}/api/follow/myPropositions?pageNumber=${page}&pageSize=${size}`,{context: ctx})
} 

const getMyFollowersAuth = (page = 0,size = 10,ctx) =>{
    return jwtAxios.get(`${prefixUrl}/api/follow/myFollowers?pageNumber=${page}&pageSize=${size}`,{context: ctx})
} 

const getMyFollowingsAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/follow/myFollowings?pageNumber=${page}&pageSize=${size}`,{context: ctx})
}

const followAuth = (followUserId,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/follow/follow?followUserId=${followUserId}`,{},{context:ctx})
}

const unfollow = (followUserId,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/follow/unfollow?followUserId=${followUserId}`,{},{context:ctx})
}


const checkFollowAuth = (checkUserId,ctx)=>{
    return jwtAxios.get(`${prefixUrl}/api/follow/check?checkUserId=${checkUserId}`,{context:ctx})
}


const api = Object.freeze({
    getNumberOfFollowers,
    getNumberOfFollowing,
    getFollowPropositionAuth,
    getMyFollowersAuth,
    getMyFollowingsAuth,
    followAuth,
    unfollow,
    checkFollowAuth
 });

export default api
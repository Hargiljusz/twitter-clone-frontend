import axios from "axios"
import jwtAxios from "../../utils/jwtAxios"
const prefixUrl = "/rest"

//#region CRUD
const getPageableAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/sharePost?pageNumber=${page}&pageSize=${size}`,{context: ctx})
}

const getByIdAuth = (id,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/sharePost/${id}`,{context: ctx})
}

const addSharePostAuth = (sharePost,ctx) =>{
    return jwtAxios.post(`${prefixUrl}/api/sharePost/`,sharePost,{context: ctx})
} 

const updateSharePostByIdAuth = (id,sharePost,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/sharePost/${id}`,sharePost,{context: ctx})
} 

const deleteSharePostByIdAuth = (id,ctx) => {
    return jwtAxios.delete(`${prefixUrl}/api/sharePost/${id}`,{context: ctx})
}

//#endregion

const getNumberOfShares = (postId) =>{
    return axios.get(`${prefixUrl}/api/sharePost/shareNumber/${postId}`)
}

const getMySharedPostsAuth = (page,size,ctx) =>{
    return jwtAxios.get(`${prefixUrl}/api/sharePost/me?pageNumber=${page}&pageSize=${size}`,{context:ctx})
}



const api = Object.freeze({
    getPageableAuth,
    getByIdAuth,
    addSharePostAuth,
    updateSharePostByIdAuth,
    deleteSharePostByIdAuth,
    getNumberOfShares,
    getMySharedPostsAuth
 });

export default api
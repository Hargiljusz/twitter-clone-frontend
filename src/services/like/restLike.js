import axios from "axios"
import jwtAxios from "../../utils/jwtAxios"
const prefixUrl = "/rest"

//#region CRUD
const getPageableAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/like?pageNumber=${page}&pageSize=${size}`,{context: ctx})
}

const getByIdAuth = (id,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/like/${id}`,{context: ctx})
}

const addLikeAuth = (like,ctx) =>{
    return jwtAxios.post(`${prefixUrl}/api/like/`,like,{context: ctx})
} 

const updateLikeByIdAuth = (id,like,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/like/${id}`,like,{context: ctx})
} 

const deleteLikeByIdAuth = (id,ctx) => {
    return jwtAxios.delete(`${prefixUrl}/api/like/${id}`,{context: ctx})
}

//#endregion

const getNumberOfLikes = (postId) =>{
    return axios.get(`${prefixUrl}/api/like/likeNumber/${postId}`)
}

const getMyLikedPostsAuth = (page,size,ctx) =>{
    return jwtAxios.get(`${prefixUrl}/api/like/me?pageNumber=${page}&pageSize=${size}`,{context:ctx})
}



const api = Object.freeze({
    getPageableAuth,
    getByIdAuth,
    addLikeAuth,
    updateLikeByIdAuth,
    deleteLikeByIdAuth,
    getNumberOfLikes,
    getMyLikedPostsAuth
 });

export default api
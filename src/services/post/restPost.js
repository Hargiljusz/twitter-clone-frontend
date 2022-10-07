import axios from "axios"
import jwtAxios from "../../utils/jwtAxios"
const prefixUrl = "/rest"

//#region CRUD
const getPageable = (page = 0,size = 10) => {
    return axios.get(`${prefixUrl}/api/post?pageNumber=${page}&pageSize=${size}`)
}

const getById = (id) => {
    return axios.get(`${prefixUrl}/api/post/${id}`)
}

const addPostAuth = (post,files = [],ctx) =>{
    
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
        formData.append('Files',files[i],files[i].name)
    }

    formData.append('Contetnt',post.contetnt)
    formData.append('CreateByUserId',post.createByUserId)
    formData.append('PostFor',post.postFor)
    return jwtAxios.post(`${prefixUrl}/api/post/`,formData,{context: ctx,headers: { "Content-Type": "multipart/form-data" }})
} 

const updatePostByIdAuth = (id,post,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/post/${id}`,post,{context: ctx})
} 

const deletePostByIdAuth = (id,ctx) => {
    return jwtAxios.delete(`${prefixUrl}/api/post/${id}`,{context: ctx})
}

//#endregion

const ignoreAllPostsAuth = (ignoreUserId,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/post/ignore/allPosts/?ignoreUserId=${ignoreUserId}`,{},{context: ctx})
}

const ignorePostsAuth = (postId,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/post/ignore?postId=${postId}`,{},{context: ctx})
}

const repostAuth = (postId,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/post/repost?postId=${postId}`,{},{context: ctx})
}

const feedAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/post/feed?pageNumber=${page}&pageSize=${size}`,{context: ctx})
}

const likedPostsAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/post/liked?pageNumber=${page}&pageSize=${size}`,{context: ctx})
}

const sharedPostsAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/post/shares?pageNumber=${page}&pageSize=${size}`,{context: ctx})
}

const myPostsAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/post/me?pageNumber=${page}&pageSize=${size}`,{context: ctx})
}

const subpostsForUser = (userId,page = 0,size = 10) => {
    return axios.get(`${prefixUrl}/api/post/subpost/user?userId=${userId}&pageNumber=${page}&pageSize=${size}`)
}

const subpostsForPost = (postId,page = 0,size = 10) => {
    return axios.get(`${prefixUrl}/api/post/subpost/${postId}?pageNumber=${page}&pageSize=${size}`)
}
const newestPosts = (tag,page = 0,size = 10) => {
    return axios.get(`${prefixUrl}/api/post/newest?tag=${tag}&pageNumber=${page}&pageSize=${size}`)
}
const popularPosts = (tag,page = 0,size = 10) => {
    return axios.get(`${prefixUrl}/api/post/popular?tag=${tag}&pageNumber=${page}&pageSize=${size}`)
}

const getPostByUserId = (userId,page = 0,size = 10)=>{
    return axios.get(`${prefixUrl}/api/post/user/${userId}?pageNumber=${page}&pageSize=${size}`)
}


const api = Object.freeze({
    getPageable,
    getById,
    addPostAuth,
    updatePostByIdAuth,
    deletePostByIdAuth,
    ignoreAllPostsAuth,
    ignorePostsAuth,
    repostAuth,
    feedAuth,
    likedPostsAuth,
    sharedPostsAuth,
    myPostsAuth,
    subpostsForUser,
    subpostsForPost,
    newestPosts,
    popularPosts,
    getPostByUserId
 });

export default api
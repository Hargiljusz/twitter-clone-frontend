import axios from "axios"
import jwtAxios from "../../utils/jwtAxios"
const prefixUrl = "/rest"

//#region CRUD
const getPaged = (page = 0,size = 10) => {
    return axios.get(`${prefixUrl}/api/tag?pageNumber=${page}&pageSize=${size}`)
}

const getById = (id) => {
    return axios.get(`${prefixUrl}/api/tag/${id}`)
}

const getByName = (name) => {
    return axios.get(`${prefixUrl}/api/tag/name/${name}`)
}

const addTagAuth = (tag,ctx) =>{
    return jwtAxios.post(`${prefixUrl}/api/tag/`,tag,{context: ctx})
} 

const updateTagByIdAuth = (id,tag,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/tag/${id}`,tag,{context: ctx})
} 

const deleteTagByIdAuth = (id,ctx) => {
    return jwtAxios.delete(`${prefixUrl}/api/tag/${id}`,{context: ctx})
}

const deleteTagByNameAuth = (name,ctx) => {
    return jwtAxios.delete(`${prefixUrl}/api/tag/name/${name}`,{context: ctx})
}
//#endregion

const searchTag = (query,page,size) =>{
    return axios.get(`${prefixUrl}/api/tag/search?query=${query}&pageNumber=${page}&pageSize=${size}`)
}

const popular = (page,size) =>{
    return axios.get(`${prefixUrl}/api/tag/popular?pageNumber=${page}&pageSize=${size}`)
}

const addIgnoreTagAuth =(tag,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/tag/me/ignore?tag=${tag}`,{},{context:ctx})
}

const delteIgnoreTagAuth =(tag,ctx) =>{
    return jwtAxios.delete(`${prefixUrl}/api/tag/me/ignore?tag=${tag}`,{context:ctx})
}

const getIgnoreTagAuth =(page,size,ctx) =>{
    return jwtAxios.get(`${prefixUrl}/api/tag/me/ignore?pageNumber=${page}&pageSize=${size}`,{context:ctx})
}

const api = Object.freeze({
    getPaged,
    getById,
    getByName,
    addTagAuth,
    updateTagByIdAuth,
    deleteTagByIdAuth,
    deleteTagByNameAuth,
    searchTag,
    popular,
    addIgnoreTagAuth,
    delteIgnoreTagAuth,
    getIgnoreTagAuth
 });

export default api
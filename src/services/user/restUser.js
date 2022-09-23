import axios from "axios"
import jwtAxios from "../../utils/jwtAxios"
const prefixUrl = "/rest"

//#region RUD
const getPageableAuth = (page = 0,size = 10,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/user?pageNumber=${page}&pageSize=${size}`,{context:ctx})
}

const getById = (id) => {
    return axios.get(`${prefixUrl}/api/user/${id}`)
}

const updateUserByIdAuth = (id,user,ctx) =>{
    return jwtAxios.put(`${prefixUrl}/api/user/${id}`,user,{context: ctx})
} 

const deleteUserByIdAuth = (id,ctx) => {
    return jwtAxios.delete(`${prefixUrl}/api/user/${id}`,{context: ctx})
}

//#endregion

const reportAuth = (reportUser,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/user/report`,reportUser,{context: ctx})
}

const search = (q,page = 0,size = 10) => {
    return axios.get(`${prefixUrl}/api/user/search?q=${q}&pageNumber=${page}&pageSize=${size}`)
}

const blockAuth = (blockUserId,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/user/block?blockUserId=${blockUserId}`,{},{context:ctx})
}

const banAuth = (banUser,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/user/ban`,banUser,{context:ctx})
}

const unbanAuth = (userId,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/user/unban?userId=${userId}`,{},{context:ctx})
}

const addWarningAuth = (warning,ctx) => {
    return jwtAxios.put(`${prefixUrl}/api/user/warning`,warning,{context:ctx})
}

const getWarningAuth = (userId,ctx) => {
    return jwtAxios.get(`${prefixUrl}/api/user/warning?userId=${userId}`,{context:ctx})
}
const getBlockUserListAuth = (userId,page = 0,size = 10) => {
    return jwtAxios.get(`${prefixUrl}/api/user/block/list/${userId}?pageNumber=${page}&pageSize=${size}`,{context:ctx})
}

const api = Object.freeze({
    getPageableAuth,
    getById,
    updateUserByIdAuth,
    deleteUserByIdAuth,
    reportAuth,
    search, 
    blockAuth,
    banAuth,
    unbanAuth,
    addWarningAuth,
    getWarningAuth,
    getBlockUserListAuth
 });

export default api
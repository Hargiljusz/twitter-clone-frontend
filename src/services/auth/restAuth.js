import axios from "axios"
const prefixUrl = "/rest"

const singIn = (body) => {
    return axios.post(`${prefixUrl}/api/auth/singIn`,body,{headers:{'Content-Type':'application/json'}})
}

const singUp = (body) => {
    return axios.post(`${prefixUrl}/api/auth/singUp`,body)
}

const logout = (jwt) => {
    return axios.delete(`${prefixUrl}/api/auth/logout`,{withCredentials: true,headers:{"Authorization":`Bearer ${jwt}`}})
}

const refresh = () => {
    return axios.get(`${prefixUrl}/api/auth/refresh`,{withCredentials: true})
}

const api = Object.freeze({
    singIn,
    singUp,
    logout,
    refresh
 });

export default api
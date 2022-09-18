import jwtAxios from "../../utils/jwtAxios"
import axios from "axios"
const prefixUrl = "/rest"

singIn = (body) => {
    return axios.post(`${prefixUrl}/api/auth/singIn`,body)
}

singUp = (body) => {
    return axios.post(`${prefixUrl}/api/auth/singUp`,body)
}

logout = () => {
    return axios.delete(`${prefixUrl}/api/auth/logout`,{withCredentials: true})
}

refresh = () => {
    return axios.get(`${prefixUrl}/api/auth/refresh`,{withCredentials: true})
}

const api = Object.freeze({
    singIn,
    singUp,
    logout,
    refresh
 });

export default api
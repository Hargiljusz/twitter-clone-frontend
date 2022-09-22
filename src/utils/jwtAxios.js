import axios from "axios";

const jwtAxios = axios.create()

// jwtAxios.defaults.baseURL = 'https://localhost:7069/'
// jwtAxios.defaults.headers = {"Access-Control-Allow-Origin": "*"} 

jwtAxios.interceptors.request.use(config =>{
    const {context} = config;
    config.headers.Authorization = 'Bearer '+context.user.jwt
    config.again = true
    config.withCredentials = true
    return config
},
 error =>{
     return Promise.reject(error)
 }
)


jwtAxios.interceptors.response.use(
    httpObject =>{
        return httpObject
    },
    error => {
        const originalRequest = error.config
        if(error.response && error.response.status === 401 && originalRequest.again){
            const {context} = originalRequest

            return axios.post('/rest/api/auth/refresh',{headers:{'Content-Type':'application/json'},withCredentials:true})
                        .then(r=>{
                            context.setJWT(r.data.jwt)
                            originalRequest.headers.Authorization ='Bearer '+r.data.jwt
                            originalRequest.again = false
                            return axios(originalRequest)
                        })
                        .catch(err=>{
                            if(err.response.status === 401){
                                context.logout()
                            }
                            return Promise.reject(err)
                        })
            
        }
        else{
            return Promise.reject(error);
        }
           
     

    }
)

export default jwtAxios;

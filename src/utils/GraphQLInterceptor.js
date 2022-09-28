import graphQLClient from "./graphQLClient";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"
import api from "../services/auth/graphqlAuth"

export default function useGraphQlInterceptor(){
    const context = useContext(AuthContext)
    const sendAuth = async(graphqlRequestCallback) => await send(context,graphqlRequestCallback)
    return {sendAuth}
}



const send = async (context,graphqlRequestCallback) =>{
    graphQLClient.setHeader('Authorization', `Bearer ${context.user.jwt}`)
     //request interceptor

    const result = await graphqlRequestCallback(graphQLClient)

    //response interceptor
    if(!Object.hasOwn(result,"errors")){
        return result
    }

    if(result.errors?.extensions?.code === "AUTH_NOT_AUTHENTICATED"){
        try{
            const {refreshToken} = await api.refresh();
            context.setJWT(refreshToken.jWT)
            graphQLClient.setHeader('Authorization', `Bearer ${context.user.jwt}`)
            const newResult = await graphqlRequestCallback(graphQLClient)
            return newResult
        }catch(err){
            context.logout()
            return Promise.reject(err)
        }

    }
    return result
}
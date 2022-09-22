import graphQLClient from "../utils/graphQLClient";
import { useContext } from "react";
import AuthContext,{BackendType} from "../context/AuthContext"
import api from "../services/auth/graphqlAuth"

export default async function useAuthResponseInterceptorGraphQL(graphqlRequest){
    const context = useContext(AuthContext)

    const result = await graphqlRequest()

    if(!Object.hasOwn(result,"errors")){
        return result
    }

    if(result.errors?.extensions?.code === "AUTH_NOT_AUTHENTICATED"){
        try{
            const {refreshToken} = await api.refresh();
            context.setJWT(refreshToken.jWT)
            graphQLClient.setHeader('Authorization', `Bearer ${context.user.jwt}`)
            const newResult = await graphqlRequest()
            return newResult
        }catch(err){
            context.logout()
            return Promise.reject(err)
        }

    }
    return result
}
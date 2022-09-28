import { useContext } from "react";
import {default as RestUserAPI} from "../services/user/restUser"
import {default as GraphQLUserAPI } from "../services/user/graphqlUser"
import AuthContext,{BackendType} from "../context/AuthContext"
import useGraphQlInterceptor from "../utils/GraphQLInterceptor"

const useUser = ()=>{
    const context = useContext(AuthContext)
    const {backendType} = context
    const {sendAuth} = useGraphQlInterceptor()


    const getById = (id,query) =>{
        if(backendType ===BackendType.RestAPI){
            return RestUserAPI.getById(id)
        }
        return GraphQLUserAPI.getById(query)
    }

    const getPageableAuth = async (page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.getPageableAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.getPageableAuth(query,gqlClient))
        return result
    }

    const updateUserByIdAuth = async (id,post = undefined,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.updateUserByIdAuth(id,post,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.updateUserByIdAuth(mutation,gqlClient))
        return result
    }
    
    const deleteUserByIdAuth = async (id,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.deleteUserByIdAuth(id,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.deleteUserByIdAuth(mutation,gqlClient))
        return result
    }

    const reportAuth = async (reportUser = undefined,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.reportAuth(reportUser,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.reportAuth(mutation,gqlClient))
        return result
    }

    const search = (q,page = 0,size = 10,queryResult = undefined) =>{
        if(backendType ===BackendType.RestAPI){
            return RestUserAPI.search(q,page,size)
        }
        return GraphQLUserAPI.search(q,page,size,queryResult)
    }

    const blockAuth = async (blockUserId,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.blockAuth(blockUserId,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.blockAuth(mutation,gqlClient))
        return result
    }

    const banAuth = async (banUser= undefined,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.banAuth(banUser,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.banAuth(mutation,gqlClient))
        return result
    }

    const unbanAuth = async (userId,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.unbanAuth(userId,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.unbanAuth(mutation,gqlClient))
        return result
    }

    const addWarningAuth = async (warning= undefined,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.addWarningAuth(warning,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.addWarningAuth(mutation,gqlClient))
        return result
    }
    
    const getWarningAuth = async (userId,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.getWarningAuth(userId,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.getWarningAuth(mutation,gqlClient))
        return result
    }

    const getBlockUserListAuth = async (userId,page = 0,size = 10,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestUserAPI.getBlockUserListAuth(userId,page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLUserAPI.getBlockUserListAuth(mutation,gqlClient))
        return result
    }
    
    return Object.freeze({
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
}

export default useUser
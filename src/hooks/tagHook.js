import { useContext } from "react";
import {default as RestTagAPI} from "../services/tag/restTag"
import {default as GraphQLTagAPI} from "../services/tag/graphqlTag"
import AuthContext,{BackendType} from "../context/AuthContext"
import useGraphQlInterceptor from "../utils/GraphQLInterceptor"

const useTags = ()=>{
    const context = useContext(AuthContext)
    const {backendType} = context
   
    const getTagByName = (name) =>{
        if(backendType ===BackendType.RestAPI){
            return RestTagAPI.getByName(name)
        }
        return GraphQLTagAPI.getTagByName(name)
    }

    const getTagById = (id) =>{
        if(backendType ===BackendType.RestAPI){
            return RestTagAPI.getById(id)
        }
        return GraphQLTagAPI.getTagById(id)
    }

    const getTags = (page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.getPaged(page,size)
        }

        return GraphQLTagAPI.getTags(query)
    }

    const search = (page,size,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.searchTag(page,size)
        }

        return GraphQLTagAPI.search(query)
    }

    const getPopularTags = (page,size) =>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.popular(page,size)
        }

        return GraphQLTagAPI.getPopularTags(query)
    }

    const getMyIgnoreTagsAuth = async (page = 0,size = 10,query = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.getIgnoreTagAuth(page,size,context)
        }
        const result = await useGraphQlInterceptor((gqlClient)=>GraphQLTagAPI.getMyIgnoreTagsAuth(query,gqlClient))
        return result
    }

    const addTagAuth = async (tag = undefined,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.addTagAuth(tag,context)
        }
        const result = await useGraphQlInterceptor((gqlClient)=> GraphQLTagAPI.addTagAuth(mutation,gqlClient))
        return result
    }

    const updateTagAuth = async(id,tag = undefined,mutation = undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.updateTagByIdAuth(id,tag,context)
        }
        
        const result = await useGraphQlInterceptor((gqlClient) => GraphQLTagAPI.updateTagAuth(mutation,gqlClient))
        return result
    }

    const deleteTagByIdAuth = async(id,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.deleteTagByIdAuth(id,context)
        }
        
        const result = await useGraphQlInterceptor((gqlClient) => GraphQLTagAPI.deleteTagByIdAuth(mutation,gqlClient))
        return result
    }

    const deleteTagByNameAuth = async(name,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.deleteTagByNameAuth(name,context)
        }
        
        const result = await useGraphQlInterceptor((gqlClient) => GraphQLTagAPI.deleteTagByNameAuth(mutation,gqlClient))
        return result
    }
    
    const ignoreTagAuth = async(tag = undefined,mutation = undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.addIgnoreTagAuth(tag,context)
        }
        
        const result = await useGraphQlInterceptor((gqlClient) => GraphQLTagAPI.ignoreTagAuth(mutation,gqlClient))
        return result 
    }

    const unignoreTagAuth = async(tag = undefined,mutation = undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestTagAPI.delteIgnoreTagAuth(tag,context)
        }
        
        const result = await useGraphQlInterceptor((gqlClient) => GraphQLTagAPI.unignoreTagAuth(mutation,gqlClient))
        return result 
    }


    return Object.freeze({
        getTagByName,
        getTagById,
        getTags,
        search,
        getPopularTags,
        getMyIgnoreTagsAuth,
        addTagAuth,
        updateTagAuth,
        deleteTagByIdAuth,
        deleteTagByNameAuth,
        ignoreTagAuth,
        unignoreTagAuth
     });
}

export default useTags
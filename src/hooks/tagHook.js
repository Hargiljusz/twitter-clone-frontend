import { useContext } from "react";
import graphQLClient from "../utils/graphQLClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {default as RestTagAPI} from "../services/tag/restTag"
import {default as GraphQLTagAPI} from "../services/tag/graphqlTag"
import AuthContext,{BackendType} from "../context/AuthContext"
import { gql } from 'graphql-request'
import {default as useResponseInterceptor }from "../utils/GraphQLResponWrapper"

const useTags = ()=>{
    const context = useContext(AuthContext)
   
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
        graphQLClient.setHeader('Authorization', `Bearer ${context.user.jwt}`)
        const request =()=> {
            return GraphQLTagAPI.getMyIgnoreTagsAuth(query,graphQLClient)
        }
        const result = await useResponseInterceptor(request)
        return result
    }



    return Object.freeze({
        getTagByName,
        getTagById,
        getTags,
        search,
        getPopularTags,
        getMyIgnoreTagsAuth
     });
}

export default useTags
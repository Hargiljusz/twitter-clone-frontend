import { useContext } from "react";
import {default as RestSharePostAPI} from "../services/sharePost/restSharePost"
import {default as GraphQLSharePostAPI} from "../services/sharePost/graphqlSharePost"
import AuthContext,{BackendType} from "../context/AuthContext"
import useGraphQlInterceptor from "../utils/GraphQLInterceptor"


const useSharePost = ()=>{
    const context = useContext(AuthContext)
    const {backendType} = context
    const {sendAuth} = useGraphQlInterceptor()
    
   
    const getSharePostByIdAuth = async(id) =>{
        if(backendType ===BackendType.RestAPI){
            return RestSharePostAPI.getByIdAuth(id,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLSharePostAPI.getSharePostByIdAuth(query,gqlClient))
        return result
    }

    const getSharePostsAuth = async(page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestSharePostAPI.getPageableAuth(page,size)
        }

        const result = await sendAuth((gqlClient)=>GraphQLSharePostAPI.getSharePostsAuth(query,gqlClient))
        return result
    }

    const getMySharePostsAuth = async (page,size,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestSharePostAPI.getMySharedPostsAuth(page,size,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLSharePostAPI.getMySharePostsAuth(query,gqlClient))
        return result
    }

    const getNumberOfShares = (postId) =>{
        if(backendType === BackendType.RestAPI){
            return RestSharePostAPI.getNumberOfShares(postId)
        }

        return GraphQLSharePostAPI.numberOfShares(postId)
    }

    const addSharePostAuth = async(sharePost = {
        postFor: "postId",
        sharedByUserId: "userId"
      },mutationResult=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestSharePostAPI.addSharePostAuth(sharePost,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLSharePostAPI.addSharePostAuth(sharePost,mutationResult,gqlClient))
        return result
    }

    const updateSharePostAuth = async(id,sharePost = undefined,query=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestSharePostAPI.updateSharePostByIdAuth(id,sharePost,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLSharePostAPI.updateSharePostAuth(query,gqlClient))
        return result
    }
    const deleteSharePostByIdAuth = async(id,query=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestSharePostAPI.deleteSharePostByIdAuth(id,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLSharePostAPI.deleteSharePostByIdAuth(query,gqlClient))
        return result
    }
    const deleteSharePostByUserIdAndPostIdAuth =  async(sharePost = {
        postFor: "postId",
        sharedByUserId: "userId"
      },mutationResult=undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestSharePostAPI.deleteSharePostByUserIdAndPostIdAuth(sharePost,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLSharePostAPI.deleteSharePostByUserIdAndPostIdAuth(sharePost,mutationResult,gqlClient))
        return result
    }


    return Object.freeze({
        getSharePostByIdAuth,
        getSharePostsAuth,
        getMySharePostsAuth,
        getNumberOfShares,
        addSharePostAuth,
        updateSharePostAuth,
        deleteSharePostByIdAuth,
        deleteSharePostByUserIdAndPostIdAuth
     });
}

export default useSharePost
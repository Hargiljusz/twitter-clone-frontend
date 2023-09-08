import { useContext } from "react";
import {default as RestLikeAPI} from "../services/like/restLike"
import {default as GraphQLLikeAPI} from "../services/like/graphqlLike"
import AuthContext,{BackendType} from "../context/AuthContext"
import useGraphQlInterceptor from "../utils/GraphQLInterceptor"


const useLike = ()=>{
    const context = useContext(AuthContext)
    const {backendType} = context
    const {sendAuth} = useGraphQlInterceptor()

    const getLikeByIdAuth = async(id) =>{
        if(backendType ===BackendType.RestAPI){
            return RestLikeAPI.getByIdAuth(id,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLLikeAPI.getLikeByIdAuth(query,gqlClient))
        return result
    }

    const getLikesAuth = async(page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestLikeAPI.getPageableAuth(page,size)
        }

        const result = await sendAuth((gqlClient)=>GraphQLLikeAPI.getLikesAuth(query,gqlClient))
        return result
    }

    const getMyLikesAuth = async (page,size,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestLikeAPI.getMyLikedPostsAuth(page,size,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLLikeAPI.getMyLikesAuth(query,gqlClient))
        return result
    }

    const getNumberOfShares = (postId) =>{
        if(backendType === BackendType.RestAPI){
            return RestLikeAPI.getNumberOfLikes(postId)
        }

        return GraphQLLikeAPI.numberOfLikes(postId)
    }

    const addLikeAuth = async(Like = {userId :"", postFor: ""},mutationResult=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestLikeAPI.addLikeAuth(Like,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLLikeAPI.addLikeAuth(Like.userId,Like.postFor,mutationResult,gqlClient))
        return result
    }

    const updateLikeAuth = async(id,Like = undefined,query=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestLikeAPI.updateLikeByIdAuth(id,Like,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLLikeAPI.updateLikeAuth(query,gqlClient))
        return result
    }
    const deleteLikeByIdAuth = async(id,query=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestLikeAPI.deleteLikeByIdAuth(id,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLLikeAPI.deleteLikeByIdAuth(query,gqlClient))
        return result
    }

    const deleteLikeByUserIdAndPostIdAuth = async(like = {userId :"", postFor: ""},mutationResult=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestLikeAPI.deleteLikeByUserIdAndPostIdAuth(like,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLLikeAPI.deleteLikeByUserIdAndPostIdAuth(like.userId,like.postFor,mutationResult,gqlClient))
        return result
    }


    return Object.freeze({
        getLikeByIdAuth,
        getLikesAuth,
        getMyLikesAuth,
        getNumberOfShares,
        addLikeAuth,
        updateLikeAuth,
        deleteLikeByIdAuth,
        deleteLikeByUserIdAndPostIdAuth
     });
}

export default useLike
import { useContext } from "react";
import {default as RestFollowAPI} from "../services/follow/restFollow"
import {default as GraphQLFollowAPI} from "../services/follow/graphqlFollow"
import AuthContext,{BackendType} from "../context/AuthContext"
import useGraphQlInterceptor from "../utils/GraphQLInterceptor"


const useFollow = ()=>{
    const context = useContext(AuthContext)
    const {backendType} = context
    const {sendAuth} = useGraphQlInterceptor()

    const getNumberOfFollowers = (userId) =>{
        if(backendType ===BackendType.RestAPI){
            return RestFollowAPI.getNumberOfFollowers(userId)
        }
        return GraphQLFollowAPI.getNumberOfFollowers(userId)
    }

    const getNumberOfFollowing = (userId) =>{
        if(backendType ===BackendType.RestAPI){
            return RestFollowAPI.getNumberOfFollowing(userId)
        }
        return GraphQLFollowAPI.getNumberOfFollowing(userId)
    }

    const getFollowPropositionAuth = async (page,size,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestFollowAPI.getFollowPropositionAuth(page,size,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLFollowAPI.getFollowPropositionAuth(query,gqlClient))
        return result
    }

    const getMyFollowersAuth = async(page,size,query= undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestFollowAPI.getMyFollowersAuth(page,size,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLFollowAPI.getMyFollowersAuth(query,gqlClient))
        return result
    }

    const getMyFollowingsAuth = async(page,size,query= undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestFollowAPI.getMyFollowingsAuth(page,size,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLFollowAPI.getMyFollowingsAuth(query,gqlClient))
        return result
    }

    const followAuth = async(followUserId,mutationResult=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestFollowAPI.followAuth(followUserId,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLFollowAPI.followAuth(followUserId,mutationResult,gqlClient))
        return result
    }

    const unfollowAuth = async(followUserId,mutationResult=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestFollowAPI.unfollow(followUserId,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLFollowAPI.unfollowAuth(followUserId,mutationResult,gqlClient))
        return result
    }

    const checkFollowAuth = async(checkUserId,queryResult=undefined)=>{
        if(backendType === BackendType.RestAPI){
            return RestFollowAPI.checkFollowAuth(checkUserId,context)
        }

        const result = await sendAuth((gqlClient)=>GraphQLFollowAPI.checkFollowAuth(checkUserId,queryResult,gqlClient))
        return result
    }


    return Object.freeze({
        getNumberOfFollowers,
        getNumberOfFollowing,
        getFollowPropositionAuth,
        getMyFollowersAuth,
        getMyFollowingsAuth,
        followAuth,
        unfollowAuth,
        checkFollowAuth
     });
}

export default useFollow
import { useContext } from "react";
import {default as RestPostAPI} from "../services/post/restPost"
import {default as GraphQLPostAPI} from "../services/post/graphqlPost"
import AuthContext,{BackendType} from "../context/AuthContext"
import useGraphQlInterceptor from "../utils/GraphQLInterceptor"

const usePost = ()=>{
    const context = useContext(AuthContext)
    const {backendType} = context
    const {sendAuth} = useGraphQlInterceptor()


    const getById = (id,query) =>{
        if(backendType ===BackendType.RestAPI){
            return RestPostAPI.getById(id)
        }
        return GraphQLPostAPI.getById(query)
    }

    const getPageable = (page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.getPageable(page,size)
        }

        return GraphQLPostAPI.getPageable(query)
    }

    const addPostAuth = async ({contetnt,createByUserId,postFor},files,mutationResult = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.addPostAuth({contetnt,createByUserId,postFor},files,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.addPostAuth({contetnt,createByUserId,postFor},mutationResult,gqlClient))
        return result
    }

    const updatePostByIdAuth = async (id,post = undefined,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.updatePostByIdAuth(id,post,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.updatePostByIdAuth(mutation,gqlClient))
        return result
    }
    
    const deletePostByIdAuth = async (id,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.deletePostByIdAuth(id,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.deletePostByIdAuth(mutation,gqlClient))
        return result
    }

    const ignoreAllPostsAuth = async (ignoreUserId,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.ignoreAllPostsAuth(ignoreUserId,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.ignoreAllPostsAuth(mutation,gqlClient))
        return result
    }

    const ignorePostsAuth = async (postId,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.ignorePostsAuth(postId,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.ignorePostsAuth(mutation,gqlClient))
        return result
    }

    const repostAuth = async (postId,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.repostAuth(postId,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.repostAuth(mutation,gqlClient))
        return result
    }

    const feedAuth = async (page = 0,size = 10,queryResult = "") =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.feedAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.feedAuth(page,size,queryResult,gqlClient))
        return result
    }

    const likedPostsAuth = async (page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.likedPostsAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.likedPostsAuth(query,gqlClient))
        return result
    }

    const sharedPostsAuth = async (page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.sharedPostsAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.sharedPostsAuth(query,gqlClient))
        return result
    }
    
    const myPostsAuth = async (page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.myPostsAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.myPostsAuth(query,gqlClient))
        return result
    }

    const subpostsForUser = (userId,page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.subpostsForUser(userId,page,size)
        }

        return GraphQLPostAPI.subpostsForUser(query)
    }

    const subpostsForPost = (postId,page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.subpostsForPost(postId,page,size)
        }

        return GraphQLPostAPI.subpostsForPost(query)
    }

    const newestPosts = (tag,page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.newestPosts(tag,page,size)
        }

        return GraphQLPostAPI.newestPosts(query)
    }

    const popularPosts = (tag,page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.popularPosts(tag,page,size)
        }

        return GraphQLPostAPI.popularPosts(query)
    }

    const getPostByUserId = (userId,page = 0,size = 10,query= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.getPostByUserId(userId,page,size)
        }

        throw new Error("Not Implemented")
    }
    
    return Object.freeze({
        getPageable,
        getById,
        addPostAuth,
        updatePostByIdAuth,
        deletePostByIdAuth,
        ignoreAllPostsAuth,
        ignorePostsAuth,
        repostAuth,
        feedAuth,
        likedPostsAuth,
        sharedPostsAuth,
        myPostsAuth,
        subpostsForUser,
        subpostsForPost,
        newestPosts,
        popularPosts,
        getPostByUserId
     });
}

export default usePost
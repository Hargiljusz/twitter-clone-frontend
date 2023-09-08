import { useContext } from "react";
import {default as RestPostAPI} from "../services/post/restPost"
import {default as GraphQLPostAPI} from "../services/post/graphqlPost"
import AuthContext,{BackendType} from "../context/AuthContext"
import useGraphQlInterceptor from "../utils/GraphQLInterceptor"

const usePost = ()=>{
    const context = useContext(AuthContext)
    const {backendType} = context
    const {sendAuth} = useGraphQlInterceptor()


    const getByIdAuth = (id,queryResult) =>{
        let isLogged = context.userStatus.isLogged
        if(backendType ===BackendType.RestAPI){
            return isLogged ? RestPostAPI.getByIdAuth(id,context): RestPostAPI.getById(id,context) 
        }
        return !isLogged ? GraphQLPostAPI.getById(id,queryResult): sendAuth((gqlClient)=>GraphQLPostAPI.getByIdAuth(id,queryResult,gqlClient))
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
        if(files.length === 0){
            const result = await sendAuth((gqlClient)=>GraphQLPostAPI.addPostAuth({contetnt,createByUserId,postFor},mutationResult,gqlClient))
            return result
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.addPostAuthWithFile({contetnt,createByUserId,postFor},files,mutationResult,gqlClient))
        return result
    }

    const updatePostByIdAuth = async (id,post = undefined,mutation = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.updatePostByIdAuth(id,post,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.updatePostByIdAuth(mutation,gqlClient))
        return result
    }
    
    const deletePostByIdAuth = async (id,mutationResult = undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.deletePostByIdAuth(id,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.deletePostByIdAuth(id,mutationResult,gqlClient))
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

    const likedPostsAuth = async (page = 0,size = 10,queryResult= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.likedPostsAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.likedPostsAuth(page,size,queryResult,gqlClient))
        return result
    }

    const sharedPostsAuth = async (page = 0,size = 10,queryResult= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.sharedPostsAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.sharedPostsAuth(page,size,queryResult,gqlClient))
        return result
    }
    
    const myPostsAuth = async (page = 0,size = 10,queryResult= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.myPostsAuth(page,size,context)
        }
        const result = await sendAuth((gqlClient)=>GraphQLPostAPI.myPostsAuth(page,size,queryResult,gqlClient))
        return result
    }

    const subpostsForUser = (userId,page = 0,size = 10,queryResult= undefined) =>{
        if(backendType === BackendType.RestAPI){
            return RestPostAPI.subpostsForUser(userId,page,size)
        }

        return GraphQLPostAPI.subpostsForUser(userId,page,size,queryResult)
    }

    const subpostsForPost = (postId,page = 0,size = 10,queryResult= undefined) =>{
        let isLogged = context.userStatus.isLogged
        if(backendType === BackendType.RestAPI){
            return isLogged ? RestPostAPI.subpostsForPostAuth(postId,page,size,context): RestPostAPI.subpostsForPost(postId,page,size) 
        }

        return !isLogged ? GraphQLPostAPI.subpostsForPost(postId,page,size,queryResult): sendAuth((gqlClient)=>GraphQLPostAPI.subpostsForPostAuth(postId,page,size,queryResult,gqlClient))
    }

    const newestPosts = (tag,page = 0,size = 10,queryResult= undefined) =>{
        let isLogged = context.userStatus.isLogged
        if(backendType === BackendType.RestAPI){
            return !isLogged ? RestPostAPI.newestPosts(tag,page,size) : RestPostAPI.newestPostsAuth(tag,page,size,context)
        }

        return !isLogged ?  GraphQLPostAPI.newestPosts(tag,page,size,queryResult): sendAuth((gqlClient)=>GraphQLPostAPI.newestPostsAuth(tag,page,size,queryResult,gqlClient))
    }

    const popularPosts = (tag,page = 0,size = 10,queryResult= undefined) =>{
        let isLogged = context.userStatus.isLogged
        if(backendType === BackendType.RestAPI){
            return !isLogged ? RestPostAPI.popularPosts(tag,page,size) : RestPostAPI.popularPostsAuth(tag,page,size,context)
        }

        return !isLogged ? GraphQLPostAPI.popularPosts(tag,page,size,queryResult) : sendAuth((gqlClient)=>GraphQLPostAPI.popularPostsAuth(tag,page,size,queryResult,gqlClient))
    }

    const getPostByUserId = (userId,page = 0,size = 10,queryResult= undefined) =>{
        let isLogged = context.userStatus.isLogged
        if(backendType === BackendType.RestAPI){
            return  !isLogged ? RestPostAPI.getPostByUserId(userId,page,size): RestPostAPI.getPostByUserIdAuth(userId,page,size,context)
        }

        return !isLogged ? GraphQLPostAPI.getPostByUserId(userId,page,size,queryResult) : sendAuth((gqlClient)=>GraphQLPostAPI.getPostByUserIdAuth(userId,page,size,queryResult,gqlClient)) 
    }
    
    return Object.freeze({
        getPageable,
        getByIdAuth,
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
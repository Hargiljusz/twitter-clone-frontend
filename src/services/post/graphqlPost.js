const prefixUrl = "/graphql"
import { request } from 'graphql-request'

//#region CRUD
const getPageable = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}

const getById = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}

const addPostAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const updatePostByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const deletePostByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

//#endregion

const ignoreAllPostsAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const ignorePostsAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const repostAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const feedAuth = (query,graphQLClient) =>{
    return graphQLClient.request(query)
} 

const likedPostsAuth = (query,graphQLClient) =>{
    return graphQLClient.request(query)
} 

const sharedPostsAuth = (query,graphQLClient) =>{
    return graphQLClient.request(query)
} 

const myPostsAuth = (query,graphQLClient) =>{
    return graphQLClient.request(query)
} 

const subpostsForUser = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}

const subpostsForPost = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}
const newestPosts = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}
const popularPosts = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}

const api = Object.freeze({
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
    popularPosts
 });

export default api
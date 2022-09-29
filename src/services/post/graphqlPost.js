const prefixUrl = "/graphql"
import { request,gql } from 'graphql-request'

//#region CRUD
const getPageable = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}

const getById = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}

const addPostAuth = ({contetnt,createByUserId,postFor},mutationResult,graphQLClient) =>{
    const mutation = gql`
        mutation {addPost(input: {contetnt:"${contetnt}",createByUserId:"${createByUserId}",postFor:"${postFor}"}) {
          ${mutationResult}
        }}
      `
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

const feedAuth = (page,size,queryResult,graphQLClient) =>{
    const query = gql`
    {
        feed(size: ${size}, page: ${page}) {
          ${queryResult}
        }
    }`
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
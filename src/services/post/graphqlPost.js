const prefixUrl = "/graphql"
import { request,gql } from 'graphql-request'

//#region CRUD
const getPageable = (query) => {
    return request(`${prefixUrl}/graphql`,query)
}

const getById = (id,queryResult) => {
    const query = gql`
    {
        data:post (postId: "${id}") {
          ${queryResult}
        }
    }`
    return request(`${prefixUrl}/graphql`,query) 
}

const getByIdAuth = (id,queryResult,graphQLClient) => {
    const query = gql`
    {
        data:post (postId: "${id}") {
          ${queryResult}
        }
    }`
    return graphQLClient.request(query)
}

const addPostAuth = ({contetnt,createByUserId,postFor},mutationResult,graphQLClient) =>{
    const mutation = gql`
        mutation {addPost(input: {contetnt:"${contetnt}",createByUserId:"${createByUserId}",postFor:"${postFor}"}) {
          ${mutationResult}
        }}
      `
    return graphQLClient.request(mutation)
} 

const addPostAuthWithFile = ({contetnt,createByUserId,postFor},files,mutationResult,graphQLClient) =>{
    const mutation = gql`
        mutation ($files: [Upload!]) {addPostWithFile(input: {postCreate:{contetnt:"${contetnt}",createByUserId:"${createByUserId}",postFor:"${postFor}"},files:$files }) {
            postDTO {
                ${mutationResult}
              }
        }}
      `
    return graphQLClient.request(mutation,{files:files,})
}

const updatePostByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const deletePostByIdAuth = (postId,mutationResult,graphQLClient) =>{
    const mutation = gql`
    mutation{
        deletePost(postId:"${postId}" ) {
          ${mutationResult}
        }
      }`
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

const likedPostsAuth = (page = 0,size = 10,queryResult= undefined,graphQLClient) =>{
    const query = gql`
        query{myLikedPosts (page: ${page},size: ${size}){
            ${queryResult}
        }}`
    return graphQLClient.request(query)
} 

const sharedPostsAuth = (page = 0,size = 10,queryResult,graphQLClient) =>{
    const query = gql`
        query{data:mySharedPosts (page: ${page},size: ${size}){
            ${queryResult}
        }}`
    return graphQLClient.request(query)
} 

const myPostsAuth = (page = 0,size = 10,queryResult,graphQLClient) =>{
    const query = gql`
       query {data:myPosts(page: ${page},size: ${size}){
            ${queryResult}
        }}`
    return graphQLClient.request(query)
} 

const subpostsForUser = (userId,page = 0,size = 10,queryResult= undefined) => {
    const query = gql`
    query{
        data:subPostForUser(userId: "${userId}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return request(`${prefixUrl}/graphql`,query)
}
const subpostsForUserAuth = (userId,page = 0,size = 10,queryResult= undefined.graphQLClient) => {
    const query = gql`
    query{
        data:subPostForUser(userId: "${userId}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return graphQLClient.request(query)
}

const subpostsForPost = (postId,page = 0,size = 10,queryResult= undefined) => {
    const query = gql`
    query{
        data:subpostForPost(postId: "${postId}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return request(`${prefixUrl}/graphql`,query)
}
const subpostsForPostAuth = (postId,page = 0,size = 10,queryResult= undefined,graphQLClient) => {
    const query = gql`
    query{
        data:subpostForPost(postId: "${postId}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return graphQLClient.request(query)
}

const newestPosts = (tag,page = 0,size = 10,queryResult = undefined) => {
    const query = gql`
    {
        newestPostByTag(tag: "${tag}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return request(`${prefixUrl}/graphql`,query)
}
const newestPostsAuth = (tag,page = 0,size = 10,queryResult = undefined,gqlClient) => {
    const query = gql`
    {
        newestPostByTag(tag: "${tag}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return gqlClient.request(query)
}

const popularPosts = (tag,page = 0,size = 10,queryResult = undefined) => {
    const query = gql`
    {
        popularPostByTag(tag: "${tag}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return request(`${prefixUrl}/graphql`,query)
}
const popularPostsAuth = (tag,page = 0,size = 10,queryResult = undefined,gqlClient) => {
    const query = gql`
    {
        popularPostByTag(tag: "${tag}",page: ${page},size: ${size}) {
          ${queryResult}
        }
    }`
    return gqlClient.request(query)
}

const getPostByUserId = (userId,page = 0,size = 10,queryResult= undefined) =>{
    const query = gql`
    query{
        data:postByUserId(userId: "${userId}",pageSize: ${size},pageNumber: ${page})  {
          ${queryResult}
        }
    }`
    return request(`${prefixUrl}/graphql`,query)
} 

const getPostByUserIdAuth = (userId,page = 0,size = 10,queryResult= undefined,gqlClient) =>{
    const query = gql`
    query{
        data:postByUserId(userId: "${userId}",pageSize: ${size},pageNumber: ${page})  {
          ${queryResult}
        }
    }`
    return gqlClient.request(query)
} 
const api = Object.freeze({
    getPageable,
    getById,
    getByIdAuth,
    addPostAuth,
    addPostAuthWithFile,
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
    subpostsForPostAuth,
    newestPosts,
    newestPostsAuth,
    popularPosts,
    popularPostsAuth,
    getPostByUserId,
    getPostByUserIdAuth,
    subpostsForUserAuth
 });

export default api
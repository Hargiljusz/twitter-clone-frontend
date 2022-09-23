const prefixUrl = "/graphql"
import { request,gql } from 'graphql-request'

//#region query
const getSharePostByIdAuth=(query,graphQLClient)=>{
    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}

const getSharePostsAuth=(query,graphQLClient) =>{
    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}

const numberOfShares=(postId) =>{
    const query = gql`
    query{
        numberOfShares(postId: "${postId}")
      }`

    return request(`${prefixUrl}/graphql`,query)
}

const getMySharePostsAuth = (query,graphQLClient)=>{
    return graphQLClient.request(query)
}

//#endregion

//#region mutations
const addSharePostAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}


const updateSharePostAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}

const deleteSharePostByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}


//#endregion

const api = Object.freeze({
    getMySharePostsAuth,
    getSharePostByIdAuth,
    getSharePostsAuth,
    addSharePostAuth,
    updateSharePostAuth,
    deleteSharePostByIdAuth,
    numberOfShares
 });
 export default api
const prefixUrl = "/graphql"
import { request,gql } from 'graphql-request'

//#region query
const getLikeByIdAuth=(query,graphQLClient)=>{
    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}

const getLikesAuth=(query,graphQLClient) =>{
    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}

const numberOfLikes=(postId) =>{
    const query = gql`
    query{
        numberOfLikes(postId: "${postId}")
      }`

    return request(`${prefixUrl}/graphql`,query)
}

const getMyLikesAuth = (query,graphQLClient)=>{
    return graphQLClient.request(query)
}

//#endregion

//#region mutations
const addLikeAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}


const updateLikeAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}

const deleteLikeByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}


//#endregion

const api = Object.freeze({
    getLikeByIdAuth,
    getLikesAuth,
    numberOfLikes,
    getMyLikesAuth,
    addLikeAuth,
    updateLikeAuth,
    deleteLikeByIdAuth
 });
 export default api
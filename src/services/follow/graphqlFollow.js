const prefixUrl = "/graphql"
import { request,gql } from 'graphql-request'

//#region query
const getNumberOfFollowers=(userId) =>{
    const query = gql`
    query{
        followersNumber(userId: "${userId}")
      }`

    return request(`${prefixUrl}/graphql`,query)
}

const getNumberOfFollowing=(userId) =>{
    const query = gql`
    query{
        followingNumber(userId: "${userId}")
      }`

    return request(`${prefixUrl}/graphql`,query)
}


const getFollowPropositionAuth=(query,graphQLClient) =>{
    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}

const getMyFollowersAuth=(query,graphQLClient) =>{
    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}

const getMyFollowingsAuth=(query,graphQLClient) =>{
    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}
//#endregion

//#region mutations
const followAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}

const unfollowAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}



//#endregion

const api = Object.freeze({
    getNumberOfFollowers,
    getNumberOfFollowing,
    getFollowPropositionAuth,
    getMyFollowersAuth,
    getMyFollowingsAuth,
    followAuth,
    unfollowAuth
 });
 export default api
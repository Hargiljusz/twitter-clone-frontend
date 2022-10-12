const prefixUrl = "/graphql"
import { request,gql } from 'graphql-request'

//#region query
const getNumberOfFollowers=(userId) =>{
    const query = gql`
    query{
        data:followersNumber(userId: "${userId}")
      }`

    return request(`${prefixUrl}/graphql`,query)
}

const getNumberOfFollowing=(userId) =>{
    const query = gql`
    query{
      data:followingNumber(userId: "${userId}")
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

const checkFollowAuth = (checkUserId,queryResult=undefined,graphQLClient)=>{
    const query = gql`
    query{
        data:checkFollow(checkUserId: "${checkUserId}"){
            ${queryResult}
        }
      }`

    return graphQLClient.request(`${prefixUrl}/graphql`,query)
}
//#endregion

//#region mutations
const followAuth = (followUserId,mutationResult=undefined,graphQLClient) =>{
    const mutation = gql`
    mutation{
        follow(input: {followUserId: "${followUserId}"}) {
          follow {
            ${mutationResult}
          }
        }
      }`
    return graphQLClient.request(mutation)
}

const unfollowAuth = (followUserId,mutationResult=undefined,graphQLClient) =>{
  const mutation = gql`
  mutation{
    unfollow(input: {followUserId:"${followUserId}}) {
      follow {
        ${mutationResult}
      }
    }
  }`
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
    unfollowAuth,
    checkFollowAuth
 });
 export default api
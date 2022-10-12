const prefixUrl = "/graphql"
import { request,gql } from 'graphql-request'

//#region RUD
const getPageableAuth = (query,graphQLClient) =>{
    return graphQLClient.request(query)
} 
const getById = (id,queryResult) => {
    const query = gql`
    query{data:user (id: "${id}"){
        ${queryResult}
      }
    }`
    return request(`${prefixUrl}/graphql`,query)
}

const updateUserByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const deleteUserByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

//#endregion

const reportAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const search = (q,page,size,queryResult) => {
    const query = gql`{searchUsers(q: "${q}",page: ${page},size: ${size}) {
        ${queryResult}
      }}`
    return request(`${prefixUrl}/graphql`,query)
}

const blockAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const banAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const unbanAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const addWarningAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const getWarningAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const getBlockUserListAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
} 

const api = Object.freeze({
    getPageableAuth,
    getById,
    updateUserByIdAuth,
    deleteUserByIdAuth,
    reportAuth,
    search, 
    blockAuth,
    banAuth,
    unbanAuth,
    addWarningAuth,
    getWarningAuth,
    getBlockUserListAuth
 });

export default api
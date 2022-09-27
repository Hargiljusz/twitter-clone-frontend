const prefixUrl = "/graphql"
import {  gql,request } from 'graphql-request'

//#region query
const getTagByName=(name)=>{
    const query = gql`
    query{
        tagByName(name: "${name}") {
            name,
            id,
            createdAt
        }
      }
    `
   return request(`${prefixUrl}/graphql`,query)
}

const getTagById=(id)=>{
    const query = gql`
    query{
        tagById(id: "${id}") {
            name,
            id,
            createdAt
        }
      }
    `
    return request(`${prefixUrl}/graphql`,query)
}

const getTags=(query) =>{
    return request(`${prefixUrl}/graphql`,query)
}

const search=(tag,page=0,size=20,resultQuery = ``) =>{
    const query = gql`{search(q: "${tag}",page: ${page},size: ${size}) {
        ${resultQuery}
      }}`
    return request(`${prefixUrl}/graphql`,query)
}

const getPopularTags=(query) =>{
    return request(`${prefixUrl}/graphql`,query)
}

const getMyIgnoreTagsAuth = (query,graphQLClient)=>{
    return graphQLClient.request(query)
}
//#endregion

//#region mutations
const addTagAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}


const updateTagAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}

const deleteTagByIdAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}

const deleteTagByNameAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}

const ignoreTagAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}

const unignoreTagAuth = (mutation,graphQLClient) =>{
    return graphQLClient.request(mutation)
}
//#endregion

const api = Object.freeze({
    getTagById,
    getTagByName,
    getTags,
    search,
    getPopularTags,
    getMyIgnoreTagsAuth,
    addTagAuth,
    updateTagAuth,
    deleteTagByIdAuth,
    deleteTagByNameAuth,
    ignoreTagAuth,
    unignoreTagAuth
 });
 export default api
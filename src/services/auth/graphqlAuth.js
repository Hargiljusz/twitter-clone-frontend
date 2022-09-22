const prefixUrl = "/graphql"
import { GraphQLClient, gql,request, } from 'graphql-request'


const singIn = (email,password) => {
const mutation = gql`
mutation{
    login(input:{email:"${email}",password:"${password}"}) {
        userId,jWT,email,roles,creationTime
    }
  }
`

return request(`${prefixUrl}/graphql`,mutation)
}

const singUp = (body) => {
    
}

const logout = () => {
    const mutation = gql`
    mutation{
        logout {
          statusResult
        }
      }`
      return request(`${prefixUrl}/graphql`,mutation)
}

const refresh = () => {
 const mutation = gql`
 mutation{
    refreshToken {
        jWT,email,roles,userId,creationTime
    }
  }`
  return request(`${prefixUrl}/graphql`,mutation)
}

const graphql = Object.freeze({
    singIn,
    singUp,
    logout,
    refresh
 });

export default graphql
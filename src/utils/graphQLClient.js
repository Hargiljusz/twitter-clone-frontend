import { GraphQLClient } from 'graphql-request'
const prefixUrl = "/graphql"
const graphQLClient = new GraphQLClient(`${prefixUrl}/graphql`)

export default graphQLClient;
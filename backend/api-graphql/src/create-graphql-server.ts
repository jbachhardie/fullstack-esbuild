import { ApolloServer } from 'apollo-server'
import { resolvers } from './resolvers'
import { IContext } from './context'
import { typeDefs } from './schema'

export async function createGraphQLServer(context: () => IContext) {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })
}

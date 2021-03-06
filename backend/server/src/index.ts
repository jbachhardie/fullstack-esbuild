import { createGraphQLServer, IContext } from '@backend/api-graphql'
import { GitHubRESTUserService } from '@backend/data-sources'

function createContext(): IContext {
  return {
    services: {
      user: new GitHubRESTUserService(),
    },
  }
}

;(async () => {
  const server = await createGraphQLServer(createContext)

  const { url } = await server.listen({
    port: process.env['NODE_ENV'] === 'production' ? 80 : 4000,
  })

  console.log(`Server ready at ${url}`)
})()

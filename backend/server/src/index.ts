import { createGraphQLServer, IContext } from '@backend/api-graphql'
import { GitHubRESTSearchService } from '@backend/data-sources'

function createContext(): IContext {
  return {
    services: {
      search: new GitHubRESTSearchService(),
    },
  }
}

;(async () => {
  const server = await createGraphQLServer(createContext)

  const { url } = await server.listen()

  console.log(`Server ready at ${url}`)
})()

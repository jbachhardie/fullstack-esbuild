import { IContext } from './context'
import { IResolvers } from './generated-resolver-types'

export const resolvers: IResolvers<IContext> = {
  Query: {
    async searchUsers(_parent, args, context) {
      return await context.services.search.searchUsers(args.query, args.page)
    },
  },
}

import { IContext } from './context'
import { IResolvers } from './generated-resolver-types'

export const resolvers: IResolvers<IContext> = {
  Query: {
    async searchUsers(_parent, args, context) {
      return await context.services.user.findUsers(args.query, args.page)
    },
  },
  UserResult: {
    async user(parent, _args, context) {
      return await context.services.user.fetchUser(parent.userId)
    },
  },
}

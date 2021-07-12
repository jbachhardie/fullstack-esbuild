import { User, UserSearchPage } from '@backend/domain'

export abstract class UserService {
  abstract findUsers(query: string, page: number): Promise<UserSearchPage>
  abstract fetchUser(id: string): Promise<User>
}

import { UserSearchPage } from '@backend/domain'

export abstract class SearchService {
  abstract searchUsers(query: string, page: number): Promise<UserSearchPage>
}

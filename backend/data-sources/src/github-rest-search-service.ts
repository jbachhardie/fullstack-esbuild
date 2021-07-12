import { SearchService } from '@backend/services'
import { UserSearchPage } from '../../domain/src'

export class GitHubRESTSearchService extends SearchService {
  searchUsers(query: string, page: number): Promise<UserSearchPage> {
    throw new Error('Method not implemented.')
  }
}

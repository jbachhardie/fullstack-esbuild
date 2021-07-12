import { IUserSearchPage } from './generated-interfaces'
import { UserResult } from './user-result'

export class UserSearchPage implements IUserSearchPage {
  constructor(
    public resultsCount: number,
    public resultsAreIncomplete: boolean,
    public results: readonly UserResult[]
  ) {}
}

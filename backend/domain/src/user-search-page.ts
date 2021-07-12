import { IUserSearchPage } from './generated-interfaces'
import { User } from './user'

export class UserSearchPage implements IUserSearchPage {
  constructor(
    public resultsCount: number,
    public resultsAreIncomplete: boolean,
    public results: readonly User[]
  ) {}
}

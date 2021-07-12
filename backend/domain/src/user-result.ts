import { IUserResult } from './generated-interfaces'
import { TextMatch } from './text-match'

export class UserResult implements IUserResult {
  constructor(
    public readonly userId: string,
    public readonly textMatches: readonly TextMatch[]
  ) {}
}

import { IUser, Maybe } from './generated-interfaces'

export class User implements IUser {
  constructor(
    public readonly id: string,
    public readonly avatarUrl: string,
    public readonly url: string,
    public readonly publicRepos: number,
    public readonly publicGists: number,
    public readonly followers: number,
    public readonly following: number,
    public readonly name: Maybe<string>,
    public readonly blog: Maybe<string>,
    public readonly company: Maybe<string>,
    public readonly email: Maybe<string>,
    public readonly location: Maybe<string>
  ) {}
}

import { IUser, Maybe } from './generated-interfaces'
import { TextMatch } from './text-match'

export class User implements IUser {
  constructor(
    public readonly login: string,
    public readonly id: number,
    public readonly nodeId: string,
    public readonly avatarUrl: string,
    public readonly gravatarId: Maybe<string>,
    public readonly url: string,
    public readonly htmlUrl: string,
    public readonly followersUrl: string,
    public readonly subscriptionsUrl: string,
    public readonly organizationsUrl: string,
    public readonly reposUrl: string,
    public readonly receivedEventsUrl: string,
    public readonly type: string,
    public readonly score: number,
    public readonly followingUrl: string,
    public readonly gistsUrl: string,
    public readonly starredUrl: string,
    public readonly eventsUrl: string,
    public readonly publicRepos: number,
    public readonly publicGists: number,
    public readonly followers: number,
    public readonly following: number,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly name: Maybe<string>,
    public readonly bio: Maybe<string>,
    public readonly email: Maybe<string>,
    public readonly location: Maybe<string>,
    public readonly siteAdmin: boolean,
    public readonly hireable: Maybe<boolean>,
    public readonly textMatches: readonly TextMatch[],
    public readonly blog: Maybe<string>,
    public readonly company: Maybe<string>,
    public readonly suspendedAt: Maybe<string>
  ) {}
}

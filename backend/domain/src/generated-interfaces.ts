export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IQuery = {
  readonly __typename?: 'Query';
  readonly searchUsers?: Maybe<IUserSearchPage>;
};


export type IQuerySearchUsersArgs = {
  query: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
};

export type ITextMatch = {
  readonly __typename?: 'TextMatch';
  readonly property: Scalars['String'];
  readonly fragment: Scalars['String'];
};

export type IUser = {
  readonly __typename?: 'User';
  readonly login: Scalars['String'];
  readonly id: Scalars['Int'];
  readonly nodeId: Scalars['String'];
  readonly avatarUrl: Scalars['String'];
  readonly gravatarId?: Maybe<Scalars['String']>;
  readonly url: Scalars['String'];
  readonly htmlUrl: Scalars['String'];
  readonly followersUrl: Scalars['String'];
  readonly subscriptionsUrl: Scalars['String'];
  readonly organizationsUrl: Scalars['String'];
  readonly reposUrl: Scalars['String'];
  readonly receivedEventsUrl: Scalars['String'];
  readonly type: Scalars['String'];
  readonly score: Scalars['Int'];
  readonly followingUrl: Scalars['String'];
  readonly gistsUrl: Scalars['String'];
  readonly starredUrl: Scalars['String'];
  readonly eventsUrl: Scalars['String'];
  readonly publicRepos: Scalars['Int'];
  readonly publicGists: Scalars['Int'];
  readonly followers: Scalars['Int'];
  readonly following: Scalars['Int'];
  readonly createdAt: Scalars['String'];
  readonly updatedAt: Scalars['String'];
  readonly name?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly location?: Maybe<Scalars['String']>;
  readonly siteAdmin: Scalars['Boolean'];
  readonly hireable?: Maybe<Scalars['Boolean']>;
  readonly textMatches: ReadonlyArray<ITextMatch>;
  readonly blog?: Maybe<Scalars['String']>;
  readonly company?: Maybe<Scalars['String']>;
  readonly suspendedAt?: Maybe<Scalars['String']>;
};

export type IUserSearchPage = {
  readonly __typename?: 'UserSearchPage';
  readonly resultsCount: Scalars['Int'];
  readonly resultsAreIncomplete: Scalars['Boolean'];
  readonly results: ReadonlyArray<IUser>;
};

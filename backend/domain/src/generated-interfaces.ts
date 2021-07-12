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
  readonly id: Scalars['ID'];
  readonly avatarUrl: Scalars['String'];
  readonly url: Scalars['String'];
  readonly publicRepos: Scalars['Int'];
  readonly publicGists: Scalars['Int'];
  readonly followers: Scalars['Int'];
  readonly following: Scalars['Int'];
  readonly name?: Maybe<Scalars['String']>;
  readonly blog?: Maybe<Scalars['String']>;
  readonly company?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly location?: Maybe<Scalars['String']>;
};

export type IUserResult = {
  readonly __typename?: 'UserResult';
  readonly textMatches: ReadonlyArray<ITextMatch>;
  readonly userId: Scalars['ID'];
  readonly user?: Maybe<IUser>;
};

export type IUserSearchPage = {
  readonly __typename?: 'UserSearchPage';
  readonly resultsCount: Scalars['Int'];
  readonly resultsAreIncomplete: Scalars['Boolean'];
  readonly results: ReadonlyArray<IUserResult>;
};

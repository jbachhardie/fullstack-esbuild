import { GraphQLResolveInfo } from 'graphql';
import { IContext } from './context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  TextMatch: ResolverTypeWrapper<ITextMatch>;
  User: ResolverTypeWrapper<IUser>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UserSearchPage: ResolverTypeWrapper<IUserSearchPage>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  TextMatch: ITextMatch;
  User: IUser;
  Boolean: Scalars['Boolean'];
  UserSearchPage: IUserSearchPage;
};

export type IQueryResolvers<ContextType = IContext, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  searchUsers?: Resolver<Maybe<IResolversTypes['UserSearchPage']>, ParentType, ContextType, RequireFields<IQuerySearchUsersArgs, 'query' | 'page'>>;
};

export type ITextMatchResolvers<ContextType = IContext, ParentType extends IResolversParentTypes['TextMatch'] = IResolversParentTypes['TextMatch']> = {
  property?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  fragment?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserResolvers<ContextType = IContext, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  login?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  nodeId?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  avatarUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  gravatarId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  htmlUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  followersUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  subscriptionsUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  organizationsUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  reposUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  receivedEventsUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  followingUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  gistsUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  starredUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  eventsUrl?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  publicRepos?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  publicGists?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  followers?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  following?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  siteAdmin?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  hireable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>;
  textMatches?: Resolver<ReadonlyArray<IResolversTypes['TextMatch']>, ParentType, ContextType>;
  blog?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  suspendedAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserSearchPageResolvers<ContextType = IContext, ParentType extends IResolversParentTypes['UserSearchPage'] = IResolversParentTypes['UserSearchPage']> = {
  resultsCount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  resultsAreIncomplete?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  results?: Resolver<ReadonlyArray<IResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = IContext> = {
  Query?: IQueryResolvers<ContextType>;
  TextMatch?: ITextMatchResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
  UserSearchPage?: IUserSearchPageResolvers<ContextType>;
};



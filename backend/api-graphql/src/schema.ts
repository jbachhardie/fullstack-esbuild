import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    searchUsers(query: String!, page: Int = 1): UserSearchPage
  }

  type UserSearchPage {
    resultsCount: Int!
    resultsAreIncomplete: Boolean!
    results: [User!]!
  }

  type User {
    login: String!
    id: Int!
    nodeId: String!
    avatarUrl: String!
    gravatarId: String
    url: String!
    htmlUrl: String!
    followersUrl: String!
    subscriptionsUrl: String!
    organizationsUrl: String!
    reposUrl: String!
    receivedEventsUrl: String!
    type: String!
    score: Int!
    followingUrl: String!
    gistsUrl: String!
    starredUrl: String!
    eventsUrl: String!
    publicRepos: Int!
    publicGists: Int!
    followers: Int!
    following: Int!
    createdAt: String!
    updatedAt: String!
    name: String
    bio: String
    email: String
    location: String
    siteAdmin: Boolean!
    hireable: Boolean
    textMatches: [TextMatch!]!
    blog: String
    company: String
    suspendedAt: String
  }

  type TextMatch {
    property: String!
    fragment: String!
  }
`

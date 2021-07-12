import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    searchUsers(query: String!, page: Int = 1): UserSearchPage
  }

  type UserSearchPage {
    resultsCount: Int!
    resultsAreIncomplete: Boolean!
    results: [UserResult!]!
  }

  type UserResult {
    textMatches: [TextMatch!]!
    userId: ID!
    user: User
  }

  type User {
    id: ID!
    avatarUrl: String!
    url: String!
    publicRepos: Int!
    publicGists: Int!
    followers: Int!
    following: Int!
    name: String
    blog: String
    company: String
    email: String
    location: String
  }

  type TextMatch {
    property: String!
    fragment: String!
  }
`

import { ApolloClient, InMemoryCache } from '@apollo/client'
import gql from 'graphql-tag'
import {
  FetchSearchResultsQuery,
  FetchSearchResultsQueryVariables,
} from './generated-operation-types'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache: cache,
  uri:
    // @ts-ignore
    process.env.NODE_ENV === 'production'
      ? '/graphql'
      : 'http://localhost:4000/graphql',
})

const fetchSearchResultsQuery = gql`
  query fetchSearchResults($query: String!, $page: Int!) {
    searchUsers(query: $query, page: $page) {
      resultsCount
      results {
        textMatches {
          property
          fragment
        }
        userId
        user {
          id
          avatarUrl
          url
          publicRepos
          publicGists
          followers
          following
          name
          blog
          company
          email
          location
        }
      }
    }
  }
`

export const queries = {
  async fetchSearchResults(
    variables: FetchSearchResultsQueryVariables
  ): Promise<FetchSearchResultsQuery> {
    const { data } = await apolloClient.query({
      query: fetchSearchResultsQuery,
      variables,
    })
    return data
  },
}

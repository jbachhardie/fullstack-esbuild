import { UserSearchPage } from '@backend/domain'
import { SearchService } from '@backend/services'
import { gql } from 'apollo-server'
import { createGraphQLServer } from './create-graphql-server'

const mockSearchUsers = jest.fn()

class MockSearchService extends SearchService {
  searchUsers = mockSearchUsers
}

const context = () => ({
  services: {
    search: new MockSearchService(),
  },
})

it('should respond with test results', async () => {
  const server = await createGraphQLServer(context)

  mockSearchUsers.mockResolvedValue(new UserSearchPage(0, false, []))

  const { data, errors } = await server.executeOperation({
    query: gql`
      query testSearch {
        searchUsers(query: "test-query", page: 3) {
          resultsCount
          results {
            login
          }
        }
      }
    `,
  })

  expect(errors).toBeFalsy()
  expect(data).toMatchObject({
    searchUsers: {
      resultsCount: 0,
      results: [],
    },
  })
  expect(mockSearchUsers).toHaveBeenCalledWith('test-query', 3)
})

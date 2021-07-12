import { User, UserResult, UserSearchPage } from '@backend/domain'
import { UserService } from '@backend/services'
import { gql } from 'apollo-server'
import { IContext } from './context'
import { createGraphQLServer } from './create-graphql-server'

const mockSearchUsers = jest.fn()
const mockFetchUser = jest.fn()

class MockSearchService extends UserService {
  findUsers = mockSearchUsers
  fetchUser = mockFetchUser
}

const context = (): IContext => ({
  services: {
    user: new MockSearchService(),
  },
})

it('should respond with test results', async () => {
  const server = await createGraphQLServer(context)

  mockSearchUsers.mockResolvedValue(
    new UserSearchPage(0, false, [new UserResult('test-user', [])])
  )
  mockFetchUser.mockResolvedValue(
    new User(
      'test-user',
      'http://nuwis.co/wo',
      'http://og.na/gat',
      642549735,
      983133452,
      630987351,
      1254879450,
      'Leroy Phelps',
      null,
      null,
      'hew@vut.gh',
      'Dolgicwa'
    )
  )

  const { data, errors } = await server.executeOperation({
    query: gql`
      query testSearch {
        searchUsers(query: "test-query", page: 3) {
          resultsCount
          results {
            user {
              id
              name
            }
          }
        }
      }
    `,
  })

  expect(errors).toBeFalsy()
  expect(data).toMatchObject({
    searchUsers: {
      resultsCount: 0,
      results: [
        {
          user: {
            id: 'test-user',
            name: 'Leroy Phelps',
          },
        },
      ],
    },
  })
  expect(mockSearchUsers).toHaveBeenCalledWith('test-query', 3)
  expect(mockFetchUser).toHaveBeenCalledWith('test-user')
})

import { UserService } from '@backend/services'
import axios from 'axios'
import {
  RateLimitExceededError,
  TextMatch,
  User,
  UserResult,
  UserSearchPage,
} from '@backend/domain'
import http from 'http'
import https from 'https'
import * as z from 'zod'

export class GitHubRESTUserService extends UserService {
  async fetchUser(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
  async findUsers(query: string, page: number): Promise<UserSearchPage> {
    try {
      const clientResponse = await githubClient.get<unknown>('/search/users', {
        params: {
          per_page: 100,
          q: query,
          page: page,
        },
      })

      return githubUserSearchResultSchema.parse(clientResponse.data)
    } catch (err) {
      if (axios.isAxiosError(err) && err.code === '403') {
        throw new RateLimitExceededError(
          'github',
          err.response?.headers['X-RateLimit-Reset']
            ? parseInt(err.response?.headers['X-RateLimit-Reset'])
            : null
        )
      } else {
        throw err
      }
    }
  }
}

const githubClient = axios.create({
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  baseURL: 'https://api.github.com',
  headers: {
    accept: 'application/vnd.github.v3.text-match+json',
  },
  timeout: 10_000,
  auth: {
    username: process.env['GITHUB_USERNAME'] ?? '',
    password: process.env['GITHUB_ACCESS_TOKEN'] ?? '',
  },
})

const githubTextMatchSchema = z
  .object({
    property: z.string(),
    fragment: z.string(),
  })
  .transform(
    (textMatch) => new TextMatch(textMatch.property, textMatch.fragment)
  )

const githubUserSchema = z
  .object({
    login: z.string(),
    text_matches: z.array(githubTextMatchSchema),
  })
  .transform(
    (githubUser) => new UserResult(githubUser.login, githubUser.text_matches)
  )

const githubUserSearchResultSchema = z
  .object({
    total_count: z.number(),
    incomplete_results: z.boolean(),
    items: z.array(githubUserSchema),
  })
  .transform(
    (githubUserSearchResult) =>
      new UserSearchPage(
        githubUserSearchResult.total_count,
        githubUserSearchResult.incomplete_results,
        githubUserSearchResult.items
      )
  )

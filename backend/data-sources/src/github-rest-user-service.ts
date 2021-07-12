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
    const clientResponse = await githubClient
      .get<unknown>(`/users/${id}`)
      .catch(handleGithubErrors)

    return githubUserSchema.parse(clientResponse.data)
  }
  async findUsers(query: string, page: number): Promise<UserSearchPage> {
    const clientResponse = await githubClient
      .get<unknown>('/search/users', {
        params: {
          per_page: 20,
          q: query,
          page: page,
        },
        headers: {
          accept: 'application/vnd.github.v3.text-match+json',
        },
      })
      .catch(handleGithubErrors)

    return githubUserSearchResultSchema.parse(clientResponse.data)
  }
}

const githubClient = axios.create({
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  baseURL: 'https://api.github.com',
  headers: {
    accept: 'application/vnd.github.v3+json',
  },
  timeout: 10_000,
  auth: {
    username: process.env['GITHUB_USERNAME'] ?? '',
    password: process.env['GITHUB_ACCESS_TOKEN'] ?? '',
  },
})

function handleGithubErrors(err: unknown): never {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 403) {
      throw new RateLimitExceededError(
        'github',
        err.response?.headers['x-ratelimit-reset']
          ? parseInt(err.response?.headers['x-ratelimit-reset'])
          : null
      )
    } else {
      throw new Error(err.message)
    }
  } else {
    throw err
  }
}

const githubTextMatchSchema = z
  .object({
    property: z.string(),
    fragment: z.string(),
  })
  .transform(
    (textMatch) => new TextMatch(textMatch.property, textMatch.fragment)
  )

const githubUserResultSchema = z
  .object({
    login: z.string(),
    text_matches: z.array(githubTextMatchSchema),
  })
  .transform(
    (githubUser) => new UserResult(githubUser.login, githubUser.text_matches)
  )

const githubUserSchema = z
  .object({
    login: z.string(),
    avatar_url: z.string(),
    html_url: z.string(),
    public_repos: z.number(),
    public_gists: z.number(),
    followers: z.number(),
    following: z.number(),
    name: z.string().nullable(),
    blog: z.string().nullable(),
    company: z.string().nullable(),
    email: z.string().nullable(),
    location: z.string().nullable(),
  })
  .transform(
    (githubUser) =>
      new User(
        githubUser.login,
        githubUser.avatar_url,
        githubUser.html_url,
        githubUser.public_repos,
        githubUser.public_gists,
        githubUser.followers,
        githubUser.following,
        githubUser.name,
        githubUser.blog,
        githubUser.company,
        githubUser.email,
        githubUser.location
      )
  )

const githubUserSearchResultSchema = z
  .object({
    total_count: z.number(),
    incomplete_results: z.boolean(),
    items: z.array(githubUserResultSchema),
  })
  .transform(
    (githubUserSearchResult) =>
      new UserSearchPage(
        githubUserSearchResult.total_count,
        githubUserSearchResult.incomplete_results,
        githubUserSearchResult.items
      )
  )

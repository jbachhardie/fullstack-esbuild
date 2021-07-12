import { ApolloError } from 'apollo-server-errors'

export class RateLimitExceededError extends ApolloError {
  constructor(upstream: string, waitUntil: number | null) {
    super(
      `Exceeded rate limit for ${upstream}.` +
        (waitUntil !== null
          ? ` Try again in ${
              waitUntil - Math.round(new Date().valueOf() / 1000)
            } seconds`
          : ''),
      'RATE_LIMIT_EXCEEDED',
      {
        waitUntil,
      }
    )
  }
}

import React, { useState } from 'react'
import { useActor, useMachine } from '@xstate/react'
import {
  pageMachine,
  pageModel,
  paginationModel,
  searchModel,
} from '@frontend/state-machine'
import { queries, UserResult } from '@frontend/graphql'
import {
  containerStyle,
  countStyle,
  gridStyle,
  paginationStyle,
  resultAvatarStyle,
  resultInfoGroupStyle,
  resultsStyle,
  resultStyle,
  resultTitleStyle,
  searchBoxStyle,
  searchStyle,
  darkTheme,
  lightTheme,
  themeButtonStyle,
} from './app.css'
import { inspect } from '@xstate/inspect'
import { ApolloError } from '@apollo/client'

// @ts-ignore
const inDevMode = process.env.NODE_ENV !== 'production'

if (inDevMode) {
  // Display popup window with xstate inspector
  inspect({ iframe: false })
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [state] = useMachine(pageMachine, {
    devTools: inDevMode,
    services: {
      fetchSearchResults: async ({ query, page }) => {
        try {
          return await queries.fetchSearchResults({ query, page })
        } catch (err) {
          const rateLimitedError = (err as ApolloError).graphQLErrors?.find(
            (graphqlError) =>
              graphqlError.extensions?.['code'] === 'RATE_LIMIT_EXCEEDED'
          )
          if (rateLimitedError) {
            throw {
              type: 'RATE_LIMIT_EXCEEDED',
              until: rateLimitedError.extensions?.['waitUntil'],
            }
          } else {
            throw {
              type: 'UNKNOWN_ERROR',
            }
          }
        }
      },
    },
  })

  const content = (
    <>
      {state.context.searchResults ? (
        <p className={countStyle}>
          Found {state.context.searchResults.searchUsers?.resultsCount} Results
        </p>
      ) : (
        <div />
      )}
      <Results actor={state.context.results} />
      {state.context.searchResults && (
        <Pagination actor={state.context.pagination} />
      )}
    </>
  )

  const errorMessage = (
    <p>
      {state.context.error?.type === 'RATE_LIMITED'
        ? `The app has exceeded its rate limit, please try again in ${
            state.context.error.until || 30
          } seconds.`
        : 'An error has occurred. Please try again later.'}
    </p>
  )

  return (
    <div className={darkMode ? darkTheme : lightTheme}>
      <button
        className={themeButtonStyle}
        onClick={() => setDarkMode((x) => !x)}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className={containerStyle}>
        <div className={gridStyle}>
          <h1>Search Users on Github</h1>
          <Search actor={state.context.search} />
          {state.context.error ? errorMessage : content}
        </div>
      </div>
    </div>
  )
}

function Search({ actor }: { actor: typeof pageModel.initialContext.search }) {
  const [state, send] = useActor(actor)

  return (
    <form
      className={searchStyle}
      onSubmit={(e) => {
        e.preventDefault()
        send(searchModel.events.submit())
      }}
    >
      <input
        className={searchBoxStyle}
        type="search"
        disabled={state.matches('loading')}
        value={state.context.searchBoxInput}
        onChange={(e) => send(searchModel.events.updateInput(e.target.value))}
      />
      <button type="submit">Search</button>
    </form>
  )
}

function Results({
  actor,
}: {
  actor: typeof pageModel.initialContext.results
}) {
  const [state] = useActor(actor)

  if (state.context.searchResults) {
    return (
      <div className={resultsStyle}>
        {state.context.searchResults.searchUsers?.results.map((result) =>
          result ? <Result data={result} key={result.user?.id} /> : null
        )}
      </div>
    )
  } else {
    return null
  }
}

function Result({ data }: { data: UserResult }) {
  return (
    <a
      className={resultStyle}
      href={data.user?.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className={resultAvatarStyle} src={data.user?.avatarUrl} alt="" />
      <div>
        <p className={resultTitleStyle}>{data.user?.name || data.user?.id}</p>
        <ResultInfoGroup
          info={[data.user?.id, data.user?.email]}
        ></ResultInfoGroup>
        <ResultInfoGroup info={[data.user?.company, data.user?.location]} />
        <ResultInfoGroup
          info={[
            `${data.user?.followers} Followers`,
            `${data.user?.following} Following`,
          ]}
        />
      </div>
    </a>
  )
}

function ResultInfoGroup({ info }: { info: Array<string | null | undefined> }) {
  return (
    <p className={resultInfoGroupStyle}>{info.filter(Boolean).join(' · ')}</p>
  )
}

function Pagination({
  actor,
}: {
  actor: typeof pageModel.initialContext.pagination
}) {
  const [state, send] = useActor(actor)

  return (
    <div className={paginationStyle}>
      {state.context.hasPreviousPage ? (
        <button
          type="button"
          onClick={() => send(paginationModel.events.previousPage())}
        >
          Previous Page
        </button>
      ) : (
        <div />
      )}
      {state.context.hasNextPage ? (
        <button
          type="button"
          onClick={() => send(paginationModel.events.nextPage())}
        >
          Next Page
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}

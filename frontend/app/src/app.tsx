import React from 'react'
import { useActor, useMachine } from '@xstate/react'
import {
  pageMachine,
  pageModel,
  paginationModel,
  searchModel,
} from '@frontend/state-machine'
import { UserResult } from '@frontend/graphql'

export default function App() {
  const [state, send] = useMachine(pageMachine)
  return (
    <div>
      <Search actor={state.context.search} />
      <Results actor={state.context.results} />
      {state.context.searchResults && (
        <Pagination actor={state.context.pagination} />
      )}
    </div>
  )
}

function Search({ actor }: { actor: typeof pageModel.initialContext.search }) {
  const [state, send] = useActor(actor)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        send(searchModel.events.submit())
      }}
    >
      <input
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
  const [state, send] = useActor(actor)

  if (state.context.searchResults) {
    return (
      <div>
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
  return <a href={data.user?.url}>{data.user?.id}</a>
}

function Pagination({
  actor,
}: {
  actor: typeof pageModel.initialContext.pagination
}) {
  const [state, send] = useActor(actor)

  return (
    <div>
      {state.context.currentPage > 1 && (
        <button
          type="button"
          onClick={() => send(paginationModel.events.previousPage())}
        >
          Previous Page
        </button>
      )}
      <button
        type="button"
        onClick={() => send(paginationModel.events.nextPage())}
      >
        Next Page
      </button>
    </div>
  )
}

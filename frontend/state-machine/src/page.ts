import { ActorRefFrom, spawn, assign, send } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { FetchSearchResultsQuery } from '@frontend/graphql'
import { paginationMachine, paginationModel } from './pagination'
import { resultsMachine, resultsModel, TransitionDirection } from './results'
import { searchMachine, searchModel } from './search'

type FetchError =
  | {
      type: 'RATE_LIMITED'
      until?: number
    }
  | { type: 'UNKNOWN_ERROR' }

export const pageModel = createModel(
  {
    search: null as ActorRefFrom<typeof searchMachine>,
    results: null as ActorRefFrom<typeof resultsMachine>,
    pagination: null as ActorRefFrom<typeof paginationMachine>,
    query: '',
    page: 1,
    queuedTransition: null as TransitionDirection | null,
    searchResults: null as FetchSearchResultsQuery | null,
    error: null as FetchError | null,
  },
  {
    events: {
      updateQuery: (value: string) => ({ value }),
      updatePage: (value: number) => ({ value }),
    },
  }
)

export const pageMachine = pageModel.createMachine({
  id: 'page',
  context: pageModel.initialContext,
  initial: 'waiting',
  entry: pageModel.assign(
    {
      search: () => spawn(searchMachine, 'search'),
      results: () => spawn(resultsMachine, 'results'),
      pagination: () => spawn(paginationMachine, 'pagination'),
    },
    undefined
  ),
  states: {
    waiting: {
      on: {
        updateQuery: {
          target: 'loading',
          actions: pageModel.assign({
            query: (_, event) => event.value,
            page: (_, _event) => 1,
          }),
        },
        updatePage: {
          target: 'loading',
          actions: pageModel.assign({
            page: (_, event) => event.value,
            queuedTransition: (context, event) =>
              context.page > event.value
                ? TransitionDirection.Backward
                : TransitionDirection.Forward,
          }),
        },
      },
    },
    loading: {
      invoke: {
        id: 'fetchSearchResults',
        src: 'fetchSearchResults',
        onDone: {
          target: 'waiting',
          actions: [
            send(searchModel.events.loadingFinished(), {
              to: (context) => context.search,
            }),
            send(
              (context, event) =>
                paginationModel.events.loadingFinished(
                  context.page,
                  event.data.searchUsers?.resultsCount ?? 0
                ),
              {
                to: (context) => context.pagination,
              }
            ),
            send(
              (context, event) =>
                resultsModel.events.newResults(
                  event.data,
                  context.queuedTransition ?? TransitionDirection.Forward
                ),
              {
                to: (context) => context.results,
              }
            ),
            assign({
              searchResults: (_, event) => event.data,
              error: (_, _event) => null,
            }),
          ],
        },
        onError: {
          target: 'waiting',
          actions: [
            send(searchModel.events.loadingFinished(), {
              to: (context) => context.search,
            }),
            send(
              (context) =>
                paginationModel.events.loadingFinished(
                  context.page,
                  context.searchResults?.searchUsers?.resultsCount ?? 0
                ),
              {
                to: (context) => context.pagination,
              }
            ),
            assign({
              error: (_, event) => event.data,
            }),
          ],
        },
      },
    },
  },
})

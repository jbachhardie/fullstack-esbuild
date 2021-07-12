import { ActorRefFrom, spawn, assign, send } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { paginationMachine, paginationModel } from './pagination'
import { resultsMachine, resultsModel, TransitionDirection } from './results'
import { searchMachine, searchModel } from './search'

export type ErrorCode = 'RATE_LIMITED' | 'UNKNOWN_ERROR'

export const pageModel = createModel(
  {
    search: null as ActorRefFrom<typeof searchMachine>,
    results: null as ActorRefFrom<typeof resultsMachine>,
    pagination: null as ActorRefFrom<typeof paginationMachine>,
    query: null as string | null,
    page: 1,
    queuedTransition: null as TransitionDirection | null,
    searchResults: null,
    errorCode: null as ErrorCode | null,
  },
  {
    events: {
      updateQuery: (value: string) => ({ value }),
      updatePage: (value: number) => ({ value }),
    },
  }
)

export const pageMachine = pageModel.createMachine(
  {
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
                (context) =>
                  paginationModel.events.loadingFinished(context.page),
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
              }),
            ],
          },
          onError: {
            target: 'waiting',
            actions: assign({
              errorCode: (_, event) => event.data,
            }),
          },
        },
      },
    },
  },
  {
    services: {
      fetchSearchResults: async () => {
        throw new Error('not implemented')
      },
    },
  }
)

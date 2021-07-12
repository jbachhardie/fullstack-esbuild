import { ActorRefFrom, spawn, assign, send } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { searchMachine, searchModel } from './search'

export type ErrorCode = 'RATE_LIMITED' | 'UNKNOWN_ERROR'

export const pageModel = createModel(
  {
    search: null as ActorRefFrom<typeof searchMachine>,
    results: null,
    pagination: null,
    query: null as string | null,
    page: 1,
    searchResults: null,
    errorCode: null as ErrorCode | null,
  },
  {
    events: {
      updateQuery: (value: string) => ({ value }),
    },
  }
)

export const pageMachine = pageModel.createMachine(
  {
    id: 'page',
    context: pageModel.initialContext,
    initial: 'waiting',
    entry: pageModel.assign({
      search: () => spawn(searchMachine, 'search'),
    }),
    states: {
      waiting: {
        on: {
          updateQuery: {
            target: 'loading',
            actions: pageModel.assign({
              query: (_, event) => event.value,
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

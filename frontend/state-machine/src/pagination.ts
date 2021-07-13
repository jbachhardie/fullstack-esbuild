import { sendParent } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { pageModel } from './page'

const RESULTS_PER_PAGE = 20

export const paginationModel = createModel(
  {
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  {
    events: {
      nextPage: () => ({}),
      previousPage: () => ({}),
      loadingFinished: (newPage: number, numberOfResults: number) => ({
        newPage,
        numberOfResults,
      }),
    },
  }
)

export const paginationMachine = paginationModel.createMachine({
  id: 'pagination',
  context: paginationModel.initialContext,
  initial: 'waiting',
  states: {
    waiting: {
      on: {
        nextPage: {
          cond: (context) => context.hasNextPage,
          actions: sendParent((context) =>
            pageModel.events.updatePage(context.currentPage + 1)
          ),
          target: 'loading',
        },
        previousPage: {
          cond: (context) => context.hasPreviousPage,
          actions: sendParent((context) =>
            pageModel.events.updatePage(context.currentPage - 1)
          ),
          target: 'loading',
        },
      },
    },
    loading: {},
  },
  on: {
    loadingFinished: {
      target: '.waiting',
      actions: paginationModel.assign({
        currentPage: (_, event) => event.newPage,
        hasNextPage: (_, event) =>
          event.newPage * RESULTS_PER_PAGE < event.numberOfResults,
        hasPreviousPage: (_, event) => event.newPage > 1,
      }),
    },
  },
})

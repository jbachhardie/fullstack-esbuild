import { sendParent } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { pageModel } from './page'

export const paginationModel = createModel(
  {
    currentPage: 1,
  },
  {
    events: {
      nextPage: () => ({}),
      previousPage: () => ({}),
      loadingFinished: (newPage: number) => ({ value: newPage }),
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
          actions: sendParent((context) =>
            pageModel.events.updatePage(context.currentPage + 1)
          ),
          target: 'loading',
        },
        previousPage: {
          cond: (context) => context.currentPage > 1,
          actions: sendParent((context) =>
            pageModel.events.updatePage(context.currentPage - 1)
          ),
          target: 'loading',
        },
      },
    },
    loading: {
      on: {
        loadingFinished: {
          target: 'waiting',
          actions: paginationModel.assign({
            currentPage: (_, event) => event.value,
          }),
        },
      },
    },
  },
})

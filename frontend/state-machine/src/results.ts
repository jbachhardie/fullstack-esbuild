import { createModel } from 'xstate/lib/model'

type Results = {}
export enum TransitionDirection {
  Forward,
  Backward,
}

export const resultsModel = createModel(
  {
    previousSearchResults: null as Results | null,
    searchResults: null as Results | null,
    transitionDirection: null as TransitionDirection | null,
  },
  {
    events: {
      newResults: (
        value: Results,
        transitionDirection: TransitionDirection
      ) => ({ value, transitionDirection }),
      transitionComplete: () => ({}),
    },
  }
)

export const resultsMachine = resultsModel.createMachine({
  id: 'results',
  context: resultsModel.initialContext,
  initial: 'waiting',
  states: {
    waiting: {
      on: {
        newResults: {
          target: 'transitioning',
          actions: resultsModel.assign({
            previousSearchResults: (context) => context.searchResults,
            searchResults: (_, event) => event.value,
            transitionDirection: (_, event) => event.transitionDirection,
          }),
        },
      },
    },
    transitioning: {
      on: {
        transitionComplete: {
          target: 'waiting',
          actions: resultsModel.assign({
            previousSearchResults: null,
            transitionDirection: null,
          }),
        },
        newResults: {
          target: 'waiting',
          actions: resultsModel.assign({
            searchResults: (_, event) => event.value,
            previousSearchResults: null,
            transitionDirection: null,
          }),
        },
      },
    },
  },
})

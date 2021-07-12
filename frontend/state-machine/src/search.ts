import { sendParent } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { pageModel } from './page'

export const searchModel = createModel(
  {
    searchBoxInput: '',
  },
  {
    events: {
      updateInput: (value: string) => ({ value }),
      submit: () => ({}),
      loadingFinished: () => ({}),
    },
  }
)

export const searchMachine = searchModel.createMachine({
  id: 'search',
  context: searchModel.initialContext,
  initial: 'waiting',
  states: {
    waiting: {
      on: {
        updateInput: {
          actions: searchModel.assign({
            searchBoxInput: (_, event) => event.value,
          }),
        },
        submit: 'loading',
      },
    },
    loading: {
      entry: sendParent((context) =>
        pageModel.events.updateQuery(context.searchBoxInput)
      ),
      on: {
        loadingFinished: 'waiting',
      },
    },
  },
})

import { interpret } from 'xstate'
import { pageMachine } from './page'
import { searchModel } from './search'

const fetchSearchResults = jest.fn()

const pageMachineWithMocks = pageMachine.withConfig({
  services: {
    fetchSearchResults,
  },
})

it('when the user types in a search, loads that search', (done) => {
  const mockData = {
    searchUsers: {
      resultsCount: 1,
      results: [
        {
          textMatches: [],
          user: {
            id: 'test-user',
          },
        },
      ],
    },
  }
  fetchSearchResults.mockResolvedValue(mockData)
  const pageService = interpret(pageMachineWithMocks).onTransition((state) => {
    if (state.matches('waiting') && state.context.searchResults) {
      expect(state.context.searchResults).toMatchObject(mockData)
      done()
    }
  })
  pageService.start()
  pageService.state.context.search.send(searchModel.events.updateInput('foo'))
  pageService.state.context.search.send(searchModel.events.submit())
})

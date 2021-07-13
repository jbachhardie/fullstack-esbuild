import { interpret } from 'xstate'
import { pageMachine } from './page'
import { paginationModel } from './pagination'
import { resultsModel, TransitionDirection } from './results'
import { searchModel } from './search'

const fetchSearchResults = jest.fn()

const pageMachineWithMocks = pageMachine.withConfig({
  services: {
    fetchSearchResults,
  },
})

it('when the user types in a search, loads that search and queues a transition', (done) => {
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
    if (
      state.matches('waiting') &&
      state.context.searchResults &&
      state.context.results?.getSnapshot()?.matches('transitioning')
    ) {
      expect(state.context.searchResults).toMatchObject(mockData)
      expect(state.context.query).toEqual('foo')
      expect(state.context.page).toEqual(1)
      expect(
        state.context.results?.getSnapshot()?.context.transitionDirection
      ).toEqual(TransitionDirection.Forward)
      pageService.stop()
      done()
    }
  })
  pageService.start()
  pageService.state.context.search.send(searchModel.events.updateInput('foo'))
  pageService.state.context.search.send(searchModel.events.submit())
})

it('when the user goes to the next page, loads that page and queues a transition', (done) => {
  const mockData = {
    searchUsers: {
      resultsCount: 100,
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
    console.log(state.toStrings())
    if (
      state.matches('waiting') &&
      state.context.searchResults &&
      state.context.page === 1
    ) {
      pageService.state.context.results.send(
        resultsModel.events.transitionComplete()
      )
      pageService.state.context.pagination.send(
        paginationModel.events.nextPage()
      )
    }
    if (
      state.matches('waiting') &&
      state.context.searchResults &&
      state.context.results?.getSnapshot()?.matches('transitioning')
    ) {
      expect(state.context.searchResults).toMatchObject(mockData)
      expect(state.context.page).toEqual(2)
      expect(
        state.context.results?.getSnapshot()?.context.transitionDirection
      ).toEqual(TransitionDirection.Forward)
      pageService.stop()
      done()
    }
  })
  pageService.start()
  pageService.state.context.search.send(searchModel.events.updateInput('foo'))
  pageService.state.context.search.send(searchModel.events.submit())
})

it('when the user goes to the previous page, loads that page and queues a transition', (done) => {
  const mockData = {
    searchUsers: {
      resultsCount: 200,
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
    if (
      state.matches('waiting') &&
      state.context.searchResults &&
      state.context.results?.getSnapshot()?.context.transitionDirection ===
        TransitionDirection.Backward &&
      state.context.results?.getSnapshot()?.matches('transitioning')
    ) {
      expect(state.context.searchResults).toMatchObject(mockData)
      expect(state.context.page).toEqual(4)
      pageService.stop()
      done()
    }
    if (
      state.matches('waiting') &&
      state.context.searchResults &&
      state.context.page < 5
    ) {
      pageService.state.context.results.send(
        resultsModel.events.transitionComplete()
      )
      state.context.pagination.send(paginationModel.events.nextPage())
    }
    if (
      state.matches('waiting') &&
      state.context.searchResults &&
      state.context.page === 5
    ) {
      pageService.state.context.results.send(
        resultsModel.events.transitionComplete()
      )
      state.context.pagination.send(paginationModel.events.previousPage())
    }
  })
  pageService.start()
  pageService.state.context.search.send(searchModel.events.updateInput('foo'))
  pageService.state.context.search.send(searchModel.events.submit())
})

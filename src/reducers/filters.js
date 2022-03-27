import { createReducer } from '@reduxjs/toolkit'
import { filtersFetching, filtersFetched, filtersFetchingError, setFilter } from '../actions'

const initialState = {
	filters: [],
	filtersLoadingStatus: 'idle',
	activeFilter: 'all',
}

const filters = createReducer(initialState, {
	[filtersFetching]: state => {
		state.filtersLoadingStatus = 'loading'
	},
	[filtersFetched]: (state, action) => {
		state.filters = action.payload
		state.filtersLoadingStatus = 'idle'
	},
	[filtersFetchingError]: state => {
		state.filtersLoadingStatus = 'error'
	},
	[setFilter]: (state, action) => {
		state.activeFilter = action.payload
	},
}, [], state => state)

export default filters

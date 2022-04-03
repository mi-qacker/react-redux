import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	filters: [],
	filtersLoadingStatus: 'idle',
	activeFilter: 'all',
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filtersFetching: state => {
			state.filtersLoadingStatus = 'loading'
		},
		filtersFetched: (state, action) => {
			state.filters = action.payload
			state.filtersLoadingStatus = 'idle'
		},
		filtersFetchingError: state => {
			state.filtersLoadingStatus = 'error'
		},
		setFilter: (state, action) => {
			state.activeFilter = action.payload
		},
	},
})

const { actions, reducer } = filtersSlice

export default reducer
export const {
	filtersFetching,
	filtersFetched,
	filtersFetchingError,
	setFilter,
} = actions
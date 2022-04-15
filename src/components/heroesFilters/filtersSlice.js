import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const initialState = {
	filters: [],
	filtersLoadingStatus: 'idle',
	activeFilter: 'all',
}

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	() => {
		const { request } = useHttp()
		return request('http://localhost:3001/filters')
	},
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state.activeFilter = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchFilters.pending, state => {
			state.filtersLoadingStatus = 'loading'
		})
		builder.addCase(fetchFilters.fulfilled, (state, action) => {
			state.filters = action.payload
			state.filtersLoadingStatus = 'idle'
		})
		builder.addCase(fetchFilters.rejected, state => {
			state.filtersLoadingStatus = 'error'
		})
	},
})

const { actions, reducer } = filtersSlice

export default reducer
export const {
	setFilter,
} = actions
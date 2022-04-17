import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
	filtersLoadingStatus: 'idle',
	activeFilter: 'all',
})

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
			filtersAdapter.setAll(state, action.payload)
			state.filtersLoadingStatus = 'idle'
		})
		builder.addCase(fetchFilters.rejected, state => {
			state.filtersLoadingStatus = 'error'
		})
	},
})

const { actions, reducer } = filtersSlice

export default reducer

export const { selectAll, selectById } = filtersAdapter.getSelectors(state => state.filters)

export const {
	setFilter,
} = actions
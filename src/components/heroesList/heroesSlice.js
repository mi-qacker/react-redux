import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle',
})

export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	() => {
		const { request } = useHttp()
		return request('http://localhost:3001/heroes')
	},
)

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroCreated: (state, action) => {
			heroesAdapter.addOne(state, action.payload)
		},
		heroDeleted: (state, action) => {
			heroesAdapter.removeOne(state, action.payload)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchHeroes.pending, state => {
			state.heroesLoadingStatus = 'loading'
		})
		builder.addCase(fetchHeroes.fulfilled, (state, action) => {
			state.heroesLoadingStatus = 'idle'
			heroesAdapter.setAll(state, action.payload)
		})
		builder.addCase(fetchHeroes.rejected, state => {
			state.heroesLoadingStatus = 'error'
		})
	},
})

const { reducer, actions } = heroesSlice

export default reducer

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)
export const filteredHeroesSelector = createSelector(
	state => state.filters.activeFilter,
	selectAll,
	(activeFilter, heroes) => {
		if (activeFilter === 'all')
			return heroes
		return heroes.filter(hero => hero.element === activeFilter)
	},
)

export const {
	heroCreated,
	heroDeleted,
} = actions
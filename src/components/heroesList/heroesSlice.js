import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

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
			state.heroes.push(action.payload)
		},
		heroDeleted: (state, action) => {
			state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchHeroes.pending, state => {
			state.heroesLoadingStatus = 'loading'
		})
		builder.addCase(fetchHeroes.fulfilled, (state, action) => {
			state.heroes = action.payload
			state.heroesLoadingStatus = 'idle'
		})
		builder.addCase(fetchHeroes.rejected, state => {
			state.heroesLoadingStatus = 'error'
		})
	},
})

const { reducer, actions } = heroesSlice

export default reducer
export const {
	heroCreated,
	heroDeleted,
} = actions
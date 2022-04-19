import { configureStore } from '@reduxjs/toolkit'
import filters from '../components/heroesFilters/filtersSlice'
import { apiFiltersSlice, apiHeroesSlice } from '../api'

const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === 'string')
		return dispatch({
			type: action,
		})
	return dispatch(action)

}

const store = configureStore({
	reducer: {
		filters,
		[apiHeroesSlice.reducerPath]: apiHeroesSlice.reducer,
		[apiFiltersSlice.reducerPath]: apiFiltersSlice.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
		stringMiddleware,
		apiHeroesSlice.middleware,
		apiFiltersSlice.middleware,
	),
	devTools: process.env.NODE_ENV !== 'production',
})

export default store

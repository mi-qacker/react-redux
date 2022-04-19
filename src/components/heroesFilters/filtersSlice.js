import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeFilter: 'all',
}
const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state.activeFilter = action.payload
		},
	},
})

const { actions, reducer } = filtersSlice

export default reducer

export const {
	setFilter,
} = actions
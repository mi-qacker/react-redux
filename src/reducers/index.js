const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
	filtersLoadingStatus: 'idle',
	activeFilter: 'all',
	filteredHeroes: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading',
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload,
				filteredHeroes: state.activeFilter === 'all' ?
					action.payload :
					action.payload.filter(hero => hero.element === state.activeFilter),
				heroesLoadingStatus: 'idle',
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			}
		case 'FILTERS_FETCHING':
			return {
				...state,
				filtersLoadingStatus: 'loading',
			}
		case 'FILTERS_FETCHED':
			return {
				...state,
				filters: action.payload,
				filtersLoadingStatus: 'idle',
			}
		case 'FILTERS_FETCHING_ERROR':
			return {
				...state,
				filtersLoadingStatus: 'error',
			}

		case 'FILTER_SET':
			return {
				...state,
				activeFilter: action.payload,
				filteredHeroes: action.payload === 'all' ?
					state.heroes :
					state.heroes.filter(hero => hero.element === action.payload),
			}
		case 'HERO_CREATE':
			const newCreatedHeroesList = [...state.heroes, action.payload]
			return {
				...state,
				heroesLoadingStatus: 'idle',
				heroes: newCreatedHeroesList,
				filteredHeroes: state.activeFilter === 'all' ?
					newCreatedHeroesList :
					newCreatedHeroesList.filter(hero => hero.element === state.activeFilter),
			}
		case 'HERO_DELETE':
			const newHeroesList = state.heroes.filter(hero => hero.id !== action.payload)
			return {
				...state,
				heroesLoadingStatus: 'idle',
				heroes: newHeroesList,
				filteredHeroes: state.activeFilter === 'all' ?
					newHeroesList :
					newHeroesList.filter(hero => hero.element === state.activeFilter),
			}

		default:
			return state
	}
}

export default reducer

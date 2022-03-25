export const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching())
	request('http://localhost:3001/heroes')
		.then((data) => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
	dispatch(filtersFetching())
	request('http://localhost:3001/filters')
		.then((data) => dispatch(filtersFetched(data)))
		.catch(() => dispatch(filtersFetchingError()))
}

export const heroesFetching = () => {
	return 'HEROES_FETCHING'
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes,
	}
}

export const heroesFetchingError = () => {
	return 'HEROES_FETCHING_ERROR'
}

export const heroCreated = (hero) => {
	return {
		type: 'HERO_CREATE',
		payload: hero,
	}
}

export const heroDeleted = (id) => {
	return {
		type: 'HERO_DELETE',
		payload: id,
	}
}


export const filtersFetching = () => {
	return 'FILTERS_FETCHING'
}

export const filtersFetched = (filters) => {
	return {
		type: 'FILTERS_FETCHED',
		payload: filters,
	}
}

export const filtersFetchingError = () => {
	return 'FILTERS_FETCHING_ERROR'
}

export const setFilter = (filter) => {
	return {
		type: 'FILTER_SET',
		payload: filter,
	}
}

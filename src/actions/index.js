export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING',
	}
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes,
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR',
	}
}

export const heroCreated = (hero) => {
	return {
		type: 'HERO_CREATE',
		payload: hero,
	}
}

export const heroDeleted  = (id) => {
	return {
		type: 'HERO_DELETE',
		payload: id,
	}
}


export const filtersFetching = () => {
	return {
		type: 'FILTERS_FETCHING',
	}
}

export const filtersFetched = (filters) => {
	return {
		type: 'FILTERS_FETCHED',
		payload: filters,
	}
}

export const filtersFetchingError = () => {
	return {
		type: 'FILTERS_FETCHING_ERROR',
	}
}

export const setFilter = (filter) => {
	return {
		type: 'FILTER_SET',
		payload: filter,
	}
}

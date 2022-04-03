import { useHttp } from '../../hooks/http.hook'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchHeroes } from '../../actions'
import HeroesListItem from '../heroesListItem/HeroesListItem'
import Spinner from '../spinner/Spinner'
import { createSelector } from 'reselect'
import { heroDeleted, heroesFetchingError } from './heroesSlice'

const HeroesList = () => {
	const filteredHeroesSelector = createSelector(
		state => state.filters.activeFilter,
		state => state.heroes.heroes,
		(activeFilter, heroes) => {
			if (activeFilter === 'all')
				return heroes
			return heroes.filter(hero => hero.element === activeFilter)
		},
	)
	const filteredHeroes = useSelector(filteredHeroesSelector)
	const { filters } = useSelector(state => state.filters)
	const { heroesLoadingStatus } = useSelector(state => state.heroes)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		dispatch(fetchHeroes(request))
		// eslint-disable-next-line
	}, [])

	const onDeleteHero = useCallback((id) => {
		request(`http://localhost:3001/heroes/${id}`, 'DELETE')
			.then(() => dispatch(heroDeleted(id)))
			.catch(() => dispatch(heroesFetchingError()))
		// eslint-disable-next-line
	}, [request])

	if (heroesLoadingStatus === 'loading') {
		return <Spinner />
	} else if (heroesLoadingStatus === 'error') {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
	}


	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return <h5 className='text-center mt-5'>Героев пока нет</h5>
		}

		return arr
			.map(({ id, element, ...props }) => {
				const elementInfo = filters.find(filter => filter.name === element)
				let colorClass = 'bg-warning'
				if (elementInfo) {
					colorClass = elementInfo.colorClass
				}
				return (
					<HeroesListItem
						key={id}
						{...props}
						colorClass={colorClass}
						element={element}
						onDeleteHero={() => onDeleteHero(id)}
					/>
				)
			})
	}

	const elements = renderHeroesList(filteredHeroes)
	return <ul>{elements}</ul>
}

export default HeroesList

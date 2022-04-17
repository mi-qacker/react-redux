import { useHttp } from '../../hooks/http.hook'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeroesListItem from '../heroesListItem/HeroesListItem'
import Spinner from '../spinner/Spinner'
import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice'
import { fetchFilters, selectAll } from '../heroesFilters/filtersSlice'
import store from '../../store'

const HeroesList = () => {
	const filteredHeroes = useSelector(filteredHeroesSelector)
	const filters = selectAll(store.getState())
	const { heroesLoadingStatus } = useSelector(state => state.heroes)
	const { filtersLoadingStatus } = useSelector(state => state.filters)

	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		dispatch(fetchHeroes())
		dispatch(fetchFilters())
		// eslint-disable-next-line
	}, [])

	const onDeleteHero = useCallback((id) => {
		request(`http://localhost:3001/heroes/${id}`, 'DELETE')
			.then(() => dispatch(heroDeleted(id)))
		// eslint-disable-next-line
	}, [request])

	if (heroesLoadingStatus === 'loading' || filtersLoadingStatus === 'loading') {
		return <Spinner />
	} else if (heroesLoadingStatus === 'error' || filtersLoadingStatus === 'error') {
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

import { useHttp } from '../../hooks/http.hook'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	heroDeleted,
} from '../../actions'
import HeroesListItem from '../heroesListItem/HeroesListItem'
import Spinner from '../spinner/Spinner'

const HeroesList = () => {
	const {
		heroesLoadingStatus,
		filteredHeroes,
		filters,
	} = useSelector((state) => state)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		dispatch(heroesFetching())
		request('http://localhost:3001/heroes')
			.then((data) => dispatch(heroesFetched(data)))
			.catch(() => dispatch(heroesFetchingError()))
		// eslint-disable-next-line
	}, [])

	const onDeleteHero = useCallback((id) => {
		dispatch(heroesFetching())
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

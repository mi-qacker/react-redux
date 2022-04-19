import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import HeroesListItem from '../heroesListItem/HeroesListItem'
import Spinner from '../spinner/Spinner'
import { useDeleteHeroMutation, useGetHeroesQuery } from '../../api/apiHeroesSlice'
import { useGetFiltersQuery } from '../../api/apiFiltersSlice'

const HeroesList = () => {
	const {
		data: heroes = [],
		isLoading: isHeroesLoading,
		isError: isHeroesError,
	} = useGetHeroesQuery()

	const {
		data: filters = [],
		isLoading: isFiltersLoading,
		isError: isFiltersError,
	} = useGetFiltersQuery()

	const [deleteHero] = useDeleteHeroMutation()

	const activeFilter = useSelector(state => state.filters.activeFilter)

	const filteredHeroes = useMemo(() => {
		const filteredHeroes = heroes.slice()
		return activeFilter === 'all' ? filteredHeroes : filteredHeroes.filter(hero => hero.element === activeFilter)
	}, [activeFilter, heroes])


	const onDeleteHero = useCallback((id) => {
		deleteHero(id)
		// eslint-disable-next-line
	}, [])

	if (isHeroesLoading || isFiltersLoading) {
		return <Spinner />
	} else if (isHeroesError || isFiltersError) {
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

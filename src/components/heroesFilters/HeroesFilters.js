import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from './filtersSlice'
import { useGetFiltersQuery } from '../../api/apiFiltersSlice'

const HeroesFilters = () => {
	const { activeFilter } = useSelector(state => state.filters)
	const {
		data: filters = [],
		isFetching,
		isLoading,
		isError,
	} = useGetFiltersQuery()
	const dispatch = useDispatch()
	if (isFetching || isLoading) {
		return null
	}
	if (isError) {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
	}
	const renderFilters = () => {
		return filters.map(filter => (
			<button
				key={filter.name}
				onClick={() => dispatch(setFilter(filter.name))}
				className={`btn ${filter.colorClass} ${classNames({
					active: activeFilter === filter.name,
				})}`}
			>
				{filter.label}
			</button>
		))
	}
	return (
		<div className='card shadow-lg mt-4'>
			<div className='card-body'>
				<p className='card-text'>Отфильтруйте героев по элементам</p>
				<div className='btn-group'>
					<button
						onClick={() => dispatch(setFilter('all'))}
						className={`btn btn-outline-dark ${classNames({
							active: activeFilter === 'all',
						})}`}
					>
						Все
					</button>
					{renderFilters()}
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters

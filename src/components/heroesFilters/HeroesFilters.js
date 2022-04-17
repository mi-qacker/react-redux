import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, selectAll } from './filtersSlice'
import store from '../../store'

const HeroesFilters = () => {
	const { activeFilter, filtersLoadingStatus } = useSelector(state => state.filters)
	const filters = selectAll(store.getState())
	const dispatch = useDispatch()

	if (filtersLoadingStatus === 'loading') {
		return null
	}
	if (filtersLoadingStatus === 'error') {
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

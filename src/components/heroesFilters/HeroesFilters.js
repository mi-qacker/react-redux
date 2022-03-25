import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilters, setFilter } from '../../actions'
import { useHttp } from '../../hooks/http.hook'
import { useEffect } from 'react'
import Spinner from '../spinner/Spinner'

const HeroesFilters = () => {
	const { activeFilter, filters, filtersLoadingStatus } = useSelector(state => state.filters)
	const { request } = useHttp()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchFilters(request))
		// eslint-disable-next-line
	}, [])

	if (filtersLoadingStatus === 'loading') {
		return <Spinner />
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

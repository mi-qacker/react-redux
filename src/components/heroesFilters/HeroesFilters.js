// TODO Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../actions';

const HeroesFilters = () => {
	const { filters } = useSelector((state) => state);
	const dispatch = useDispatch();
	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					<button
						onClick={() => dispatch(setFilter([]))}
						className={`btn btn-outline-dark ${classNames({
							active: filters.length === 0,
						})}`}
					>
						Все
					</button>
					<button
						onClick={() => dispatch(setFilter(['fire']))}
						className={`btn btn-danger ${classNames({
							active: filters.includes('fire'),
						})}`}
					>
						Огонь
					</button>
					<button
						onClick={() => dispatch(setFilter(['water']))}
						className={`btn btn-primary ${classNames({
							active: filters.includes('water'),
						})}`}
					>
						Вода
					</button>
					<button
						onClick={() => dispatch(setFilter(['wind']))}
						className={`btn btn-success ${classNames({
							active: filters.includes('wind'),
						})}`}
					>
						Ветер
					</button>
					<button
						onClick={() => dispatch(setFilter(['earth']))}
						className={`btn btn-secondary ${classNames({
							active: filters.includes('earth'),
						})}`}
					>
						Земля
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeroesFilters;

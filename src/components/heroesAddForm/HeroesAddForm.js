import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHttp } from '../../hooks/http.hook'
import { heroCreated } from '../heroesList/heroesSlice'

const HeroesAddForm = () => {
	const { filters } = useSelector(state => state.filters)
	const dispatch = useDispatch()
	const { request } = useHttp()
	const {
		register,
		handleSubmit,
		resetField,
	} = useForm()

	const onSubmit = (body) => {
		request('http://localhost:3001/heroes', 'POST', JSON.stringify(body))
			.then((data) => dispatch(heroCreated(data)))
		resetField('name')
		resetField('description')
		resetField('element')
	}

	const renderFilters = () => {
		return filters.map(filter => (
			<option key={filter.name} value={filter.name}>{filter.label}</option>
		))
	}

	return (
		<form
			className='border p-4 shadow-lg rounded'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='mb-3'>
				<label htmlFor='name' className='form-label fs-4'>
					Имя нового героя
				</label>
				<input
					type='text'
					className='form-control'
					id='name'
					placeholder='Как меня зовут?'
					{...register('name', { required: true })}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='text' className='form-label fs-4'>
					Описание
				</label>
				<textarea
					className='form-control'
					id='text'
					placeholder='Что я умею?'
					style={{ height: '130px' }}
					{...register('description', { required: true })}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='element' className='form-label'>
					Выбрать элемент героя
				</label>
				<select
					className='form-select'
					id='element'
					{...register('element', { required: true })}
				>
					<option value=''>Я владею элементом...</option>
					{renderFilters()}
				</select>
			</div>

			<button type='submit' className='btn btn-primary'>
				Создать
			</button>
		</form>
	)
}

export default HeroesAddForm

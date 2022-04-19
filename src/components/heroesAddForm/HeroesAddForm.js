import { useForm } from 'react-hook-form'
import { useCreateHeroMutation } from '../../api/apiHeroesSlice'
import { useGetFiltersQuery } from '../../api/apiFiltersSlice'

const HeroesAddForm = () => {
	const [createHero] = useCreateHeroMutation()
	const { data: filters = [], isFetching, isLoading, isError } = useGetFiltersQuery()
	const {
		register,
		handleSubmit,
		resetField,
	} = useForm()

	const onSubmit = (body) => {
		createHero(body).unwrap()
		resetField('name')
		resetField('description')
		resetField('element')
	}

	if (isFetching || isLoading) {
		return null
	}
	if (isError) {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
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

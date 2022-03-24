const HeroesListItem = ({ name, description, onDeleteHero, colorClass }) => {
	return (
		<li
			className={`card flex-row mb-4 shadow-lg text-white`}
		>
			<img
				src='http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg'
				className='img-fluid w-25 d-inline'
				alt='unknown hero'
				style={{ objectFit: 'cover' }}
			/>
			<div className={`card-body ${colorClass} bg-gradient`}>
				<h3 className='card-title'>{name}</h3>
				<p className='card-text'>{description}</p>
			</div>
			<span className='position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light'>
				<button
					onClick={() => onDeleteHero()}
					type='button'
					className='btn-close btn-close'
					aria-label='Close'
				/>
			</span>
		</li>
	)
}

export default HeroesListItem

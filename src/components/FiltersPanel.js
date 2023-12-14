import React from 'react'

const FiltersPanel = ({ currFilter, changeFilter }) => {
	const checkFilter = (str) => (str === currFilter ? 'selected' : '')
	const handler = (newFilter) => {
		changeFilter(newFilter)
	}
	return (
		<ul className="filters">
			<li>
				<button
					className={checkFilter('All')}
					onClick={() => {
						// handler('All')
						changeFilter('All')
					}}
				>
					All
				</button>
			</li>
			<li>
				<button
					className={checkFilter('Active')}
					onClick={() => {
						handler('Active')
					}}
				>
					Active
				</button>
			</li>
			<li>
				<button
					className={checkFilter('Completed')}
					onClick={() => {
						handler('Completed')
					}}
				>
					Completed
				</button>
			</li>
		</ul>
	)
}

export default FiltersPanel

import React from 'react'
// import TasksFilters from './filters-panel'
import TasksFilters from './FiltersPanel'

const Footer = ({ activeTasks, currFilter, changeFilter, deleteCompletedTasks }) => {
	return (
		<footer className="footer">
			<span className="todo-count">{activeTasks} task(s) left to do</span>
			<TasksFilters currFilter={currFilter} changeFilter={changeFilter} />
			<button className="clear-completed" onClick={deleteCompletedTasks}>
				Clear completed
			</button>
		</footer>
	)
}

export default Footer

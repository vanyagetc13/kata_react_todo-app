import React from 'react'
import Task from './todo-task'

const TodoList = ({
	data,
	deleteTaskHandler,
	changeTaskDescription,
	setEditingStatus,
	toggleStatus,
}) => {
	return (
		<ul className='todo-list'>
			{data.map(task => (
				<Task
					taskData={task}
					key={task.id}
					deleteTaskHandler={deleteTaskHandler}
					changeTaskDescription={changeTaskDescription}
					setEditingStatus={setEditingStatus}
					toggleStatus={toggleStatus}
				/>
			))}
		</ul>
	)
}

export default TodoList

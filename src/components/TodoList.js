import React from 'react'
import Task from './TodoTask'

const TodoList = ({
	data,
	deleteTaskHandler,
	changeTaskDescription,
	setEditingStatus,
	toggleStatus,
	setTodoInterval,
	deleteTodoInterval,
}) => {
	return (
		<ul className="todo-list">
			{data.map((task) => (
				<Task
					taskData={task}
					key={task.id}
					deleteTaskHandler={deleteTaskHandler}
					changeTaskDescription={changeTaskDescription}
					setEditingStatus={setEditingStatus}
					toggleStatus={toggleStatus}
					setTodoInterval={setTodoInterval}
					deleteTodoInterval={deleteTodoInterval}
				/>
			))}
		</ul>
	)
}

export default TodoList

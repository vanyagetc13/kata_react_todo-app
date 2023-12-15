import React, { useState } from 'react'
import Footer from './components/footer'
import NewTaskForm from './components/NewTaskForm'
import TodoList from './components/TodoList'

const initialData = [
	{
		description: 'Completed task',
		created: new Date(new Date() - 10000),
		status: 'completed',
		timer: 90,
		timerInterval: null,
		id: 0,
	},
	{
		description: 'Editing task',
		created: new Date(new Date() - 1200000),
		status: 'active',
		isEditing: false,
		timer: 160,
		timerInterval: null,
		id: 1,
	},
	{
		description: 'Active task',
		created: new Date(new Date() - 240000),
		status: 'active',
		timer: 200,
		timerInterval: null,
		id: 2,
	},
]

function App() {
	const [data, setData] = useState(initialData)
	const [currentFilter, setCurrentFilter] = useState('All')
	const [lastID, setLastID] = useState(2)
	const addNewTask = (todoDescription, minutes, seconds) => {
		const newTask = {
			description: todoDescription,
			created: new Date(),
			status: 'active',
			timer: minutes * 60 + seconds,
			id: lastID + 1,
		}
		setData((prev) => [...prev, newTask])
		setLastID((prev) => prev + 1)
	}
	const showFilteredTasks = () => {
		if (currentFilter.toLowerCase() === 'all') return data
		return data.filter((task) => task.status.toLowerCase() === currentFilter.toLowerCase())
	}
	const deleteTaskById = (id) => {
		setData((prev) => {
			const newData = prev.filter((task) => task.id !== id)
			return newData
		})
	}
	const deleteCompletedTasks = () => {
		setData((prev) => prev.filter((task) => task.status.toLowerCase() !== 'completed'))
	}
	const changeTaskDescription = (id, newDescription) => {
		setData((state) => {
			const taskId = state.findIndex((task) => task.id === id)
			const task = state[taskId]
			const newData = [...state]
			newData.splice(taskId, 1, {
				...task,
				description: newDescription,
				isEditing: false,
			})
			return newData
		})
	}
	const setEditingStatus = (id) => {
		setData((state) => {
			const taskId = state.findIndex((task) => task.id === id)
			const task = state[taskId]
			const newData = [...state]
			newData.splice(taskId, 1, { ...task, isEditing: true })
			return newData
		})
	}
	const toggleStatus = (id) => {
		setData((prev) => {
			const taskId = prev.findIndex((task) => task.id === id)
			const task = prev[taskId]
			const newData = [...prev]
			newData.splice(taskId, 1, {
				...task,
				status: task.status === 'active' ? 'completed' : 'active',
			})
			return newData
		})
	}
	const getActiveTasksCount = () => {
		return data.reduce((acc, curr) => {
			if (curr.status.toLowerCase() === 'active') return acc + 1
			else return acc
		}, 0)
	}

	const changeTimerInterval = (id, interval) => {
		setData((prev) => {
			const newData = [...prev]
			const taskID = newData.findIndex((task) => task.id === id)
			const newTask = { ...newData[taskID], timerInterval: interval }
			newData.splice(taskID, 1, newTask)
			return newData
		})
	}

	const changeTaskTimerByID = (id, newTimer) => {
		setData((prev) => {
			const newData = [...prev]
			const taskID = newData.findIndex((task) => task.id === id)
			const newTask = { ...newData[taskID], timer: newTimer }
			newData.splice(taskID, 1, newTask)
			return newData
		})
	}

	const setTodoInterval = (id) => {
		const taskData = data.find((todo) => todo.id === id)
		if (!taskData) return
		if (taskData.timerInterval) deleteTodoInterval(id)
		if (taskData.timer <= 0) return
		const interval = setInterval(() => {
			const taskData = data.find((todo) => todo.id === id)
			const amount = taskData.timer
			if (amount > 0) {
				changeTaskTimerByID(taskData.id, amount - 1)
			} else {
				deleteTodoInterval(id)
			}
		}, 1000)
		changeTimerInterval(taskData.id, interval)
	}
	const deleteTodoInterval = (id) => {
		const taskData = data.find((todo) => todo.id === id)
		if (!taskData) return
		if (taskData.timerInterval !== null) clearInterval(taskData.timerInterval)
		changeTimerInterval(taskData.id, null)
	}

	return (
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<NewTaskForm addNewTaskHandler={addNewTask} />
			</header>
			<section className="main">
				<TodoList
					data={showFilteredTasks()}
					deleteTaskHandler={deleteTaskById}
					changeTaskDescription={changeTaskDescription}
					setEditingStatus={setEditingStatus}
					toggleStatus={toggleStatus}
					setTodoInterval={setTodoInterval}
					deleteTodoInterval={deleteTodoInterval}
				/>
				<Footer
					currFilter={currentFilter}
					changeFilter={setCurrentFilter}
					activeTasks={getActiveTasksCount()}
					deleteCompletedTasks={deleteCompletedTasks}
				/>
			</section>
		</section>
	)
}

export default App

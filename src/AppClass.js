import React, { Component } from 'react'
import Footer from './components/footer'
import NewTaskForm from './components/new-task-form'
import TodoList from './components/TodoList'

class App extends Component {
	constructor() {
		super()
		this.state = {
			data: [
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
			],
			lastId: 2,
			currentFilter: 'All',
		}
	}

	addNewTask = (todoDescription, minutes, seconds) => {
		const newTask = {
			description: todoDescription,
			created: new Date(),
			status: 'active',
			timer: minutes * 60 + seconds,
			id: this.state.lastId + 1,
		}
		const newData = [...this.state.data, newTask]
		this.setState({
			...this.state,
			data: newData,
			lastId: this.state.lastId + 1,
		})
	}

	changeTimerInterval = (id, interval) => {
		this.setState((prev) => {
			const newData = [...this.state.data]
			const taskID = newData.findIndex((task) => task.id === id)
			const newTask = { ...newData[taskID], timerInterval: interval }
			newData.splice(taskID, 1, newTask)
			return {
				...prev,
				data: newData,
			}
		})
	}

	setTodoInterval = (id) => {
		const taskData = this.state.data.find((todo) => todo.id === id)
		if (!taskData) return
		if (taskData.timerInterval) this.deleteTodoInterval(id)
		if (taskData.timer <= 0) return
		const interval = setInterval(() => {
			const taskData = this.state.data.find((todo) => todo.id === id)
			const amount = taskData.timer
			console.log(amount, taskData.id)
			if (amount > 0) {
				this.changeTaskTimerByID(taskData.id, amount - 1)
			} else {
				this.deleteTodoInterval(id)
			}
		}, 1000)
		this.changeTimerInterval(taskData.id, interval)
	}

	deleteTodoInterval = (id) => {
		const taskData = this.state.data.find((todo) => todo.id === id)
		if (!taskData) return
		if (taskData.timerInterval !== null) clearInterval(taskData.timerInterval)
		this.changeTimerInterval(taskData.id, null)
	}

	changeTaskTimerByID = (id, newTimer) => {
		this.setState((prev) => {
			const newData = [...this.state.data]
			const taskID = newData.findIndex((task) => task.id === id)
			const newTask = { ...newData[taskID], timer: newTimer }
			newData.splice(taskID, 1, newTask)
			return {
				...prev,
				data: newData,
			}
		})
	}

	toggleStatus = (id) => {
		const taskId = this.state.data.findIndex((task) => task.id === id)
		const task = this.state.data[taskId]
		const newData = this.state.data
		newData.splice(taskId, 1, {
			...task,
			status: task.status === 'active' ? 'completed' : 'active',
		})
		this.setState({ ...this.state, data: newData })
	}
	deleteTaskById = (id) => {
		const newData = this.state.data.filter((task) => task.id !== id)
		this.setState({ ...this.state, data: newData })
	}
	deleteCompletedTasks = () => {
		const newData = this.state.data.filter((task) => task.status !== 'completed')
		this.setState({ ...this.state, data: newData })
	}
	changeCurrentFilter = (newFilter) => {
		this.setState({ ...this.state, currentFilter: newFilter })
	}
	changeTaskDescription = (id, newDescription) => {
		const taskId = this.state.data.findIndex((task) => task.id === id)
		const task = this.state.data[taskId]
		const newData = this.state.data
		newData.splice(taskId, 1, {
			...task,
			description: newDescription,
			isEditing: false,
		})
		this.setState({
			...this.state,
			data: newData,
		})
	}
	setEditingStatus = (id) => {
		const taskId = this.state.data.findIndex((task) => task.id === id)
		const task = this.state.data[taskId]
		const newData = this.state.data
		newData.splice(taskId, 1, { ...task, isEditing: true })
		this.setState({
			...this.state,
			data: newData,
		})
	}
	showActiveTasksCount = () => {
		return this.state.data.reduce((acc, curr) => {
			if (curr.status === 'active') return acc + 1
			else return acc
		}, 0)
	}
	showFilteredTasks = () => {
		let filter
		if (this.state.currentFilter === 'Active') {
			filter = 'active'
		} else if (this.state.currentFilter === 'Completed') {
			filter = 'completed'
		} else {
			return this.state.data
		}
		return this.state.data.filter((task) => task.status === filter)
	}
	render() {
		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<NewTaskForm addNewTaskHandler={this.addNewTask} />
				</header>
				<section className="main">
					<TodoList
						data={this.showFilteredTasks()}
						deleteTaskHandler={this.deleteTaskById}
						changeTaskDescription={this.changeTaskDescription}
						setEditingStatus={this.setEditingStatus}
						toggleStatus={this.toggleStatus}
						setTodoInterval={this.setTodoInterval}
						deleteTodoInterval={this.deleteTodoInterval}
					/>
					<Footer
						currFilter={this.state.currentFilter}
						changeFilter={this.changeCurrentFilter}
						activeTasks={this.showActiveTasksCount()}
						deleteCompletedTasks={this.deleteCompletedTasks}
					/>
				</section>
			</section>
		)
	}
}

export default App

import React, { useState } from 'react'

const NewTaskForm = ({ addNewTaskHandler }) => {
	const [todoDescription, setTodoDescription] = useState('')
	const [todoMinutes, setTodoMinutes] = useState('')
	const [todoSeconds, setTodoSeconds] = useState('')
	const [error, setError] = useState('')

	const createTaskHandler = (e) => {
		e.preventDefault()
		const minutes = todoMinutes === '' ? 0 : Number(todoMinutes)
		const seconds = todoSeconds === '' ? 0 : Number(todoSeconds)
		if (minutes === 0 && seconds === 0) {
			setError('Set the timer (timer can not be 0)')
			return
		}
		if (todoDescription.trim() !== '') addNewTaskHandler(todoDescription.trim(), minutes, seconds)
		setTodoDescription('')
		setTodoMinutes('')
		setTodoSeconds('')
	}

	const minutesChangeHandler = (e) => {
		const value = e.target.value
		setTodoMinutes(value)
	}

	const secondsChangeHandler = (e) => {
		const value = e.target.value
		setTodoSeconds(value)
	}

	return (
		<form onSubmit={createTaskHandler} className="new-todo-form">
			{error && <span className="error">{error}</span>}
			<input
				className="new-todo"
				placeholder="What needs to be done?"
				autoFocus
				value={todoDescription}
				onChange={(e) => {
					const newValue = e.currentTarget.value
					setTodoDescription(newValue)
				}}
			/>
			<input
				className="new-todo-form__timer"
				placeholder="Min"
				min={0}
				type="number"
				value={todoMinutes}
				onChange={minutesChangeHandler}
			/>
			<input
				className="new-todo-form__timer"
				placeholder="Sec"
				type="number"
				min={0}
				max={59}
				value={todoSeconds}
				onChange={secondsChangeHandler}
			/>
			<button type="submit" />
		</form>
	)
}

export default NewTaskForm

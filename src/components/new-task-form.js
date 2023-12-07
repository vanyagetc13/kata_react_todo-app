import React, { Component } from 'react'

export default class NewTaskForm extends Component {
	state = {
		todoDescription: '',
		todoMinutes: '',
		todoSeconds: '',
	}
	inputRef = null

	createTaskHandler = (e) => {
		e.preventDefault()
		const minutes = this.state.todoMinutes === '' ? 0 : Number(this.state.todoMinutes)
		const seconds = this.state.todoSeconds === '' ? 0 : Number(this.state.todoSeconds)
		if (minutes === 0 && seconds === 0) {
			this.setState((prev) => ({ ...prev, error: 'Set the timer (timer can not be 0)' }))
			return
		}
		if (this.state.todoDescription.trim() !== '')
			this.props.addNewTaskHandler(this.state.todoDescription.trim(), minutes, seconds)
		this.setState((prev) => ({ ...prev, todoDescription: '', todoMinutes: '', todoSeconds: '', error: null }))
	}

	render() {
		const minutesChangeHandler = (e) => {
			const value = e.target.value
			this.setState({
				...this.state,
				todoMinutes: value,
			})
		}

		const secondsChangeHandler = (e) => {
			const value = e.target.value
			this.setState({
				...this.state,
				todoSeconds: value,
			})
		}
		return (
			<form onSubmit={this.createTaskHandler} className="new-todo-form">
				{this.state.error && <span className="error">{this.state.error}</span>}
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					value={this.state.todoDescription}
					onChange={(e) => {
						const newValue = e.currentTarget.value
						this.setState({ ...this.state, todoDescription: newValue })
					}}
				/>
				<input
					className="new-todo-form__timer"
					placeholder="Min"
					min={0}
					type="number"
					value={this.state.todoMinutes}
					onChange={minutesChangeHandler}
				/>
				<input
					className="new-todo-form__timer"
					placeholder="Sec"
					type="number"
					min={0}
					max={59}
					value={this.state.todoSeconds}
					onChange={secondsChangeHandler}
				/>
				<button type="submit" />
			</form>
		)
	}
}

// const NewTaskFormFunc = () => {
// 	const [todoDescription, settodoDescription] = useState('')
// 	return (
// 		<input
// 			className='new-todo'
// 			placeholder='What needs to be done?'
// 			autoFocus
// 			value={todoDescription}
// 			onChange={e => settodoDescription(e.currentTarget.value.trim())}
// 		/>
// 	)
// }

// export default NewTaskFormFunc

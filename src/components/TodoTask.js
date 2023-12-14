import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useState } from 'react'

const TodoTask = ({
	taskData,
	deleteTaskHandler,
	changeTaskDescription,
	toggleStatus,
	setTodoInterval,
	deleteTodoInterval,
	setEditingStatus,
}) => {
	const [intervalID, setIntervalID] = useState(null)
	const [newValue, setNewValue] = useState(taskData.description)
	const [timeAgo, setTimeAgo] = useState(getTimeAgo())

	const getTimeAgo = () => {
		return formatDistanceToNow(taskData.created, {
			includeSeconds: true,
		})
	}
	const deleteHandler = () => {
		deleteTaskHandler(taskData.id)
	}
	const editHandler = (e) => {
		if (e.key === 'Enter' || e.keyCode === 13) changeTaskDescription(taskData.id, newValue)
	}
	const checkClass = () => {
		if (taskData.isEditing) return 'editing'
		else return taskData.status
	}
	const taskStatusToggle = () => {
		pauseTimer()
		toggleStatus(taskData.id)
	}

	useEffect(() => {
		const id = setInterval(() => {
			setTimeAgo(getTimeAgo())
		}, 1000)
		setIntervalID(id)
		return () => clearInterval(intervalID)
	}, [])

	const playTimer = () => {
		setTodoInterval(taskData.id)
	}

	const pauseTimer = () => {
		deleteTodoInterval(taskData.id)
	}
	const playHandler = (e) => {
		e.stopPropagation()
		playTimer()
	}
	const pauseHandler = (e) => {
		e.stopPropagation()
		pauseTimer()
	}
	const getMinutesAndSeconds = (seconds) => {
		let minutes = 0
		if (seconds >= 60) {
			minutes = Math.floor(seconds / 60)
			seconds = seconds - minutes * 60
		}
		return { minutes, seconds }
	}
	const { minutes, seconds } = getMinutesAndSeconds(taskData.timer)
	return (
		<li className={checkClass()}>
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					checked={taskData.status === 'completed'}
					onChange={taskStatusToggle}
				/>
				<label
					onClick={(e) => {
						e.preventDefault()
						taskStatusToggle()
					}}
				>
					<span className="title">{taskData.description}</span>
					{taskData.status !== 'completed' && (
						<span className="description">
							<button className="icon icon-play" onClick={playHandler} />
							<button className="icon icon-pause" onClick={pauseHandler} />
							<span style={{ marginLeft: 5 }}>{minutes + ':' + seconds}</span>
						</span>
					)}
					<span className="description">created {timeAgo} ago</span>
				</label>
				<button
					className="icon icon-edit"
					onClick={() => {
						setEditingStatus(taskData.id)
					}}
				></button>
				<button className="icon icon-destroy" onClick={deleteHandler}></button>
			</div>
			{taskData?.isEditing && (
				<input
					type="text"
					className="edit"
					value={newValue}
					onChange={(e) => {
						setNewValue(e.currentTarget.value)
					}}
					onKeyUp={editHandler}
					autoFocus
				/>
			)}
		</li>
	)
}

export default TodoTask

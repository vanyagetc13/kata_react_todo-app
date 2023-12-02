import React from 'react'
import { formatDistanceToNow } from 'date-fns'

class Task extends React.Component {
  getTimeAgo = () => {
    return formatDistanceToNow(this.props.taskData.created, {
      includeSeconds: true,
    })
  }
  state = {
    newValue: this.props.taskData.description,
    timeAgo: this.getTimeAgo(),
    timer: {
      playing: false,
      amount: this.props.taskData.timer,
    },
  }
  interval = null
  deleteHandler = () => {
    this.props.deleteTaskHandler(this.props.taskData.id)
  }
  editHandler = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13)
      this.props.changeTaskDescription(this.props.taskData.id, this.state.newValue)
  }
  checkClass = () => {
    if (this.props.taskData.isEditing) return 'editing'
    else return this.props.taskData.status
  }
  taskStatusToggle = () => {
    this.props.toggleStatus(this.props.taskData.id)
  }

  componentDidMount() {
    // this.playTimer() // ?
    setInterval(() => {
      this.setState((prev) => ({
        ...prev,
        timeAgo: this.getTimeAgo(),
      }))
    }, 1000)
  }

  playTimer = () => {
    this.interval = setInterval(() => {
      if (this.state.timer.amount > 0)
        this.setState((prev) => ({
          ...prev,
          timer: {
            ...this.state.timer,
            amount: this.state.timer.amount - 1,
          },
        }))
    }, 1000)
  }

  pauseTimer = () => {
    if (this.interval) clearInterval(this.interval)
    this.interval = null
  }

  render() {
    const playHandler = (e) => {
      e.stopPropagation()
      this.playTimer()
    }
    const pauseHandler = (e) => {
      e.stopPropagation()
      this.pauseTimer()
    }
    const getMinutesAndSeconds = (seconds) => {
      let minutes = 0
      if (seconds >= 60) {
        minutes = Math.floor(seconds / 60)
        seconds = seconds - minutes * 60
      }
      return { minutes, seconds }
    }
    const { minutes, seconds } = getMinutesAndSeconds(this.state.timer.amount)
    return (
      <li className={this.checkClass()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.taskData.status === 'completed'}
            onChange={this.taskStatusToggle}
            // Если имелось ввиду такая работа данного инпута
          />
          <label onClick={this.taskStatusToggle}>
            <span className="title">{this.props.taskData.description}</span>
            <span className="description">
              <button className="icon icon-play" onClick={playHandler} />
              <button className="icon icon-pause" onClick={pauseHandler} />
              <span style={{ marginLeft: 5 }}>{minutes + ':' + seconds}</span>
            </span>
            <span className="description">created {this.state.timeAgo} ago</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              this.props.setEditingStatus(this.props.taskData.id)
            }}
          ></button>
          <button className="icon icon-destroy" onClick={this.deleteHandler}></button>
        </div>
        {this.props.taskData?.isEditing && (
          <input
            type="text"
            className="edit"
            value={this.state.newValue}
            onChange={(e) => {
              this.setState({ ...this.state, newValue: e.currentTarget.value })
            }}
            onKeyUp={this.editHandler}
            autoFocus
          />
        )}
      </li>
    )
  }
}

export default Task

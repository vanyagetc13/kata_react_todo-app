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
    this.pauseTimer()
    this.props.toggleStatus(this.props.taskData.id)
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((prev) => ({
        ...prev,
        timeAgo: this.getTimeAgo(),
      }))
    }, 1000)
  }

  componentWillUnmount() {
    this.pauseTimer()
  }

  playTimer = () => {
    if (this.interval) {
      this.pauseTimer()
    }
    if (this.props.taskData.timer > 0)
      this.interval = setInterval(() => {
        const amount = this.props.taskData.timer
        console.log('tick', this.props.taskData.timer)
        if (amount > 0) {
          this.props.changeTaskTimerByID(this.props.taskData.id, amount - 1)
        } else {
          this.pauseTimer()
        }
      }, 1000)
  }

  pauseTimer = () => {
    if (this.interval !== null) clearInterval(this.interval)
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
    const { minutes, seconds } = getMinutesAndSeconds(this.props.taskData.timer)
    return (
      <li className={this.checkClass()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.taskData.status === 'completed'}
            onChange={this.taskStatusToggle}
          />
          <label
            onClick={(e) => {
              e.preventDefault()
              this.taskStatusToggle()
            }}
          >
            <span className="title">{this.props.taskData.description}</span>
            {this.props.taskData.status !== 'completed' && (
              <span className="description">
                <button className="icon icon-play" onClick={playHandler} />
                <button className="icon icon-pause" onClick={pauseHandler} />
                <span style={{ marginLeft: 5 }}>{minutes + ':' + seconds}</span>
              </span>
            )}
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

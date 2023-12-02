import React, { Component } from 'react'

export default class NewTaskForm extends Component {
  state = {
    todoDescription: '',
    todoMinutes: '',
    todoSeconds: '',
  }
  inputRef = null
  // constructor(){
  // 	super()
  // 	this.state = {
  // 		todoDescription: ''
  // 	}
  // }

  render() {
    const handler = (e) => {
      e.preventDefault()
      const minutes = this.state.todoMinutes < 0 || this.state.todoMinutes === '' ? 0 : Number(this.state.todoMinutes)
      const seconds = this.state.todoSeconds >= 60 || this.state.todoSeconds === '' ? 0 : Number(this.state.todoSeconds)
      if (this.state.todoDescription.trim() !== '')
        this.props.addNewTaskHandler(this.state.todoDescription.trim(), minutes, seconds)
      this.setState({ ...this.state, todoDescription: '', todoMinutes: '', todoSeconds: '' })
      // if (this.inputRef) this.inputRef.focus()
    }
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
      <form onSubmit={handler} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.todoDescription}
          // ref={input => {
          // 	this.inputRef = input
          // }}
          onChange={(e) => {
            const newValue = e.currentTarget.value
            this.setState({ ...this.state, todoDescription: newValue })
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          value={this.state.todoMinutes}
          onChange={minutesChangeHandler}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
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

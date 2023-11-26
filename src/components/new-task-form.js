import React, { Component } from 'react'

export default class NewTaskForm extends Component {
  state = {
    todoDescription: '',
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
      if (this.state.todoDescription.trim() !== '') this.props.addNewTaskHandler(this.state.todoDescription)
      this.setState({ ...this.state, todoDescription: '' })
      // if (this.inputRef) this.inputRef.focus()
    }
    return (
      <form onSubmit={handler}>
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

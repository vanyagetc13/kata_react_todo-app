import React from 'react'

import TasksFilters from './filters-panel'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.activeTasks} task(s) left to do</span>
        <TasksFilters currFilter={this.props.currFilter} changeFilter={this.props.changeFilter} />
        <button className="clear-completed" onClick={this.props.deleteCompletedTasks}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer

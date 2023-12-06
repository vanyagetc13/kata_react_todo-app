import React from 'react'

import Task from './todo-task'

const TodoList = ({
  data,
  deleteTaskHandler,
  changeTaskDescription,
  setEditingStatus,
  toggleStatus,
  changeTaskTimerByID,
}) => {
  return (
    <ul className="todo-list">
      {data.map((task) => (
        <Task
          taskData={task}
          key={task.id}
          deleteTaskHandler={deleteTaskHandler}
          changeTaskDescription={changeTaskDescription}
          setEditingStatus={setEditingStatus}
          toggleStatus={toggleStatus}
          changeTaskTimerByID={changeTaskTimerByID}
        />
      ))}
    </ul>
  )
}

export default TodoList

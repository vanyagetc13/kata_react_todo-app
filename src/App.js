import React, { Component } from 'react';
import Footer from './components/footer';
import NewTaskForm from './components/new-task-form';
import TodoList from './components/todo-list';

class App extends Component {
  state = {
    data: [
      {
        description: 'Completed task',
        created: new Date(new Date() - 10000),
        status: 'completed',
        id: 0,
      },
      {
        description: 'Editing task',
        created: new Date(new Date() - 1200000),
        status: 'active',
        isEditing: true,
        id: 1,
      },
      {
        description: 'Active task',
        created: new Date(new Date() - 240000),
        status: 'active',
        id: 2,
      },
    ],
    lastId: 2,
    currentFilter: 'All',
  };

  addNewTask = (todoDescription) => {
    const newTask = {
      description: todoDescription,
      created: new Date(),
      status: 'active',
      id: this.state.lastId + 1,
    };
    const newData = [...this.state.data, newTask];
    this.setState({
      ...this.state,
      data: newData,
      lastId: this.state.lastId + 1,
    });
  };
  toggleStatus = (id) => {
    console.log('toggling status', id);
    const taskId = this.state.data.findIndex((task) => task.id === id);
    const task = this.state.data[taskId];
    const newData = this.state.data;
    newData.splice(taskId, 1, {
      ...task,
      status: task.status === 'active' ? 'completed' : 'active',
    });
    this.setState({ ...this.state, data: newData });
  };
  deleteTaskById = (id) => {
    const newData = this.state.data.filter((task) => task.id !== id);
    this.setState({ ...this.state, data: newData });
  };
  deleteCompletedTasks = () => {
    const newData = this.state.data.filter((task) => task.status !== 'completed');
    this.setState({ ...this.state, data: newData });
  };
  changeCurrentFilter = (newFilter) => {
    this.setState({ ...this.state, currentFilter: newFilter });
  };
  changeTaskDescription = (id, newDescription) => {
    const taskId = this.state.data.findIndex((task) => task.id === id);
    const task = this.state.data[taskId];
    const newData = this.state.data;
    newData.splice(taskId, 1, {
      ...task,
      description: newDescription,
      isEditing: false,
    });
    this.setState({
      ...this.state,
      data: newData,
    });
  };
  setEditingStatus = (id) => {
    const taskId = this.state.data.findIndex((task) => task.id === id);
    const task = this.state.data[taskId];
    const newData = this.state.data;
    newData.splice(taskId, 1, { ...task, isEditing: true });
    this.setState({
      ...this.state,
      data: newData,
    });
  };
  showActiveTasksCount = () => {
    return this.state.data.reduce((acc, curr) => {
      if (curr.status === 'active') return acc + 1;
      else return acc;
    }, 0);
  };
  showFilteredTasks = () => {
    let filter;
    switch (this.state.currentFilter) {
      case 'Completed':
        filter = 'completed';
        break;
      case 'Active':
        filter = 'active';
        break;
      default:
        return this.state.data;
    }
    return this.state.data.filter((task) => task.status === filter);
  };
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
          />
          <Footer
            currFilter={this.state.currentFilter}
            changeFilter={this.changeCurrentFilter}
            activeTasks={this.showActiveTasksCount()}
            deleteCompletedTasks={this.deleteCompletedTasks}
          />
        </section>
      </section>
    );
  }
}

export default App;

import React from 'react';
import { formatDistanceToNow } from 'date-fns';

class Task extends React.Component {
  getTimeAgo = () => {
    return formatDistanceToNow(this.props.taskData.created, {
      includeSeconds: true,
    });
  };
  state = {
    newValue: this.props.taskData.description,
    timeAgo: this.getTimeAgo(),
  };
  deleteHandler = () => {
    this.props.deleteTaskHandler(this.props.taskData.id);
  };
  editHandler = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13)
      this.props.changeTaskDescription(this.props.taskData.id, this.state.newValue);
  };
  checkClass = () => {
    if (this.props.taskData.isEditing) return 'editing';
    else return this.props.taskData.status;
  };
  render() {
    setInterval(() => {
      this.setState({ ...this.state, timeAgo: this.getTimeAgo() });
    }, 1000);
    return (
      <li className={this.checkClass()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.taskData.status === 'completed'}
            // Если имелось ввиду такая работа данного инпута
          />
          <label
            onClick={() => {
              this.props.toggleStatus(this.props.taskData.id);
            }}
          >
            <span className="description">{this.props.taskData.description}</span>
            <span className="created">created {this.getTimeAgo()} ago</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              this.props.setEditingStatus(this.props.taskData.id);
            }}
          ></button>
          <button className="icon icon-destroy" onClick={this.deleteHandler}></button>
        </div>
        {this.props.taskData.isEditing && (
          <input
            type="text"
            className="edit"
            value={this.state.newValue}
            onChange={(e) => {
              this.setState({ ...this.state, newValue: e.currentTarget.value });
            }}
            onKeyUp={this.editHandler}
            autoFocus
          />
        )}
      </li>
    );
  }
}

export default Task;

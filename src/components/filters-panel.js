import React from 'react'

class TasksFilters extends React.Component {
  static propTypes = {
    currFilter: (props, propName, componentName) => {
      const value = props[propName]
      if (typeof value === 'string') return null
      return new TypeError(`${propName} in ${componentName} must be a string`)
    },
    changeFilter: (props, propName, componentName) => {
      const value = props[propName]
      if (typeof value === 'function') return null
      return new TypeError(`${propName} in ${componentName} must be a function`)
    },
  }
  render() {
    const { currFilter, changeFilter } = this.props
    const checkFilter = (str) => (str === currFilter ? 'selected' : '')
    const handler = (newFilter) => {
      changeFilter(newFilter)
    }
    return (
      <ul className="filters">
        <li>
          <button
            className={checkFilter('All')}
            onClick={() => {
              // handler('All')
              changeFilter('All')
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={checkFilter('Active')}
            onClick={() => {
              handler('Active')
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={checkFilter('Completed')}
            onClick={() => {
              handler('Completed')
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilters.defaultProps = {
  currFilter: '',
  changeFilter: () => {},
}
export default TasksFilters

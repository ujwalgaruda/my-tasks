import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import TaskItem from '../TaskItem'
import TagItem from '../TagItem'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    tasksList: [],
    taskInput: '',
    selectedTag: tagsList[0].optionId,
    filterTag: [],
  }

  updateFilterTag = id => {
    const {filterTag} = this.state

    const isFound = filterTag.find(eachItem => eachItem === id)
    if (isFound) {
      const updatedFilters = filterTag.filter(eachItem => eachItem !== id)

      this.setState({filterTag: updatedFilters})
    } else {
      this.setState(prevState => ({filterTag: [...prevState.filterTag, id]}))
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const {taskInput, selectedTag} = this.state
    const itemDetails = {
      id: uuidv4(),
      task: taskInput,
      tag: selectedTag,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, itemDetails],
      taskInput: '',
      selectedTag: tagsList[0].optionId,
    }))
  }

  onTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onTagInput = event => {
    this.setState({selectedTag: event.target.value.toUpperCase()})
  }

  render() {
    const {tasksList, taskInput, selectedTag, filterTag} = this.state
    console.log(filterTag)
    const isFiltering = filterTag.length !== 0
    const areTasksZero = tasksList.length === 0
    return (
      <div className="bg-container">
        <div className="left-container">
          <form className="form-container" onSubmit={this.onSubmit}>
            <h1 className="heading">Create a task!</h1>
            <label htmlFor="task" className="label-item">
              Task
            </label>
            <input
              id="task"
              className="input-field"
              type="text"
              value={taskInput}
              onChange={this.onTaskInput}
              placeholder="Enter the task here"
            />
            <label htmlFor="task" className="label-item">
              Tags
            </label>
            <select
              className="input-field"
              onChange={this.onTagInput}
              value={selectedTag}
            >
              {tagsList.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-button">
              Add Task
            </button>
          </form>
        </div>

        <div className="right-container">
          <div className="right-content-container">
            <h1 className="heading right-heading">Tags</h1>
            <ul className="tags-list-container">
              {tagsList.map(eachItem => (
                <TagItem
                  details={eachItem}
                  filterTag={filterTag}
                  updateFilterTag={this.updateFilterTag}
                  key={eachItem.optionId}
                />
              ))}
            </ul>

            <h1 className="heading right-heading sub-heading">Tasks</h1>

            {areTasksZero ? (
              <p className="message">No Tasks Added Yet</p>
            ) : (
              <ul className="tasks-list-container">
                {isFiltering
                  ? tasksList.map(eachItem => {
                      if (filterTag.includes(eachItem.tag)) {
                        return <TaskItem details={eachItem} key={eachItem.id} />
                      }
                      return null
                    })
                  : tasksList.map(eachItem => (
                      <TaskItem details={eachItem} key={eachItem.id} />
                    ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks

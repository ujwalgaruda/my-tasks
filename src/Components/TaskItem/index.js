import './index.css'

const TaskItem = props => {
  const {details} = props

  return (
    <li className="task-list-item">
      <p className="task-desc">{details.task}</p>
      <p className="task-tag">{details.tag}</p>
    </li>
  )
}

export default TaskItem

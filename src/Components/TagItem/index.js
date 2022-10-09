import './index.css'

const TagItem = props => {
  const {details, updateFilterTag, filterTag} = props

  const ontagClick = () => {
    updateFilterTag(details.optionId)
  }

  const isActive = filterTag.includes(details.optionId)

  return (
    <li className="tag-item">
      <button
        type="button"
        onClick={ontagClick}
        className={isActive ? 'tag-button active' : 'tag-button'}
      >
        {details.displayText}
      </button>
    </li>
  )
}

export default TagItem

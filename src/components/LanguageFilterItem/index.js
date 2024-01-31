// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickFilterItem, isActive} = props
  const {language, id} = languageDetails
  const activeClassName = isActive ? 'selected-bnt' : 'filter-btn'
  const onClickBtn = () => {
    onClickFilterItem(id)
  }
  return (
    <li>
      <button type="button" className={activeClassName} onClick={onClickBtn}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} =
    repositoryDetails

  return (
    <li className="card-container">
      <img src={avatarUrl} alt={name} className="avatar-logo" />
      <h1 className="repository-name">{name}</h1>
      <div className="list-flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt=" stars"
          className="icon-image"
        />
        <p className="item-count">{starsCount} stars</p>
      </div>
      <div className="list-flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon-image"
        />
        <p className="item-count">{forksCount} forks</p>
      </div>
      <div className="list-flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon-image"
        />
        <p className="item-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

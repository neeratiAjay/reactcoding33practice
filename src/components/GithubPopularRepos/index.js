import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryItemsList: [],
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getUpdatedRepositoryList()
  }

 

  getUpdatedRepositoryList = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const filterUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(filterUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      const filterItems = fetchedData.popular_repos
      const updatedFilterItems = filterItems.map(eachItem => ({
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        repositoryItemsList: updatedFilterItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  isLoading = () => {
    return (
      <div testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Something Went Wrong</h1>
      </div>
    )
  }
  renderRepositoriesListView = () => {
    const {repositoryItemsList} = this.state

    return (
      <ul className="repository-list-container">
        {repositoryItemsList.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }
  

 onClickFilterItem = id => {
    this.setState({
      activeId:id,
    })
    this.getUpdatedRepositoryList()
  }
  renderFilterListContainer = () => {
    const {activeId} = this.state
    return (
      <ul className="filter-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            languageDetails={eachItem}
            onClickFilterItem={this.onClickFilterItem}
            isActive={eachItem.id === activeId}
          />
        ))}
      </ul>
    )
  }

renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.isLoading()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="app-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderFilterListContainer()}
        {this.renderRepositories()}
      </div>
    )
  }
}
export default GithubPopularRepos

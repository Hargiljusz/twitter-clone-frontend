import React from 'react'
import "../App.css"
import PopularTags from '../components/PopularTags'
import SearchBar from '../components/SearchBar/SearchBar'

const Activitybar = () => {
  return (
      <div className="ActivityContent">
        <SearchBar />
        <PopularTags />
      </div>
  )
}

export default Activitybar
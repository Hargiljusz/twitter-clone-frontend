import "./LoadSpinner.css"

import React from 'react'

 const LoadSpinner = ({className}) => {
  return (
    <div className={className}>
      <div className="spinner"></div>
    </div>
  )
}

export default LoadSpinner

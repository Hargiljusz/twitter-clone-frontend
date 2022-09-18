import React from 'react'
import "../App.css"

const Container = ({children}) => {
  return (
    <main className="MainContainer">
       {children} 
    </main>
  )
}

export default Container
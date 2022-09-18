import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"

// axios.defaults.baseURL = "https://localhost:7069/"
// axios.defaults.headers = {"Access-Control-Allow-Origin": "*"} 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

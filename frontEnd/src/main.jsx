import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export let userContext = createContext()


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)

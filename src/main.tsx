import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/app.scss"
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
)

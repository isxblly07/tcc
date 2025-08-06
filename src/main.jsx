import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom-bootstrap.css'

import './styles/global.css'
import './styles/pastel-theme.css'
import './styles/home.css'
import './styles/header.css'
import './styles/institutional.css'
import './styles/calendar.css'
import './styles/ui-enhancements.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
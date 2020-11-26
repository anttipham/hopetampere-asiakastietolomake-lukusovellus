import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { HashRouter as Router } from 'react-router-dom'
import getSheets from './utils/getSheets'
import SheetsContext from './utils/SheetsContext'

// console.log('NODE_ENV:', process.env.NODE_ENV)

getSheets().then(sheets => {
  ReactDOM.render(
    <SheetsContext.Provider value={sheets}>
      <Router>
        <App />
      </Router>
    </SheetsContext.Provider>,
    document.getElementById('root')
  )
})

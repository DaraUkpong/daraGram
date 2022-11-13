import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Flowbite} from 'flowbite-react'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Flowbite 
  theme={{
    theme: {
      alert: {
        color: {
          primary: 'bg-primary'
        }
      }
    }
  }}
  
  >
    <Router>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Router>
  </Flowbite>
  
  
)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from '../pages/Home'


export default function RouterApp() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={ <Login/> } />
        </Routes>
    </Router>
  )
}

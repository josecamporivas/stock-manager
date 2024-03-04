import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LogIn from './pages/Login/LogIn'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

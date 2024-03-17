import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LogIn from './pages/Login/LogIn'
import Dashboard from './pages/Dashboard/Dashboard'
import Buys from './pages/Buys/Buys'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/buys' element={<Buys />} />
      </Routes>
    </>
  )
}

export default App

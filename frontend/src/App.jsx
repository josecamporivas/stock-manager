import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LogIn from './pages/Login/LogIn'
import Dashboard from './pages/Dashboard/Dashboard'
import Buys from './pages/Buys/Buys'
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'
import Products from './pages/Products/Products'
import Sales from './pages/Sales/Sales'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/users' element={<Users />} />
        <Route path='/buys' element={<Buys />} />
        <Route path='/products' element={<Products />} />
        <Route path='/sales' element={<Sales />} />
        <Route path="/login" element={<LogIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

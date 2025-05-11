import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const url="http://localhost:8080"

  return (
  <>
  <ToastContainer />
  <Navbar />
  <div className="app-content">

  <Sidebar/>
  <Routes>
    <Route path='/' element={<Add url={url}/>} />
    <Route path='/list' element={<List url={url} />} />
    <Route path='/orders' element={<Orders url={url}/>} />
  </Routes>
  </div>
  </>
  )
}

export default App

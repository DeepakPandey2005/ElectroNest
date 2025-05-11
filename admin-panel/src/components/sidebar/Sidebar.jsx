import React from 'react'
import "./Sidebar.css"
import { IoMdAdd } from 'react-icons/io'
import { FaListUl } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>

      <div className="container">
        <NavLink to="/"  className="sidebar-option">
        <IoMdAdd />
          <p>Add items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
        <FaListUl />
          <p>List items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
        <TbTruckDelivery />
          <p>Orders</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar

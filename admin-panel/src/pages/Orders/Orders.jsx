import React, { useEffect, useState } from 'react'
import "./Orders.css"
import axios from 'axios';

const Orders = ({url}) => {
  const [orders,setOrders]=useState([]);

  const fetchAllOrders=async()=>{
    const res=await axios.get(url+'/api/order/list')
    setOrders(res.data.data)
  }

  const statusHandler=async(e,orderId)=>{
    const res=await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    })
    if(res.data.success){
      await fetchAllOrders();
    }

  }

  useEffect(()=>{
   fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">

      {
        orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src="/parcel.jpg" alt="" />
            <div>
              <div className='order-item-product'>
                {
                  order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name + " x " + item.quantity
                    }
                    else{
                      return item.name + " x " + item.quantity + " , "
                    }
                  }
                )
              }
              <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName} </p>
              <p className='order-item-address'>{order.address.street+ ","} {order.address.city+ " , "+order.address.state+ " , "+order.address.zipCode}</p>
              <p className='order-item-phone'>{order.address.phone}</p>
              

              </div>
        <div>

        </div>
            </div>
              <p>Items : {order.items.length}</p>
              <p>₹ {order.amount}</p>
              <select   name="" id="" onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value="Product Processing">Product Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

          </div>
        ))
      }
              </div>
    </div>
  
  )
}

export default Orders

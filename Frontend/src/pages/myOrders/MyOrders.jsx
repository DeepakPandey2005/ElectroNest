import { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import { ProductContext } from "../../store/ContextProvider"
import axios from "axios"
const MyOrders = () => {
const [data,setData]=useState([])
const {url,token}=useContext(ProductContext)

const fetchOrders=async()=>{
    const res=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
         setData(res.data.data)}
useEffect(()=>{
    if (token){
        fetchOrders()
     }
},[token])
  return (
   <div className="my-orders">
     <h2>my orders</h2>
     <div className="container">
        {
            data.map((order,index)=>{
                return (
                    <div key={index} className="my-orders-order"> 
                        <img src="/parcel.jpg" className="parcel"></img>
                        <p>
                            {order.items.map((item,index)=>{
                                if(index===order.items.length-1){

                                    return item.name+` x `+item.quantity
                                }else{
                                    return item.name+` x `+item.quantity+" , "
                                }
                                    

                            })}
                        </p>
                        <p>₹ {order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf; </span><b>{order.status}</b></p>
                        <button onClick={()=>fetchOrders()}>Track Order</button>
                    </div>
                )

            })
        }
     </div>
   </div>
  )
}

export default MyOrders

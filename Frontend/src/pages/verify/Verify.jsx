import { useContext, useEffect, useState } from "react"
import "./Verify.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ProductContext } from "../../store/ContextProvider"
import axios from "axios"
const Verify = () => {
const [searchParams,setSearchParams]=useSearchParams()
const navigate =useNavigate()
const success=searchParams.get('success')
const orderId=searchParams.get('orderId')
const {url}=useContext(ProductContext);

const verifyPayment=async()=>{
    const res=await axios.post(url+"/api/order/verify",{success,orderId})
    if(res.data.success){
        navigate('/myorders')
    }else{
        navigate('/')
    }
}

useEffect(()=>{
verifyPayment()
},[])

  return (
    <div className="verify">
        <div className="spinner"></div>
      
    </div>
  )
}

export default Verify

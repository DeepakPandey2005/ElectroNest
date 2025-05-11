import "./PlaceOrders.css";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../store/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrders = () => {
  const navigate=useNavigate()
  const { getTotalPrice,token,productData,cartData,url} = useContext(ProductContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    state:"",
    city:"",
    zipCode:"",
    phone:""
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeOrder=async (e)=>{
 e.preventDefault();
 let orderItems=[];
 productData.map((item)=>{
  if(cartData[item._id]>0){
    let itemInfo=item;
    itemInfo["quantity"]= cartData[item._id];
    orderItems.push(itemInfo);
  }
 })
 let orderData={
  address:data,
  items:orderItems,
  amount:getTotalPrice()+99
 }
 
 let res=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
 if(res.data.success){
  const {session_url}=res.data;
  console.log(session_url)
  window.location.replace(session_url)
 }
   else{
    alert("something went wrong")
   }
  }

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if (getTotalPrice()===0){
      navigate('/cart')
    }

  },[token])

  return (
    <form className="orders-container" onSubmit={placeOrder}>
      <div className="details">
        <p>Enter the Details </p>
        <div className="details-container">
          <div className="input">
            <div className="enter-detail content">

            <input type="text"  onChange={onChangeHandler} name="firstName" id="" placeholder="first Name"  required />
            <input type="text"  onChange={onChangeHandler} name="lastName" id="" placeholder="last Name"  required />
            </div>
            <input type="email" onChange={onChangeHandler}  name="email" id="" placeholder="Email address"  required />

            <div className="enter-detail">
              <input
                type="state"
                name="state"
                id=""
                placeholder="state" onChange={onChangeHandler}
              />
              <input type="city"  onChange={onChangeHandler} name="city" id="" placeholder="city"  required />
            </div>
            <div className="enter-detail">
              <input type="text"  onChange={onChangeHandler} name="street" id="" placeholder=" street"  required />
              <input type="text"  onChange={onChangeHandler} name="zipCode" id="" placeholder=" zipcode"  required />
              
            </div>
              <input type="text"  onChange={onChangeHandler} name="phone" id="" placeholder=" phone"  required />
            <div className="enter-detail">
              <input type="checkbox" id=""  required />
              <span>Confirm details</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <br />
      <br />
      <div className="checkout">
        <div>
          <p className="cart-summary">Cart Total</p>
          <div className="summary-left">
            <div className="cart-detail">
              <p>subtotal</p>
              <p>₹ {getTotalPrice()}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Deleivery fee</p>
              <p>₹ {getTotalPrice() === 0 ? 0 : 99}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Total</p>
              <p>₹ {getTotalPrice() === 0 ? 0 : getTotalPrice() + 99}</p>
            </div>
            <hr />
            <button type="submit"  onClick={() => navigate("/order")}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrders;

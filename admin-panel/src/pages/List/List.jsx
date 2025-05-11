import { useEffect, useState } from "react"
import "./List.css"
import axios from "axios"
import { MdDelete } from "react-icons/md"
import { toast } from "react-toastify"

const List = ({url}) => {
  const [products,setProducts]=useState([])
  const getProducts=async()=>{
   const res=await axios.get(`${url}/api/product/list`)
   setProducts(res.data.data)
  }
  useEffect(()=>{
getProducts()
  },[])

  const handleDel=async(prodId)=>{
    const res=await axios.delete(`${url}/api/product/remove/${prodId}`,)
    if(res.data.success){
      toast.success(res.data.message)
      await getProducts()
    }else{
      toast.error(res.data.message)
    }

  }
  return (
    <div className="list-container">
      <h2>All Products List</h2><hr />
      <div className="list-items title" >
     <b>Image</b>
     <b>Name</b>
     <b>Category</b>
     <b>Price</b>
     <b>Rating</b>
     <b>Action</b>
      </div><hr />
      <div>
        {products.map((product,index)=><div key={index} className="list-items">
          <img src={`${url}/images/`+product.image} alt="" />
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <p>{product.ratings}</p>
          <MdDelete className="del-icon" onClick={()=>handleDel(product._id)} />
      
        </div>   )}
      </div>
    </div>
  )
}

export default List

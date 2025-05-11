import React, { useState } from 'react'
import "./Add.css"
import { MdCloudUpload } from 'react-icons/md'
import { BsStarFill } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {
  const [image,setImage]=useState(false)
  const [ratings,setRatings]=useState(0)
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    ratings:"",
    category:"Tws",
})
const onChangeHandler=(event)=>{
  const name=event.target.name;
  const value=event.target.value;
  setData((data)=>({...data,[name]:value}))

}
const handleSubmit=async(e)=>{
e.preventDefault();
const formData= new FormData()
formData.append("name",data.name);
formData.append("description",data.description);
formData.append("price",Number(data.price));
formData.append("ratings",Number(data.ratings));
formData.append("category",data.category);
formData.append("image",image)


const res= await axios.post(`${url}/api/product/add`,formData)
if(res.data.success){
  setData({ name:"",
    description:"",
    price:"",
    ratings:"",
    category:"Tws"})
    setImage(false)
    toast.success(res.data.message)
 }else{
toast.error(res.data.error)
}

}

  return (
    <form className='add-container' onSubmit={handleSubmit}>

      <div className='inputs'>
        <p>upload image </p>
        <label htmlFor="file">
          {
            image?<img className='upload-icon' src={URL.createObjectURL(image)} alt="" />:<MdCloudUpload className="upload-icon"/>
          }
        </label>
         <input type='file' onChange={(e)=>setImage(e.target.files[0])} name='image'  id='file' hidden required  />
         </div>

      <div className='inputs'>
        <p>Product name</p>
        
         <input onChange={onChangeHandler} value={data.name} type="text" name='name'placeholder='type here'  />
         </div>

      <div className='inputs'>
        <p>Product description</p>
        <textarea name="description" onChange={onChangeHandler} id="" value={data.description} placeholder='write the content here ' rows={6} cols={40} ></textarea>
        </div>
         
<div className="product-cp">

      <div className='inputs'>
        <p>Product category</p>
        
         <select name="category" id="" onChange={onChangeHandler}>
          <option value="Tws">Tws</option>
          <option value="Smartwatch">Smartwatch</option>
          <option value="Mouse">Mouse</option>
          <option value="Headphone">Headphone</option>
          <option value="Tablet">Tablet</option>
          <option value="Keyboard">keyboard</option>
          <option value="Speaker">Speaker</option>
         </select>
         </div>
         <div className='inputs'>
          <p>Rating : {ratings} <BsStarFill className='star'/></p>
          <input type="range" name="ratings" onChange={(e)=>{setRatings(e.target.value); onChangeHandler(e)}} placeholder='' className='range' min={0} max={5} defaultValue={0}/>
         </div>
         <div className='inputs'>
          <p>Product price</p>
          <input type="Number" onChange={onChangeHandler} value={data.price} name='price' placeholder='' min={499} />
         </div>
</div>
         <button type='submit'>ADD</button>


      
    </form>
  )
}

export default Add

const express=require("express")
const router=express.Router()
const multer=require('multer')
const {add,list,remove} = require("../Controller/product")

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }  
})
const upload=multer({storage:storage})


router.post('/add',upload.single("image"),add)
.get('/list',list)
.delete('/remove/:id',remove)


module.exports=router

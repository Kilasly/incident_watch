const customAPIError = require("../cutsomError/customError")

const error=async (err,req,res,next)=>{
    if(err instanceof customAPIError){
        return res.status(err.status).json({  error:err.message })
    }
    console.log(err)
    return res.status(500).json({error:"Internal Server Error"})
    next()

}

module.exports=error
   
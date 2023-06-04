const jwt=require('jsonwebtoken')

const verify=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({
            error:'no token'
        })
    }
    const token=authorization.split(' ')[1]
    const payload=jwt.verify(token,process.env.JWT_SECRET)
    if(!payload){
        return res.status(401).json({
            error:'invalid token'
        })
    }
    req.user=payload
    next()


}
module.exports=verify
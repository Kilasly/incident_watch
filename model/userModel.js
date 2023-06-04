const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true,
    }
})
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
})
userSchema.methods.signJWT=function(){
    const token=jwt.sign({id:this._id,email:this.email},process.env.JWT_SECRET);
    return token;

}
userSchema.methods.verifyPassword=function(password){
    const isMatch=bcrypt.compare(password,this.password);
    return isMatch
}

const User=mongoose.model('User',userSchema);
module.exports=User;
//npm install mongoose
//connection with database
const mongoose = require("mongoose");
const DB_LINK= process.env.DB_LINK || require("../secrets").DB_LINK

mongoose
  .connect(DB_LINK)
  .then(function () {
    console.log("Connection Established");
  })
  .catch(function (err) {
    console.log("error", err);
  });

//creating a Schema -only entries written that are required
let userSchema=mongoose.Schema({
    name:{
        type :String,
        required:[true,"Name is required"]
    },
    email:{
        type  : String,
        required : [true,"Email is Required"],
        unique:true
    },
    phoneNo :{
        type : String,
        minlength:[10,"Maximum 10 digit Mobileno"],
        maxlength:10
    },
    address :{
        type:String
    },
    pic:{
        type:String,
        default:"dp.png"
    },
    password :{
        type : String,
        required: [true,"Password is required"]
    },
    confirmPassword :{
        type :String,
        required:[true,"Confirm Password First"],
        validate:{
          validator:function(){
         //return true when value is matched,
         //return false when value is not matched
         //this refers to the current entry
         return this.password==this.confirmPassword;
          },
          message:"Password not matched",
        }
    },
    otp:{
      type:String,
    },
    otpExpiry:{
      type:Date
    }
})

//creating a modal -modal is a collection along with scherma.
const userModal=mongoose.model("userModal",userSchema);
module.exports=userModal;
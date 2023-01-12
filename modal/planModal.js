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
let planSchema=mongoose.Schema({
    name:{
        type :String,
        required:[true,"kindly pass the name"],
        unique:[true,'plan name should be unique'],
        maxlength:[40,"Your plan length is more than 40 characters"]
    },
    duration :{
        type: Number,
        required:[true,"You need to provide duration"]
    },
    price :{
        type :Number,
        required : true
    },
    discount :{
        type : Number,
        validate :{
            validator : function(){
                return this.discount < this.price ;
            },
            message :"Discount must be less than the actual price"
        }
    }

    // reviews ..
    
})

//creating a modal -modal is a collection along with scherma.
const planModal=mongoose.model("planModal",planSchema);
module.exports=planModal;
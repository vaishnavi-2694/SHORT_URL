const mongoose =require("mongoose");
const {Schema} = mongoose;

const urlSchema =new Schema({

shortId:{
  type:String,
  required: true,
},

redirectURL:{
  type:String,
  required: true,
},
visitHistory:[{
timestamp:{type:Number}
}],

createdBy:{
  type: mongoose.Schema.Types.ObjectId,
  ref:"Users",
},

},
{ timestamp:true}





);

const URL=mongoose.model("url",urlSchema);

module.exports=URL;
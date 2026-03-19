import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

 orderRef:String,
 username:String,
 name:String,
 mobile:String,
 address:String,

 items:[{
  productId:String,
  name:String,
  image:String,
  qty:Number,
  weight:String,
  price:Number
 }],

 totalAmount:Number,

 status:{
  type:String,
  default:"PLACED"
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

});

export default mongoose.model("Order",orderSchema);
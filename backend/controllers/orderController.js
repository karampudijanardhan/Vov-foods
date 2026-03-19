import Order from "../models/Order.js";

export const createOrder = async (req,res) => {

  try{

    const order = new Order(req.body);

    const saved = await order.save();

    res.json(saved);

  }catch(err){

    console.log(err);

    res.status(500).json({
      message:"Order creation failed"
    });

  }

};


export const getOrders = async (req,res) => {

  try{

    const orders = await Order.find().sort({createdAt:-1});

    res.json(orders);

  }catch(err){

    res.status(500).json({
      message:"Orders fetch error"
    });

  }

};


export const updateOrderStatus = async (req,res) => {

  try{

    const {status} = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {status},
      {new:true}
    );

    res.json(order);

  }catch(err){

    res.status(500).json({
      message:"Status update failed"
    });

  }

};
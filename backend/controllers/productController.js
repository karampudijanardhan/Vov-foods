import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {

    const product = new Product(req.body);
    await product.save();

    res.json({ success: true, message: "Product added" });

  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
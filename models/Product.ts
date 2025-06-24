import mongoose, { Schema, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // URL or upload
}, { timestamps: true });

const Product = models.Product || mongoose.model('Product', ProductSchema);

export default Product;
